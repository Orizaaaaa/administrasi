'use client'
import Card from '@/components/elements/card/Card'
import InputForm from '@/components/elements/input/InputForm'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { Autocomplete, AutocompleteItem, DatePicker } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { camera } from '../image'
import Image from 'next/image'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { IoClose } from 'react-icons/io5'
import { url } from '@/api/auth'
import { fetcher } from '@/api/fetcher'
import useSWR from 'swr'
import { parseDate } from '@internationalized/date'
import { useDateFormatter } from "@react-aria/i18n";
import { formatDate } from '@/utils/helper'
import { createTransaction } from '@/api/transaction'
import { postImage } from '@/api/imagePost'

interface DropdownItem {
    label: string;
    value: string;
}

interface ItemData {
    _id: string;
    name: string;
}

interface Calendar {
    identifier: string;
}

const CatatTransaksi = () => {

    const { data } = useSWR(`${url}/account/list`, fetcher, {
        keepPreviousData: true,
    });

    // Formater date
    const dateNow = new Date();
    const [selectedDate, setSelectedDate] = useState(parseDate((formatDate(dateNow))))
    const dataDate = selectedDate
        ? `${selectedDate.month.toString().padStart(2, '0')}/${selectedDate.day.toString().padStart(2, '0')}/${selectedDate.year.toString().padStart(4, '0')}`
        : '';

    const [totalDebit, setTotalDebit] = useState(0);
    const [errorMsg, setErrorMsg] = useState('')
    const [totalKredit, setTotalKredit] = useState(0);
    const [isBalanced, setIsBalanced] = useState(true);
    const [form, setForm] = useState({
        name: '',
        image: null as File | null,
        journal_date: dataDate,
        detail: [
            {
                account: '',
                debit: 0, // Updated to number
                credit: 0, // Updated to number
                note: "This is a note for the journal entry."
            },
        ],
        data_change: false,
        note: "This is a note for the journal entry."
    });

    // Perhitungan balance
    useEffect(() => {
        const debit = form.detail.reduce((sum, trans) => sum + (trans.debit || 0), 0);
        const kredit = form.detail.reduce((sum, trans) => sum + (trans.credit || 0), 0);

        setTotalDebit(debit);
        setTotalKredit(kredit);
        setIsBalanced(debit === kredit);
    }, [form.detail]);

    // Handle perubahan input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = e.target;
        const updatedTransaksi = form.detail.map((trans, i) =>
            i === index ? { ...trans, [name]: name === 'debit' || name === 'credit' ? Number(value) : value } : trans
        );
        setForm({ ...form, detail: updatedTransaksi });
    };

    // Tambah kolom transaksi
    const addMoreTransaction = () => {
        setForm((prevForm) => ({
            ...prevForm,
            detail: [
                ...prevForm.detail,
                { account: '', debit: 0, credit: 0, note: 'This is a note for the journal entry.' },
            ],
        }));
    };

    // Hapus kolom transaksi
    const handleRemoveTransaction = (index: number) => {
        const updatedTransaksi = form.detail.filter((_, i) => i !== index);
        setForm({ ...form, detail: updatedTransaksi });
    };

    // Data dropdown
    const handleDropdownSelection = (selectedValue: string, index: number) => {
        const updatedTransaksi = form.detail.map((trans, i) =>
            i === index ? { ...trans, account: selectedValue } : trans
        );
        setForm({ ...form, detail: updatedTransaksi });
    };

    const dataDropdown: DropdownItem[] = (data?.data || []).map((item: ItemData) => ({
        label: item.name,
        value: item._id
    }));

    // Handle image
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
            setForm({ ...form, image: selectedImage || null });
        } else {
            console.log('error');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const allZero = form.detail.every(trans => trans.debit === 0 && trans.credit === 0);
        if (!isBalanced) {
            setErrorMsg('Transaksi tidak balance');
        } else if (allZero) {
            setErrorMsg('Transaksi tidak dapat diproses karena debit dan kredit semuanya 0');
        } else if (form.name === '' || form.image === null) {
            setErrorMsg('Nama Transaksi dan bukti tidak boleh kosong');
        } else {
            const imageUrl = await postImage({ image: form.image });
            if (imageUrl) {
                const data = { ...form, image: imageUrl };
                console.log('data yang di kirim', data);

                createTransaction(data, (result: any) => {
                    console.log('hasil', result);
                    // Reset form after successful submission
                });
                setErrorMsg('');
            }
        }
    };


    console.log(form);
    console.log(dataDate);

    return (
        <DefaultLayout>
            <Card>
                <h1 className='text-xl font-medium'>Pencatatan Transaksi</h1>
                <p className='text-slate-500 text-small'>Pencatatan transaksi disini akan masuk dan di catat ke dalam jurnal umum</p>
                <form className='mt-5' onSubmit={handleSubmit}>
                    <InputForm className='bg-bone' htmlFor="nama_transaksi" title="Nama Transaksi" type="text"
                        onChange={(e: any) => setForm({ ...form, name: e.target.value })}
                        value={form.name} />

                    <div className="mt-4 space-y-2">
                        <h2>Tanggal</h2>
                        <DatePicker
                            size='sm'
                            onChange={(e) => setSelectedDate(e)} value={selectedDate}
                            aria-label='datepicker' className="max-w-[284px] bg-bone border-2 border-primary rounded-lg" />
                    </div>

                    {form.detail.map((trans, index) => (
                        <div key={index} className="px-1 my-2">
                            <div className="lg:flex gap-5">
                                <div className="space-y-2">
                                    <h3>Akun</h3>
                                    <Autocomplete
                                        aria-label='dropdown'
                                        clearButtonProps={{ size: 'sm', onClick: () => handleDropdownSelection('', index) }}
                                        onSelectionChange={(e: any) => handleDropdownSelection(e, index)}
                                        defaultItems={dataDropdown}
                                        className=" w-[100%] lg:max-w-xs border-2 border-primary rounded-lg"
                                        size='sm'
                                    >
                                        {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                    </Autocomplete>
                                </div>
                                <div className="flex items-center gap-5 mt-3 lg:mt-0">
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
                                        htmlFor="credit"
                                        title="Kredit"
                                        type="number"
                                        onChange={(e: any) => handleChange(e, index)}
                                        value={trans.credit}
                                    />
                                    <IoClose onClick={() => handleRemoveTransaction(index)} className="cursor-pointer" color='red' />
                                </div>
                            </div>
                        </div>
                    ))}

                    <AiOutlinePlusCircle
                        className='button-add-more my-2 cursor-pointer'
                        size={30}
                        onClick={addMoreTransaction}
                    />

                    <div className="my-4 flex justify-end">
                        <p className={`text-small  ${isBalanced ? 'text-primary' : 'text-red'}`}>
                            {totalDebit} | {totalKredit}
                        </p>
                    </div>

                    <div className="images">
                        {form.image && form.image instanceof Blob ? (
                            <img className="h-[170px] md:h-[300px] w-auto mx-auto rounded-md" src={URL.createObjectURL(form.image)} />
                        ) : (
                            <div className="images border-dashed border-2 border-black rounded-md h-[200px] bg-gray-300">
                                <button className="flex-col justify-center items-center h-full w-full " type="button" onClick={() => handleFileManager('add')} >
                                    <Image className="w-20 h-20 mx-auto" src={camera} alt='cam' />
                                    <p>*Masukan bukti dari transaksi tersebut</p>
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
                            <button className={`border-2 border-primary  text-primary px-4 py-2 rounded-md ${form.image === null ? 'hidden' : ''}`} type="button" onClick={() => handleFileManager('add')} >Ubah Gambar</button>
                        </div>
                    </div>
                    <p className='my-2 text-red' > <i>{errorMsg}</i> </p>
                    <div className="flex justify-end">
                        <ButtonPrimary typeButon={'submit'} className="py-2 px-4 rounded-md font-medium "  >Selesai</ButtonPrimary>
                    </div>
                </form>
            </Card>
        </DefaultLayout>

    )
}

export default CatatTransaksi