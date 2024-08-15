'use client'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import ButtonSecondary from '@/components/elements/buttonSecondary'
import Card from '@/components/elements/card/Card'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { DatePicker, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import React, { useState } from 'react'

const BukuBesar = () => {
    const [date, setDate] = useState(null);
    return (
        <DefaultLayout>
            <Card>
                <h1 className='text-xl font-medium ' >Buku Besar</h1>
                <p className='text-small text-gray' >Ini adalah halaman besar yang akan mengirim data transaksi ke dalam neraca</p>
                <div className="flex justify-end gap-2">
                    <ButtonSecondary className=' px-4 rounded-md'>Download dalam bentuk Pdf</ButtonSecondary>
                    <DatePicker size='sm' onChange={(e: any) => setDate(e)} value={date} aria-label='datepicker' className="max-w-[284px] bg-bone border-2 border-primary rounded-lg" />
                </div>
            </Card>
            <div className='mt-7' >
                <h1 className='mb-1'>Kas (101)</h1>
                <Table className=' border-hidden' aria-label="Example static collection table">
                    <TableHeader  >
                        <TableColumn>TANGGAL</TableColumn>
                        <TableColumn>KETERANGAN AKUN </TableColumn>
                        <TableColumn>DEBIT</TableColumn>
                        <TableColumn>KREDIT</TableColumn>
                        <TableColumn>SALDO DEBIT</TableColumn>
                        <TableColumn>SALDO KREDIT</TableColumn>
                        <TableColumn>TOTAL KAS</TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow key="1">
                            <TableCell>01/01/2024</TableCell>
                            <TableCell>Kas</TableCell>
                            <TableCell>500.000.000</TableCell>
                            <TableCell>{''}</TableCell>
                            <TableCell>500.000.000</TableCell>
                            <TableCell>{''}</TableCell>
                            <TableCell>{''}</TableCell>
                        </TableRow>
                        <TableRow key="2">
                            <TableCell>01/01/2024</TableCell>
                            <TableCell>Kas</TableCell>
                            <TableCell>500.000.000</TableCell>
                            <TableCell>{''}</TableCell>
                            <TableCell>500.000.000</TableCell>
                            <TableCell>{''}</TableCell>
                            <TableCell className='font-bold' >500.000.000</TableCell>
                        </TableRow>


                    </TableBody>
                </Table>
            </div>

            <div className='mt-7' >
                <h1 className='mb-1'>Modal (301)</h1>
                <Table className=' border-hidden' aria-label="Example static collection table">
                    <TableHeader  >
                        <TableColumn>TANGGAL</TableColumn>
                        <TableColumn>KETERANGAN AKUN </TableColumn>
                        <TableColumn>DEBIT</TableColumn>
                        <TableColumn>KREDIT</TableColumn>
                        <TableColumn>SALDO DEBIT</TableColumn>
                        <TableColumn>SALDO KREDIT</TableColumn>
                        <TableColumn>TOTAL KAS</TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow key="1">
                            <TableCell>01/01/2024</TableCell>
                            <TableCell>Modal</TableCell>
                            <TableCell>{''}</TableCell>
                            <TableCell>500.000.000</TableCell>
                            <TableCell>{''}</TableCell>
                            <TableCell>500.000.000</TableCell>
                            <TableCell className='font-bold' >500.000.000</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <div className='mt-7' >
                <h1 className='mb-1'>Pendapatan Pajak ( 303 )</h1>
                <Table className=' border-hidden' aria-label="Example static collection table">
                    <TableHeader  >
                        <TableColumn>TANGGAL</TableColumn>
                        <TableColumn>KETERANGAN AKUN </TableColumn>
                        <TableColumn>DEBIT</TableColumn>
                        <TableColumn>KREDIT</TableColumn>
                        <TableColumn>SALDO DEBIT</TableColumn>
                        <TableColumn>SALDO KREDIT</TableColumn>
                        <TableColumn>TOTAL KAS</TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow key="1">
                            <TableCell>01/01/2024</TableCell>
                            <TableCell>Pendapatan Pajak</TableCell>
                            <TableCell>{''}</TableCell>
                            <TableCell>500.000.000</TableCell>
                            <TableCell>{''}</TableCell>
                            <TableCell>500.000.000</TableCell>
                            <TableCell className='font-bold' >500.000.000</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <div className="flex justify-end mt-7">
                <ButtonPrimary className='py-2 px-4 rounded-md' >Masukan ke dalam neraca</ButtonPrimary>
            </div>
        </DefaultLayout>

    )
}

export default BukuBesar