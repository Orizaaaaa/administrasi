'use client'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import ButtonSecondary from '@/components/elements/buttonSecondary'
import Card from '@/components/elements/card/Card'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { Autocomplete, AutocompleteItem, DatePicker, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import React, { useState } from 'react'

const BukuBesar = () => {
    const [form, setForm] = useState({
        neraca: ''
    })
    const [date, setDate] = useState(null);
    const handleDropdownSelection = (selectedValue: string, option: string) => {

        setForm((prevForm) => ({
            ...prevForm,
            neraca: selectedValue,
        }));

    };

    const dataDropdown = [
        { label: "Aset", value: "1", },
        { label: "Kewajiban", value: "2", },
        { label: "Modal", value: "3" },
    ];

    return (
        <DefaultLayout>
            <Card>
                <h1 className='text-xl font-medium ' >Buku Besar</h1>
                <p className='text-small text-gray' >Ini adalah halaman besar yang akan mengirim data transaksi ke dalam neraca</p>
                <div className="space-y-3 lg:space-y-0 lg:flex  justify-end gap-2 mt-3 lg:mt-0">
                    <ButtonSecondary className=' px-4 rounded-md w-auto'>Download dalam bentuk Pdf</ButtonSecondary>
                    <DatePicker size='sm' onChange={(e: any) => setDate(e)} value={date} aria-label='datepicker' className="max-w-[284px] bg-bone border-2 border-primary rounded-lg" />
                </div>
            </Card>
            <div className='mt-7' >
                <div className="space-y-3 lg:space-y-0 lg:flex gap-2 items-center mb-2 justify-between">
                    <h1 className='mb-1'>Kas (101)</h1>
                    <Autocomplete
                        aria-label='dropdown'
                        clearButtonProps={{ size: 'sm', onClick: () => setForm({ ...form, neraca: '' }) }}
                        onSelectionChange={(e: any) => handleDropdownSelection(e, 'debit')}
                        defaultItems={dataDropdown}
                        className="max-w-xs border-2 border-primary rounded-lg "
                        size='sm'
                    >
                        {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                    </Autocomplete>
                </div>
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
                <div className="space-y-3 lg:space-y-0 lg:flex gap-2 items-center mb-2 justify-between">
                    <h1 className='mb-1'>Modal (301)</h1>
                    <Autocomplete
                        aria-label='dropdown'
                        clearButtonProps={{ size: 'sm', onClick: () => setForm({ ...form, neraca: '' }) }}
                        onSelectionChange={(e: any) => handleDropdownSelection(e, 'debit')}
                        defaultItems={dataDropdown}
                        className="max-w-xs border-2 border-primary rounded-lg "
                        size='sm'
                    >
                        {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                    </Autocomplete>
                </div>

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
                <div className="space-y-3 lg:space-y-0 lg:flex gap-2 items-center mb-2 justify-between">
                    <h1 className='mb-1'>Pendapatan Pajak ( 303 )</h1>
                    <Autocomplete
                        aria-label='dropdown'
                        clearButtonProps={{ size: 'sm', onClick: () => setForm({ ...form, neraca: '' }) }}
                        onSelectionChange={(e: any) => handleDropdownSelection(e, 'debit')}
                        defaultItems={dataDropdown}
                        className="max-w-xs border-2 border-primary rounded-lg "
                        size='sm'
                    >
                        {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                    </Autocomplete>
                </div>
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