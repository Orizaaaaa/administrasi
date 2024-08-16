'use client'
import ButtonSecondary from '@/components/elements/buttonSecondary'
import Card from '@/components/elements/card/Card'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { DatePicker, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import React from 'react'


const LabaRugi = () => {
    return (
        <DefaultLayout>
            <Card>
                <h1 className='font-medium text-lg' >Laporan Laba Rugi</h1>
                <p className='text-small text-gray' >Untuk melihat laporan laba bersih atau laba kotor</p>
                <div className="space-y-3 lg:space-y-0 lg:flex  justify-end gap-2 mt-3 lg:mt-0">
                    <ButtonSecondary className=' px-4 rounded-md w-auto'>Download dalam bentuk Excel</ButtonSecondary>
                    <DatePicker size='sm' aria-label='datepicker' className="max-w-[284px] bg-bone border-2 my-2 border-primary rounded-lg" />
                </div>

            </Card>
            <div className="pendapatan mt-4">
                <h1 className='mb-2 font-medium' >Pendapatan</h1>
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>AKUN</TableColumn>
                        <TableColumn>REF</TableColumn>
                        <TableColumn>TIPE AKUN</TableColumn>
                        <TableColumn>KETERANGAN</TableColumn>

                        <TableColumn>JUMLAH</TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow key="1">
                            <TableCell>Kas</TableCell>
                            <TableCell>101</TableCell>
                            <TableCell>Aset</TableCell>
                            <TableCell>Pendapatan gaji</TableCell>
                            <TableCell  >500.000.000</TableCell>
                        </TableRow>
                        <TableRow key="2">
                            <TableCell>Kas</TableCell>
                            <TableCell>101</TableCell>
                            <TableCell>Aset</TableCell>
                            <TableCell>pendapatan pajak masyarakat</TableCell>
                            <TableCell >1.500.000.000</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell className='font-bold' >TOTAL PENDAPATAN</TableCell>
                            <TableCell>{''}</TableCell>
                            <TableCell>{''}</TableCell>
                            <TableCell>{''}</TableCell>
                            <TableCell className='font-bold'  >1.550.000.000</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <div className="beban mt-4">
                <h1 className='mb-2 font-medium' >Beban</h1>
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>AKUN</TableColumn>
                        <TableColumn>REF</TableColumn>
                        <TableColumn>TIPE AKUN</TableColumn>
                        <TableColumn>KETERANGAN</TableColumn>

                        <TableColumn>JUMLAH</TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow key="1">
                            <TableCell>Kas</TableCell>
                            <TableCell>101</TableCell>
                            <TableCell>Aset</TableCell>
                            <TableCell>Pembelian komputer</TableCell>
                            <TableCell  >500.000.000</TableCell>
                        </TableRow>
                        <TableRow key="2">
                            <TableCell>Kas</TableCell>
                            <TableCell>101</TableCell>
                            <TableCell>Aset</TableCell>
                            <TableCell>Pembelian ambulan</TableCell>
                            <TableCell  >1.500.000.000</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell className='font-bold' >TOTAL BEBAN</TableCell>
                            <TableCell>{''}</TableCell>
                            <TableCell>{''}</TableCell>
                            <TableCell>{''}</TableCell>
                            <TableCell className='font-bold'  >1.550.000.000</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>

            <div className="flex text-lg font-medium mt-4">
                {/* jika di kredit maka akan menggunakan tanda kurung */}
                Laba Bersih (Net Profit) = Rp. 1.500.000.000
            </div>
        </DefaultLayout>
    )
}

export default LabaRugi