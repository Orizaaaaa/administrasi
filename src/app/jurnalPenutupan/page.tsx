'use client'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import Card from '@/components/elements/card/Card'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { DatePicker, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import React from 'react'



const JurnalPenutupan = () => {
    return (
        <DefaultLayout>
            <Card>
                <h1 className='font-medium text-lg'>Jurnal Penutupan</h1>
                <p className='text-small text-gray' > untuk menutup akun-akun nominal (seperti pendapatan dan beban) pada akhir periode  </p>
                <DatePicker size='sm' aria-label='datepicker' className="max-w-[284px] bg-bone border-2 my-2 border-primary rounded-lg" />
            </Card>
            <div className='mt-7' >
                <div className="space-y-3 lg:space-y-0 lg:flex gap-2 items-center mb-2 justify-between">
                </div>
                <Table className=' border-hidden' aria-label="Example static collection table">
                    <TableHeader  >
                        <TableColumn>TANGGAL</TableColumn>
                        <TableColumn>KETERANGAN AKUN </TableColumn>
                        <TableColumn>DEBIT</TableColumn>
                        <TableColumn>KREDIT</TableColumn>

                    </TableHeader>
                    <TableBody>
                        <TableRow key="1">
                            <TableCell>01/01/2024</TableCell>
                            <TableCell>Kas</TableCell>
                            <TableCell>2.500.000.000</TableCell>
                            <TableCell>{''}</TableCell>

                        </TableRow>
                        <TableRow key="2">
                            <TableCell>01/01/2024</TableCell>
                            <TableCell>Laba Rugi</TableCell>
                            <TableCell>{''}</TableCell>
                            <TableCell>2.500.000.000</TableCell>
                        </TableRow>

                        <TableRow key="3">
                            <TableCell>01/01/2024</TableCell>
                            <TableCell>Pendapatan pajak</TableCell>
                            <TableCell>1.500.000.000</TableCell>
                            <TableCell>{''}</TableCell>
                        </TableRow>

                        <TableRow key="4">
                            <TableCell>01/01/2024</TableCell>
                            <TableCell>Laba Rugi</TableCell>
                            <TableCell>{''}</TableCell>
                            <TableCell>1.500.000.000</TableCell>
                        </TableRow>

                        <TableRow key="5">
                            <TableCell>01/01/2024</TableCell>
                            <TableCell>Modal</TableCell>
                            <TableCell>1.500.000.000</TableCell>
                            <TableCell>{''}</TableCell>

                        </TableRow>

                        <TableRow key="6">
                            <TableCell>01/01/2024</TableCell>
                            <TableCell>Laba Rugi</TableCell>
                            <TableCell>{''}</TableCell>
                            <TableCell>1.500.000.000</TableCell>
                        </TableRow>


                    </TableBody>
                </Table>
                <div className="flex justify-end mt-4">
                    <ButtonPrimary className='py-2 px-4 rounded-md' >Buat jurnal penutupan</ButtonPrimary>
                </div>
            </div>


        </DefaultLayout>

    )
}

export default JurnalPenutupan