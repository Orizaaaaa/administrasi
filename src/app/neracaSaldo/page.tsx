'use client'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import React from 'react'

type Props = {}

const NeracaSaldo = (props: Props) => {
    return (
        <DefaultLayout>
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
                </TableBody>
            </Table>
        </DefaultLayout>

    )
}

export default NeracaSaldo