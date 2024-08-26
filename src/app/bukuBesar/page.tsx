'use client'
import { getBukuBesar } from '@/api/transaction'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import ButtonSecondary from '@/components/elements/buttonSecondary'
import Card from '@/components/elements/card/Card'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { dateFirst, formatDate, formatDateStr } from '@/utils/helper'
import { parseDate } from '@internationalized/date'
import { DateRangePicker, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'

const BukuBesar = () => {
    const dateNow = new Date();
    let [date, setDate] = React.useState({
        start: parseDate((formatDate(dateFirst))),
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