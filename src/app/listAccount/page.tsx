'use client'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import Card from '@/components/elements/card/Card'
import InputForm from '@/components/elements/input/InputForm'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { Autocomplete, AutocompleteItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import React, { useState } from 'react'

const ListAccount = () => {
    const [form, setForm] = useState({
        name: '',
        number: '',
        account: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, } = e.target;
        setForm({ ...form, [name]: value });
    }
    const handleDropdownSelection = (selectedValue: string) => {
        setForm((prevForm) => ({
            ...prevForm,
            account: selectedValue,
        }));
    };

    const dataDropdown = [
        { label: "Aset", value: "1", },
        { label: "Kewajiban", value: "2", },
        { label: "Ekuitas", value: "3" },
        { label: "Pendapatan", value: "4" },
        { label: "Biaya Penjualan", value: "5" },
        { label: "Pengeluaran", value: "6" },
        { label: "pendapatan lain lain", value: "7" },
        { label: "biaya lain lain", value: "8" },
    ];

    console.log(form);

    return (
        <DefaultLayout>
            <Card>
                <h1 className='text-xl font-medium' >Tambah nama account</h1>
                <form className='mt-7' action="">
                    <InputForm className='bg-bone' htmlFor="name" title="Name" type="text" onChange={handleChange} value={form.name} />
                    <InputForm className='bg-bone' htmlFor="number" title="Nomor account" type="text" onChange={handleChange} value={form.number} />

                    <div className="space-y-2">
                        <h3>Pilih Type Account</h3>
                        <Autocomplete
                            clearButtonProps={{ size: 'sm', onClick: () => setForm({ ...form, account: '' }) }}
                            onSelectionChange={(e: any) => handleDropdownSelection(e)}
                            defaultItems={dataDropdown}
                            label="masukan type account"
                            className="max-w-xs border-2 border-primary rounded-lg "
                            size='sm'
                        >
                            {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                        </Autocomplete>
                    </div>

                    <div className="flex justify-end">
                        <ButtonPrimary className="py-2 px-4 rounded-md font-medium " onClick={() => console.log(form)} >Selesai</ButtonPrimary>
                    </div>
                </form>

                <Table className='mt-7 border-hidden' aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>NAME</TableColumn>
                        <TableColumn>ROLE</TableColumn>
                        <TableColumn>STATUS</TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow key="1">
                            <TableCell>Tony Reichert</TableCell>
                            <TableCell>CEO</TableCell>
                            <TableCell>Active</TableCell>
                        </TableRow>
                        <TableRow key="2">
                            <TableCell>Zoey Lang</TableCell>
                            <TableCell>Technical Lead</TableCell>
                            <TableCell>Paused</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell>Jane Fisher</TableCell>
                            <TableCell>Senior Developer</TableCell>
                            <TableCell>Active</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell>William Howard</TableCell>
                            <TableCell>Community Manager</TableCell>
                            <TableCell>Vacation</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Card>
        </DefaultLayout >

    )
}

export default ListAccount