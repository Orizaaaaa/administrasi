'use client'
import { downloadBukuBesar, getBukuBesar } from '@/api/transaction'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import ButtonSecondary from '@/components/elements/buttonSecondary'
import Card from '@/components/elements/card/Card'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { dateFirst, formatDate, formatDateStr } from '@/utils/helper'
import { parseDate } from '@internationalized/date'
import { Autocomplete, AutocompleteItem, DateRangePicker, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'

interface DropdownItem {
    label: string;
    value: string;
}

interface ItemData {
    _id: string;
    name: string;
}
const BukuBesar = () => {
    const dateNow = new Date();
    let [date, setDate] = React.useState({
        start: parseDate((formatDate(dateFirst))),
        end: parseDate((formatDate(dateNow))),
    });
    const [dropdownFilter, setDropdownFilter] = useState([]);
    const startDate = formatDateStr(date.start);
    const endDate = formatDateStr(date.end);

    const [dataTransOriginal, setDataTransOriginal] = useState([]); // Data asli
    const [filteredData, setFilteredData] = useState([]); // Data yang sudah difilter

    useEffect(() => {
        getBukuBesar(startDate, endDate, (result: any) => {
            setDataTransOriginal(result.data); // Simpan data asli
            setFilteredData(result.data); // Tampilkan semua data secara default
            setDropdownFilter(result.data);
        });
    }, [startDate, endDate]);

    const onSelectionChange = (id: any) => {
        // Filter data berdasarkan name yang dipilih
        const filtered = dataTransOriginal.filter((item: ItemData) => item.name === id);
        setFilteredData(filtered.length ? filtered : dataTransOriginal); // Tampilkan data yang cocok atau kembalikan ke semua data
    };


    const dataDropdown: DropdownItem[] = (dropdownFilter || []).map((item: ItemData) => ({
        label: item.name,
        value: item.name
    }));


    const handleDownload = () => {
        downloadBukuBesar(startDate, endDate, (result: any) => {
            if (result instanceof Blob) {
                // Jika hasil adalah Blob, kita lanjutkan dengan download
                const url = window.URL.createObjectURL(result);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `Buku-Besar-${startDate}-${endDate}.xlsx`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                console.log('Download success');
            } else {
                // Jika tidak, anggap itu sebagai error
                console.error('Download failed:', result);
            }
        });
    };


    return (
        <DefaultLayout>
            <Card>
                <h1 className='text-xl font-medium ' >Buku Besar</h1>
                <p className='text-small text-gray' >Ini adalah halaman besar yang akan mengirim data transaksi ke dalam neraca</p>
                <div className="space-y-3 lg:space-y-0 lg:flex  justify-end gap-2 mt-3 lg:mt-2  ">
                    <ButtonSecondary onClick={handleDownload} className=' px-4 rounded-md w-auto'>Download dalam bentuk Excel</ButtonSecondary>
                    <DateRangePicker
                        visibleMonths={2}
                        size='sm' onChange={setDate} value={date} aria-label='datepicker' className="max-w-[284px] bg-bone border-2 border-primary rounded-lg"
                    />
                </div>
            </Card>

            <div className="flex mt-4 justify-end">
                <Autocomplete
                    aria-label='dropdown'
                    placeholder='filter berdasarkan akun'
                    onSelectionChange={onSelectionChange}
                    defaultItems={dataDropdown}
                    className=" w-[100%] lg:max-w-xs border-2 border-primary rounded-lg"
                    size='sm'
                >
                    {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                </Autocomplete>
            </div>


            {filteredData.map((data: any, index: number) => {
                // Inisialisasi saldo
                let saldo = 0;
                let saldoDebit = 0;
                let saldoCredit = 0;

                return (
                    <div className="mt-7" key={index}>
                        <div className="space-y-3 lg:space-y-0 lg:flex gap-2 items-center mb-2 justify-between">
                            <h1 className='mb-1'>{data.name.toUpperCase()} ({data.account_code})</h1>
                        </div>

                        <Table className='border-hidden' aria-label={`Table for ${data.name}`}>
                            <TableHeader>
                                <TableColumn>TANGGAL</TableColumn>
                                <TableColumn>NAMA AKUN</TableColumn>
                                <TableColumn>DEBIT</TableColumn>
                                <TableColumn>KREDIT</TableColumn>
                                <TableColumn>SALDO DEBIT</TableColumn>
                                <TableColumn>SALDO KREDIT</TableColumn>
                                <TableColumn>TOTAL</TableColumn>

                            </TableHeader>
                            <TableBody>
                                {data.journal_details.map((journal: any, journalIndex: number) => {
                                    saldoDebit = 0;
                                    saldoCredit = 0;

                                    // Jika ada transaksi debit
                                    if (journal.debit > 0) {
                                        if (saldo < 0) {
                                            // Jika saldo negatif, kurangi dengan debit baru
                                            saldo += journal.debit;
                                            if (saldo >= 0) {
                                                saldoDebit = saldo;
                                                saldoCredit = 0; // Reset saldo kredit jika saldo menjadi positif
                                            } else {
                                                saldoCredit = Math.abs(saldo); // Saldo masih negatif
                                            }
                                        } else {
                                            saldo += journal.debit; // Tambahkan debit ke saldo
                                            saldoDebit = saldo;
                                        }
                                    }

                                    // Jika ada transaksi kredit
                                    if (journal.credit > 0) {
                                        saldo -= journal.credit; // Kurangi saldo dengan kredit
                                        if (saldo >= 0) {
                                            saldoDebit = saldo; // Tetap di saldo debit jika masih positif
                                        } else {
                                            saldoCredit = Math.abs(saldo); // Saldo menjadi negatif, pindah ke saldo kredit
                                            saldoDebit = 0; // Reset saldo debit
                                        }
                                    }

                                    return (
                                        <TableRow key={journal._id}>
                                            <TableCell>
                                                {new Date(journal.journal_date).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>{data.name}</TableCell>
                                            <TableCell>{journal.debit.toLocaleString()}</TableCell>
                                            <TableCell>{journal.credit.toLocaleString()}</TableCell>
                                            <TableCell>
                                                {saldoDebit > 0 ? saldoDebit.toLocaleString() : ''}
                                            </TableCell>
                                            <TableCell>
                                                {saldoCredit > 0 ? saldoCredit.toLocaleString() : ''}
                                            </TableCell>
                                            <TableCell className='font-bold'>
                                                {journalIndex === data.journal_details.length - 1 ? saldo.toLocaleString() : ''}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                );
            })}



        </DefaultLayout>

    )
}

export default BukuBesar