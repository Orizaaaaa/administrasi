'use client'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import Card from '@/components/elements/card/Card'
import InputForm from '@/components/elements/input/InputForm'
import ModalDefault from '@/components/fragemnts/modal/modal'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { Autocomplete, AutocompleteItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react'
import React, { useState } from 'react'
import { FaPenToSquare } from 'react-icons/fa6'
import { MdOutlineDelete } from 'react-icons/md'

const ListAccount = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
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

    const modalOpen = () => {
        onOpen()
    }

    return (
        <DefaultLayout>
            <Card>
                <h1 className='text-xl font-medium' >Tambah nama account</h1>
                <form className='mt-7' action="">
                    <InputForm className='bg-bone' htmlFor="name" title="Nama account" type="text" onChange={handleChange} value={form.name} />
                    <InputForm className='bg-bone' htmlFor="number" title="Nomor account" type="text" onChange={handleChange} value={form.number} />

                    <div className="space-y-2">
                        <h3>Pilih Type Account</h3>
                        <Autocomplete
                            clearButtonProps={{ size: 'sm', onClick: () => setForm({ ...form, account: '' }) }}
                            onSelectionChange={(e: any) => handleDropdownSelection(e)}
                            defaultItems={dataDropdown}
                            aria-label='dropdown'
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
            </Card>
            <Table className='mt-7 border-hidden' aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>NAMA ACCOUNT</TableColumn>
                    <TableColumn>NO ACCOUNT</TableColumn>
                    <TableColumn>TYPE ACCOUNT</TableColumn>
                    <TableColumn>ACTION</TableColumn>
                </TableHeader>
                <TableBody>
                    <TableRow key="1">
                        <TableCell>Kas</TableCell>
                        <TableCell>101</TableCell>
                        <TableCell>Aset</TableCell>
                        <TableCell>
                            <div className="flex w-full justify-start gap-2 items-center">
                                <button onClick={modalOpen} ><FaPenToSquare size={20} /></button>
                                <button><MdOutlineDelete size={24} color='red' /></button>
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow key="2">
                        <TableCell>Kas</TableCell>
                        <TableCell>101</TableCell>
                        <TableCell>Aset</TableCell>
                        <TableCell>
                            <div className="flex w-full justify-start gap-2 items-center">
                                <button onClick={modalOpen} ><FaPenToSquare size={20} /></button>
                                <button><MdOutlineDelete size={24} color='red' /></button>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <ModalDefault isOpen={isOpen} onClose={onClose} >
                <h1>Update Transaksi</h1>
            </ModalDefault>
        </DefaultLayout >

    )
}

export default ListAccount