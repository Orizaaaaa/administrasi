'use client'

import ButtonSecondary from '@/components/elements/buttonSecondary'
import Card from '@/components/elements/card/Card'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { DatePicker, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import React from 'react'

type Props = {}

const NeracaSaldo = (props: Props) => {
    return (
        <DefaultLayout>
            <Card className='mb-4' >
                <h1>Neraca Saldo</h1>
                <p className='text-small text-gray' >Untuk menghitung total perbulan nya</p>
                <div className="space-y-3 lg:space-y-0 lg:flex  justify-end gap-2 mt-3 lg:mt-0">
                    <ButtonSecondary className=' px-4 rounded-md w-auto'>Download dalam bentuk Excel</ButtonSecondary>
                    <DatePicker size='sm' aria-label='datepicker' className="max-w-[284px] bg-bone border-2 my-2 border-primary rounded-lg" />
                </div>
            </Card>
            <Table aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>AKUN</TableColumn>
                    <TableColumn>REF</TableColumn>
                    <TableColumn>TIPE AKUN</TableColumn>
                    <TableColumn>DEBIT</TableColumn>
                    <TableColumn>KREDIT</TableColumn>
                    <TableColumn>TOTAL</TableColumn>
                </TableHeader>
                <TableBody>
                    <TableRow key="1">
                        <TableCell>Kas</TableCell>
                        <TableCell>101</TableCell>
                        <TableCell>Aset</TableCell>
                        <TableCell>2.500.000.000</TableCell>
                        <TableCell>{''}</TableCell>
                        <TableCell className='font-bold' >2.500.000.000</TableCell>
                    </TableRow>
                    <TableRow key="2">
                        <TableCell>Modal</TableCell>
                        <TableCell>101</TableCell>
                        <TableCell>Modal</TableCell>
                        <TableCell>{''}</TableCell>
                        <TableCell>50.000.000</TableCell>
                        <TableCell className='font-bold' >50.000.000</TableCell>
                    </TableRow>
                    <TableRow key="3">
                        <TableCell>Kewajiban</TableCell>
                        <TableCell>101</TableCell>
                        <TableCell>Kewajiban</TableCell>
                        <TableCell>{''}</TableCell>
                        <TableCell>1.500.000.000</TableCell>
                        <TableCell className='font-bold' >1.500.000.000</TableCell>
                    </TableRow>
                    <TableRow key="4">
                        <TableCell className='font-bold' >TOTAL KEWAJIBAN DAN MODAL</TableCell>
                        <TableCell>101</TableCell>
                        <TableCell>Kewajiban</TableCell>
                        <TableCell>{''}</TableCell>
                        <TableCell>1.500.000.000</TableCell>
                        <TableCell className='font-bold' >1.500.000.000</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </DefaultLayout>

    )
}

export default NeracaSaldo