'use client'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import Card from '@/components/elements/card/Card'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import React from 'react'
import { FaPenToSquare } from 'react-icons/fa6'
import { MdOutlineDelete } from 'react-icons/md'


const JurnalUmum = () => {
    return (
        <DefaultLayout>
            <Card>
                <h1 className='text-xl font-medium '>Jurnal Umum</h1>
                <p className='text-slate-500 text-small' >Semua pencatatan transaksi akan masuk dan di catat ke dalam jurnal umum</p>
                <div className="total mt-4">
                    <h1>Total Debit : Rp. 1.000.000</h1>
                    <h1>Total Kredit: Rp. 1.000.000</h1>
                </div>

            </Card>
            <Table className='mt-7 border-hidden' aria-label="Example static collection table">
                <TableHeader  >
                    <TableColumn>TANGGAL</TableColumn>
                    <TableColumn>KETERANGAN AKUN </TableColumn>
                    <TableColumn>KETERANGAN TRANSAKSI</TableColumn>
                    <TableColumn>REF</TableColumn>
                    <TableColumn>DEBIT</TableColumn>
                    <TableColumn>KREDIT</TableColumn>
                    <TableColumn>ACTION</TableColumn>
                </TableHeader>
                <TableBody>
                    <TableRow key="1">
                        <TableCell>01/01/2024</TableCell>
                        <TableCell>Kas</TableCell>
                        <TableCell>Pendapatan gaji</TableCell>
                        <TableCell>101</TableCell>
                        <TableCell>500.000.000</TableCell>
                        <TableCell>{''}</TableCell>
                        <TableCell>
                            <div className="flex w-full justify-start gap-2 items-center">
                                <button><FaPenToSquare size={20} /></button>
                                <button><MdOutlineDelete size={24} color='red' /></button>
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow key="2">
                        <TableCell>{''}</TableCell>
                        <TableCell>Modal</TableCell>
                        <TableCell>Pendapatan gaji</TableCell>
                        <TableCell>301</TableCell>
                        <TableCell>{''}</TableCell>
                        <TableCell>500.000.000</TableCell>
                        <TableCell>
                            {''}
                        </TableCell>
                    </TableRow>
                    <TableRow key="3">
                        <TableCell>01/01/2024</TableCell>
                        <TableCell>Kas</TableCell>
                        <TableCell>Pendapatan gaji</TableCell>
                        <TableCell>101</TableCell>
                        <TableCell>500.000.000</TableCell>
                        <TableCell>{''}</TableCell>
                        <TableCell>
                            <div className="flex w-full justify-start gap-2 items-center">
                                <button><FaPenToSquare size={20} /></button>
                                <button><MdOutlineDelete size={24} color='red' /></button>
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow key="4">
                        <TableCell>{''}</TableCell>
                        <TableCell>Modal</TableCell>
                        <TableCell>Pendapatan gaji</TableCell>
                        <TableCell>301</TableCell>
                        <TableCell>{''}</TableCell>
                        <TableCell>500.000.000</TableCell>
                        <TableCell>
                            {''}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </DefaultLayout>

    )
}

export default JurnalUmum