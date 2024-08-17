'use client'
import Card from '@/components/elements/card/Card'
import InputForm from '@/components/elements/input/InputForm'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { Autocomplete, AutocompleteItem, DatePicker } from '@nextui-org/react'
import React, { useState } from 'react'
import { camera } from '../image'
import Image from 'next/image'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import { AiOutlinePlusCircle } from 'react-icons/ai'

interface DateData {
    calendar: string;
    era: string;
    year: number;
    month: number;
    day: number;
}

const CatatTransaksi = () => {
    const [form, setForm] = useState({
        nama_transaksi: '',
        bukti: null as File | null,
        tanggal: null,
        transaksi: [
            {
                akun: '',
                debit: '',
                kredit: '',
            },
        ],
    });





    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = e.target;
        const updatedTransaksi = form.transaksi.map((trans, i) =>
            i === index ? { ...trans, [name]: value } : trans
        );
        setForm({ ...form, transaksi: updatedTransaksi });
    };

    const addMoreTransaction = () => {
        setForm((prevForm) => ({
            ...prevForm,
            transaksi: [
                ...prevForm.transaksi,
                { akun: '', debit: '', kredit: '' },
            ],
        }));
    };

    const handleDropdownSelection = (selectedValue: string, index: number) => {
        const updatedTransaksi = form.transaksi.map((trans, i) =>
            i === index ? { ...trans, akun: selectedValue } : trans
        );
        setForm({ ...form, transaksi: updatedTransaksi });
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

    console.log(form);


    return (
        <DefaultLayout>
            <Card>
                <h1 className='text-xl font-medium' >Pencatatan Transaksi</h1>
                <p className='text-slate-500 text-small' >Pencatatan transaksi disini akan masuk dan di catat ke dalam jurnal umum</p>

                <form action="" className='mt-5' >
                    <InputForm className='bg-bone' htmlFor="nama_transaksi" title="Nama Transaksi" type="text" onChange={handleChange}
                        value={form.nama_transaksi} />
                    <div className="mt-4 space-y-2">
                        <h2>Tanggal</h2>
                        <DatePicker size='sm' onChange={(e: any) => setForm({ ...form, tanggal: e })} value={form.tanggal} aria-label='datepicker' className="max-w-[284px] bg-bone border-2 border-primary rounded-lg" />
                    </div>

                    {form.transaksi.map((trans, index) => (
                        <div key={index} className="px-1 my-2">
                            <div className="lg:flex gap-5">
                                <div className="space-y-2">
                                    <h3>Akun</h3>
                                    <Autocomplete
                                        aria-label='dropdown'
                                        clearButtonProps={{ size: 'sm', onClick: () => handleDropdownSelection('', index) }}
                                        onSelectionChange={(e: any) => handleDropdownSelection(e, index)}
                                        defaultItems={dataDropdown}
                                        className="max-w-xs border-2 border-primary rounded-lg"
                                        size='sm'
                                    >
                                        {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                    </Autocomplete>
                                </div>
                                <InputForm
                                    className='bg-bone'
                                    htmlFor="debit"
                                    title="Debit"
                                    type="number"
                                    onChange={(e: any) => handleChange(e, index)}
                                    value={trans.debit}
                                />
                                <InputForm
                                    className='bg-bone'
                                    htmlFor="kredit"
                                    title="Kredit"
                                    type="number"
                                    onChange={(e: any) => handleChange(e, index)}
                                    value={trans.kredit}
                                />
                            </div>
                        </div>
                    ))}

                    <AiOutlinePlusCircle
                        className='button-add-more my-2 cursor-pointer'
                        size={30}
                        onClick={addMoreTransaction}
                    />

                    <div className="images ">
                        {form.bukti && form.bukti instanceof Blob ? (
                            <img className="h-[170px] md:h-[300px] w-auto mx-auto rounded-md" src={URL.createObjectURL(form.bukti)} />
                        ) : (
                            <div className="images border-dashed border-2 border-black rounded-md h-[200px] bg-gray-300">
                                <button className="flex-col justify-center items-center h-full w-full " type="button" onClick={() => handleFileManager('add')} >
                                    <Image className="w-20 h-20 mx-auto" src={camera} alt='cam' />
                                    <p>*Masukan logo dari kategori tersebut</p>
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
                </form>
            </Card>

        </DefaultLayout>

    )
}

export default CatatTransaksi