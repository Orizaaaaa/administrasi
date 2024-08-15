'use client'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import ButtonSecondary from '@/components/elements/buttonSecondary'
import Card from '@/components/elements/card/Card'
import InputForm from '@/components/elements/input/InputForm'
import ModalDefault from '@/components/fragemnts/modal/modal'
import ModalAlert from '@/components/fragemnts/modal/modalAlert'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { Autocomplete, AutocompleteItem, DatePicker, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react'
import Image from 'next/image'
import React, { useState } from 'react'
import { FaPenToSquare } from 'react-icons/fa6'
import { MdOutlineDelete } from 'react-icons/md'
import { camera } from '../image'


const JurnalUmum = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: openDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure()
    const [date, setDate] = useState(null);
    const [form, setForm] = useState({
        nama_transaksi: '',
        debit: '',
        kredit: '',
        bukti: null as File | null,
        tanggal: null,
        nominal: ''

    })
    const modalOpen = () => {
        onOpen()
    }
    const modalDeleteOpen = () => {
        onOpenDelete()
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, } = e.target;
        setForm({ ...form, [name]: value });

    }

    const handleDropdownSelection = (selectedValue: string, option: string) => {
        if (option === 'debit') {
            setForm((prevForm) => ({
                ...prevForm,
                debit: selectedValue,
            }));
        } else {
            setForm((prevForm) => ({
                ...prevForm,
                kredit: selectedValue,
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

    const handleFileManager = (fileName: string) => {
        if (fileName === 'add') {
            const fileInput = document.getElementById("image-input-add") as HTMLInputElement | null;
            fileInput ? fileInput.click() : null;
        } else {
            console.log('error');

        }
    };
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, InputSelect: string) => {
        if (InputSelect === 'add') {
            const selectedImage = e.target.files?.[0];
            setForm({ ...form, bukti: selectedImage || null });
        } else {
            console.log('error');

        }
    };


    return (
        <DefaultLayout>
            <Card>
                <h1 className='text-xl font-medium '>Jurnal Umum</h1>
                <p className='text-slate-500 text-small' >Semua pencatatan transaksi akan masuk dan di catat ke dalam jurnal umum</p>
                <div className="total mt-4">
                    <h1>Total Debit : Rp. 1.000.000</h1>
                    <h1>Total Kredit: Rp. 1.000.000</h1>
                </div>
                <div className="flex justify-end">
                    <DatePicker size='sm' onChange={(e: any) => setDate(e)} value={date} aria-label='datepicker' className="max-w-[284px] bg-bone border-2 border-primary rounded-lg" />
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
                                <button onClick={modalOpen}><FaPenToSquare size={20} /></button>
                                <button onClick={modalDeleteOpen} ><MdOutlineDelete size={24} color='red' /></button>
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
                                <button onClick={modalOpen} ><FaPenToSquare size={20} /></button>
                                <button onClick={modalDeleteOpen} ><MdOutlineDelete size={24} color='red' /></button>
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

            <ModalDefault isOpen={isOpen} onClose={onClose} >
                <h1 className='font-medium' >Update Transaksi</h1>
                <form action="" className='mt-1' >
                    <InputForm className='bg-bone' htmlFor="nama_transaksi" title="Nama Transaksi" type="text" onChange={handleChange}
                        value={form.nama_transaksi} />
                    <div className="mt-4 space-y-2">
                        <h2>Tanggal</h2>
                        <DatePicker size='sm' onChange={(e: any) => setForm({ ...form, tanggal: e })} value={form.tanggal} aria-label='datepicker' className="max-w-[284px] bg-bone border-2 border-primary rounded-lg" />
                    </div>
                    <div className="flex gap-5 my-4">
                        <div className="space-y-2">
                            <h3>Debit</h3>
                            <Autocomplete
                                aria-label='dropdown'
                                clearButtonProps={{ size: 'sm', onClick: () => setForm({ ...form, debit: '' }) }}
                                onSelectionChange={(e: any) => handleDropdownSelection(e, 'debit')}
                                defaultItems={dataDropdown}
                                className="max-w-xs border-2 border-primary rounded-lg "
                                size='sm'
                            >
                                {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                            </Autocomplete>
                        </div>

                        <div className="space-y-2">
                            <h3>Kredit</h3>
                            <Autocomplete
                                aria-label='dropdown'
                                clearButtonProps={{ size: 'sm', onClick: () => setForm({ ...form, kredit: '' }) }}
                                onSelectionChange={(e: any) => handleDropdownSelection(e, 'kredit')}
                                defaultItems={dataDropdown}
                                className="max-w-xs border-2 border-primary rounded-lg "
                                size='sm'
                            >
                                {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                            </Autocomplete>
                        </div>
                    </div>
                    <InputForm className='bg-bone' htmlFor="nominal" title="Nominal Transaksi" type="text" onChange={handleChange} value={form.nominal} />
                    <div className="images ">
                        {form.bukti && form.bukti instanceof Blob ? (
                            <img className="h-[170px] md:h-[300px] w-auto mx-auto rounded-md" src={URL.createObjectURL(form.bukti)} />
                        ) : (
                            <div className="images border-dashed border-2 border-black rounded-md h-[140px] bg-gray-300">
                                <button className="flex-col justify-center items-center h-full w-full " type="button" onClick={() => handleFileManager('add')} >
                                    <Image className="w-20 h-20 mx-auto" src={camera} alt='cam' />
                                    <p>*Masukan bukti transaksi</p>
                                </button>
                            </div>
                        )}
                        <input
                            type="file"
                            className="hidden"
                            id="image-input-add"
                            onChange={(e) => handleImageChange(e, 'add')}
                        />
                        <div className="flex justify-center gap-3 mt-3">
                            <button className={`border-2 border-primary  text-primary px-4 py-2 rounded-md ${form.bukti === null ? 'hidden' : ''}`} type="button" onClick={() => handleFileManager('add')} >Ubah Gambar</button>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3">
                        <ButtonPrimary className='py-2 px-5 rounded-md font-medium' >Ya</ButtonPrimary>
                        <ButtonSecondary className='py-2 px-5 rounded-md font-medium' onClick={onClose}>Tidak</ButtonSecondary>
                    </div>
                </form>
            </ModalDefault>

            <ModalAlert isOpen={openDelete} onClose={onCloseDelete} >
                <h1 className='text-lg' >Apakah anda yakin akan menghapus transaksi ini ? </h1>
                <div className="flex justify-end gap-3">
                    <ButtonPrimary className='py-2 px-5 rounded-md font-medium' >Ya</ButtonPrimary>
                    <ButtonSecondary className='py-2 px-5 rounded-md font-medium' onClick={onCloseDelete}>Tidak</ButtonSecondary>
                </div>
            </ModalAlert>
        </DefaultLayout>

    )
}

export default JurnalUmum