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
import useSWR, { mutate } from 'swr'
import { url } from '@/api/auth'
import { fetcher } from '@/api/fetcher'
import { createAccount, deleteAcount, updateAccount } from '@/api/acount'
import { changeTypeAccount } from '@/utils/helper'




const ListAccount = () => {
    const { data, error } = useSWR(`${url}/account/list`, fetcher, {
        keepPreviousData: true,
    });
    const [deletedId, setDeletedId] = useState('')
    const [updatedId, setUpdatedId] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: openDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure()
    const [formUpdate, setFormUpdate] = useState({
        name: '',
        account_code: '',
        account_type: 0,
    })

    const [form, setForm] = useState({
        name: '',
        account_code: '',
        account_type: 0,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, option: string) => {
        const { name, value, } = e.target;
        if (option === 'formUpdate') {
            setFormUpdate({ ...formUpdate, [name]: (name === 'account_code') ? Number(value) : value });
        } else {
            setForm({ ...form, [name]: (name === 'account_code') ? Number(value) : value });
        }

    }

    const handleDropdownSelection = (selectedValue: number, option: string) => {
        console.log('haii', selectedValue);

        if (option === 'formUpdate') {
            setFormUpdate((prevForm) => ({
                ...prevForm,
                account_type: Number(selectedValue),
            }))
        } else {
            setForm((prevForm) => ({
                ...prevForm,
                account_type: Number(selectedValue),
            }));
        }

    };

    const dataDropdown = [
        { label: "Aset", value: 1, },
        { label: "Kewajiban", value: 2, },
        { label: "Ekuitas", value: 3 },
        { label: "Pendapatan", value: 4 },
        { label: "Biaya Penjualan", value: 5 },
        { label: "Pengeluaran", value: 6 },
        { label: "Pendapatan lain lain", value: 7 },
        { label: "Biaya lain lain", value: 8 },
    ];

    const modalUpdateOpen = (value: any) => {
        setFormUpdate({ ...formUpdate, name: value?.name, account_code: value.account_code, account_type: value.account_type })
        setUpdatedId(value._id)
        onOpen()
    }

    const modalDeleteOpen = (value: any) => {
        setDeletedId(value)
        onOpenDelete()
    }

    const handleCreate = async (e: any) => {
        e.preventDefault()
        await createAccount(form, () => {
            setForm({
                name: '',
                account_code: '',
                account_type: 0,
            })
            mutate(`${url}/account/list`);
        })
    }

    const handleDelete = async () => {
        await deleteAcount(deletedId, () => {
            onCloseDelete()
            mutate(`${url}/account/list`);
        })
    }

    const handleUpdate = async () => {
        await updateAccount(updatedId, formUpdate, () => {
            setFormUpdate({
                name: '',
                account_code: '',
                account_type: 0,
            })
            mutate(`${url}/account/list`);
            onClose()
        })
    }


    return (
        <DefaultLayout>
            <Card>
                <h1 className='text-xl font-medium' >Tambah account</h1>
                <form className='mt-7' action="">
                    <InputForm className='bg-bone' htmlFor="name" title="Nama account" type="text" onChange={(e: any) => handleChange(e, 'form')} value={form.name} />
                    <InputForm className='bg-bone' htmlFor="account_code" title="Nomor account" type="number" onChange={(e: any) => handleChange(e, 'form')} value={form.account_code} />

                    <div className="space-y-2">
                        <h3>Pilih Type Account</h3>
                        <Autocomplete
                            clearButtonProps={{ size: 'sm', onClick: () => setForm({ ...form, account_type: 0 }) }}
                            onSelectionChange={(e: any) => handleDropdownSelection(e, 'form')}
                            defaultItems={dataDropdown}
                            defaultSelectedKey={form.account_type}
                            aria-label='dropdown'
                            className="max-w-xs border-2 border-primary rounded-lg "
                            size='sm'
                        >
                            {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                        </Autocomplete>
                    </div>

                    <div className="flex justify-end">
                        <ButtonPrimary typeButon={'submit'} className="py-2 px-4 rounded-md font-medium " onClick={handleCreate} >Selesai</ButtonPrimary>
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
                    {data?.data?.map((item: any, index: number) => (
                        <TableRow key={index}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.account_code}</TableCell>
                            <TableCell>{changeTypeAccount(item.account_type)}</TableCell>
                            <TableCell>
                                <div className="flex w-full justify-start gap-2 items-center">
                                    <button onClick={() => modalUpdateOpen(item)} ><FaPenToSquare size={20} /></button>
                                    <button onClick={() => modalDeleteOpen(item?._id)} ><MdOutlineDelete size={24} color='red' /></button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>



            <ModalDefault isOpen={isOpen} onClose={onClose} >
                <h1 className='font-medium' >Update akun</h1>
                <div >
                    <InputForm className='bg-bone' htmlFor="name" title="Nama account" type="text" onChange={(e: any) => handleChange(e, 'formUpdate')} value={formUpdate.name} />
                    <InputForm className='bg-bone' htmlFor="account_code" title="Nomor account" type="number" onChange={(e: any) => handleChange(e, 'formUpdate')} value={formUpdate.account_code} />

                    <div className="space-y-1">
                        <h3>Pilih Type Account</h3>
                        <Autocomplete
                            clearButtonProps={{ size: 'sm', onClick: () => setFormUpdate({ ...formUpdate, account_type: 0 }) }}
                            onSelectionChange={(e: any) => handleDropdownSelection(e, 'formUpdate')}
                            defaultItems={dataDropdown}
                            defaultSelectedKey={formUpdate.account_type}
                            aria-label='dropdown'
                            className="max-w-xs border-2 border-primary rounded-lg "
                            size='sm'
                        >
                            {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                        </Autocomplete>
                    </div>
                    <div className="flex justify-end">
                        <ButtonPrimary className="py-2 px-4 rounded-md font-medium" onClick={handleUpdate} >Selesai</ButtonPrimary>
                    </div>
                </div>
            </ModalDefault>

            <ModalAlert isOpen={openDelete} onClose={onCloseDelete} >
                <h1 className='text-lg' >Apakah anda yakin akan menghapus akun ini ? </h1>
                <div className="flex justify-end gap-3">
                    <ButtonPrimary onClick={handleDelete} className='py-2 px-5 rounded-md font-medium' >Ya</ButtonPrimary>
                    <ButtonSecondary className='py-2 px-5 rounded-md font-medium' onClick={onCloseDelete}>Tidak</ButtonSecondary>
                </div>
            </ModalAlert>
        </DefaultLayout >

    )
}

export default ListAccount