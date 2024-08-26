'use client'
import { getBukuBesar } from '@/api/transaction'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import ButtonSecondary from '@/components/elements/buttonSecondary'
import Card from '@/components/elements/card/Card'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { formatDate, formatDateStr } from '@/utils/helper'
import { parseDate } from '@internationalized/date'
import { DateRangePicker, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'

const BukuBesar = () => {
    const dateNow = new Date();
    let [date, setDate] = React.useState({
        start: parseDate((formatDate(dateNow))),
        end: parseDate((formatDate(dateNow))),
    });
    const startDate = formatDateStr(date.start);
    const endDate = formatDateStr(date.end);

    const [dataTrans, setDataTrans] = useState([])

    useEffect(() => {
        getBukuBesar(startDate, endDate, (result: any) => {
            setDataTrans(result.data);
        });
    }, [startDate, endDate]);

    console.log(dataTrans);

    return (
        <DefaultLayout>
            <Card>
                <h1 className='text-xl font-medium ' >Buku Besar</h1>
                <p className='text-small text-gray' >Ini adalah halaman besar yang akan mengirim data transaksi ke dalam neraca</p>
                <div className="space-y-3 lg:space-y-0 lg:flex  justify-end gap-2 mt-3 lg:mt-2  ">
                    <ButtonSecondary className=' px-4 rounded-md w-auto'>Download dalam bentuk Excel</ButtonSecondary>
                    <DateRangePicker
                        visibleMonths={2}
                        size='sm' onChange={setDate} value={date} aria-label='datepicker' className="max-w-[284px] bg-bone border-2 border-primary rounded-lg"
                    />
                </div>
            </Card>

            {dataTrans.map((data: any, index: number) => {
                // Inisialisasi total saldo per akun
                let totalDebit = 0;
                let totalCredit = 0;

                // Iterasi untuk menghitung total debit dan kredit
                data.journal_details.forEach((journal: any) => {
                    totalDebit += journal.debit;
                    totalCredit += journal.credit;
                });

                // Hitung saldo total berdasarkan total debit dan kredit
                const totalSaldo = totalDebit - totalCredit;

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
                                <TableColumn>TOTAL {data.name.toUpperCase()}</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {data.journal_details.map((journal: any) => (
                                    <TableRow key={journal._id}>
                                        <TableCell>01/01/2024</TableCell>
                                        <TableCell>{data.name}</TableCell>
                                        <TableCell>{journal.debit}</TableCell>
                                        <TableCell>{journal.credit}</TableCell>
                                        <TableCell>{journal.debit}</TableCell>
                                        <TableCell>{journal.credit}</TableCell>
                                        <TableCell className='font-bold'>
                                            {totalSaldo}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                );
            })}


        </DefaultLayout>

    )
}

export default BukuBesar