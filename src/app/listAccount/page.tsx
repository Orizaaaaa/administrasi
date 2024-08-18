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
import ButtonSecondary from '@/components/elements/buttonSecondary'
import ModalAlert from '@/components/fragemnts/modal/modalAlert'
import useSWR from 'swr'
import { url } from '@/api/auth'
import { fetcher } from '@/api/fetcher'




const ListAccount = () => {
    const { data, error } = useSWR(`${url}/account/list`, fetcher, {
        keepPreviousData: true,
    });
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: openDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure()
    const [formUpdate, setFormUpdate] = useState({
        name: '',
        number: '',
        account: '',
    })

    const [form, setForm] = useState({
        name: '',
        number: '',
        account: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, option: string) => {
        const { name, value, } = e.target;
        if (option === 'formUpdate') {
            setFormUpdate({ ...formUpdate, [name]: value });
        } else {
            setForm({ ...form, [name]: value });
        }

    }

    const handleDropdownSelection = (selectedValue: string, option: string) => {
        if (option === 'formUpdate') {
            setFormUpdate((prevForm) => ({
                ...prevForm,
                account: selectedValue,
            }))
        } else {
            setForm((prevForm) => ({
                ...prevForm,
                account: selectedValue,
            }));
        }

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

    const modalUpdateOpen = () => {
        onOpen()
    }

    const modalDeleteOpen = () => {
        onOpenDelete()
    }
    console.log(data);



    return (
        <DefaultLayout>
            <Card>
                <h1 className='text-xl font-medium' >Tambah account</h1>
                <form className='mt-7' action="">
                    <InputForm className='bg-bone' htmlFor="name" title="Nama account" type="text" onChange={(e: any) => handleChange(e, 'form')} value={form.name} />
                    <InputForm className='bg-bone' htmlFor="number" title="Nomor account" type="text" onChange={(e: any) => handleChange(e, 'form')} value={form.number} />

                    <div className="space-y-2">
                        <h3>Pilih Type Account</h3>
                        <Autocomplete
                            clearButtonProps={{ size: 'sm', onClick: () => setForm({ ...form, account: '' }) }}
                            onSelectionChange={(e: any) => handleDropdownSelection(e, 'form')}
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
                                <button onClick={modalUpdateOpen} ><FaPenToSquare size={20} /></button>
                                <button onClick={modalDeleteOpen} ><MdOutlineDelete size={24} color='red' /></button>
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow key="2">
                        <TableCell>Kas</TableCell>
                        <TableCell>101</TableCell>
                        <TableCell>Aset</TableCell>
                        <TableCell>
                            <div className="flex w-full justify-start gap-2 items-center">
                                <button onClick={modalUpdateOpen} ><FaPenToSquare size={20} /></button>
                                <button onClick={modalDeleteOpen} ><MdOutlineDelete size={24} color='red' /></button>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <ModalDefault isOpen={isOpen} onClose={onClose} >
                <h1 className='font-medium' >Update akun</h1>
                <form action="">
                    <InputForm className='bg-bone' htmlFor="name" title="Nama account" type="text" onChange={(e: any) => handleChange(e, 'formUpdate')} value={formUpdate.name} />
                    <InputForm className='bg-bone' htmlFor="number" title="Nomor account" type="text" onChange={(e: any) => handleChange(e, 'formUpdate')} value={formUpdate.number} />

                    <div className="space-y-1">
                        <h3>Pilih Type Account</h3>
                        <Autocomplete
                            clearButtonProps={{ size: 'sm', onClick: () => setFormUpdate({ ...formUpdate, account: '' }) }}
                            onSelectionChange={(e: any) => handleDropdownSelection(e, 'formUpdate')}
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
            </ModalDefault>

            <ModalAlert isOpen={openDelete} onClose={onCloseDelete} >
                <h1 className='text-lg' >Apakah anda yakin akan menghapus akun ini ? </h1>
                <div className="flex justify-end gap-3">
                    <ButtonPrimary className='py-2 px-5 rounded-md font-medium' >Ya</ButtonPrimary>
                    <ButtonSecondary className='py-2 px-5 rounded-md font-medium' onClick={onCloseDelete}>Tidak</ButtonSecondary>
                </div>
            </ModalAlert>
        </DefaultLayout >

    )
}

export default ListAccount