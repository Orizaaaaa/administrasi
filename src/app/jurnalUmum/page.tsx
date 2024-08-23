'use client'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import ButtonSecondary from '@/components/elements/buttonSecondary'
import Card from '@/components/elements/card/Card'
import InputForm from '@/components/elements/input/InputForm'
import ModalAlert from '@/components/fragemnts/modal/modalAlert'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { Autocomplete, AutocompleteItem, DatePicker, DateRangePicker, Modal, ModalContent, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FaPenToSquare } from 'react-icons/fa6'
import { MdOutlineDelete } from 'react-icons/md'
import { camera } from '../image'
import { getJurnalUmum } from '@/api/transaction'
import { parseDate } from '@internationalized/date'
import { formatDate, formatDateStr } from '@/utils/helper'
import useSWR from 'swr'
import { fetcher } from '@/api/fetcher'
import { IoClose } from 'react-icons/io5'
import { url } from '@/api/auth'
import { AiOutlinePlusCircle } from 'react-icons/ai'

interface DropdownItem {
    label: string;
    value: string;
}

interface ItemData {
    _id: string;
    name: string;
}

const JurnalUmum = () => {
    const { data } = useSWR(`${url}/account/list`, fetcher, {
        keepPreviousData: true,
    });
    const dateNow = new Date();
    let [date, setDate] = React.useState({
        start: parseDate((formatDate(dateNow))),
        end: parseDate((formatDate(dateNow))),
    });

    const [selectedDate, setSelectedDate] = useState(parseDate((formatDate(dateNow))))

    React.useEffect(() => {
        setForm((prevForm) => ({
            ...prevForm,
            journal_date: formatDateStr(selectedDate),
        }));
    }, [selectedDate]);

    const [total, setTotal] = useState({
        debit: 0,
        credit: 0
    })
    const [loadingState, setLoadingState] = useState<"loading" | "error" | "idle">("idle");
    const [dataTrans, setDataTrans] = useState([])
    const startDate = formatDateStr(date.start);
    const endDate = formatDateStr(date.end);


    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: openDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure()
    const [form, setForm] = useState({
        name: '',
        image: null as File | null,
        journal_date: formatDateStr(selectedDate),
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


    const modalOpen = (item: any) => {
        const date = new Date(item.journal_date);
        setSelectedDate(parseDate(formatDate(date)));
        onOpen()
    }


    const modalDeleteOpen = () => {
        onOpenDelete()
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = e.target;
        const updatedTransaksi = form.detail.map((trans, i) =>
            i === index ? { ...trans, [name]: name === 'debit' || name === 'credit' ? Number(value) : value } : trans
        );
        setForm({ ...form, detail: updatedTransaksi });
    };

    const addMoreTransaction = () => {
        setForm((prevForm) => ({
            ...prevForm,
            detail: [
                ...prevForm.detail,
                { account: '', debit: 0, credit: 0, note: 'This is a note for the journal entry.' },
            ],
        }));
    };

    const handleRemoveTransaction = (index: number) => {
        const updatedTransaksi = form.detail.filter((_, i) => i !== index);
        setForm({ ...form, detail: updatedTransaksi });
    };

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


    useEffect(() => {
        setLoadingState("loading");
        getJurnalUmum(startDate, endDate, (result: any) => {
            setDataTrans(result.data);
            setLoadingState("idle");

            // Hitung total setelah data di-set
            let calculatedTotal = { debit: 0, credit: 0 };
            result.data.forEach((item: any) => {
                item.detail.forEach((detail: any) => {
                    calculatedTotal.debit += detail.debit;
                    calculatedTotal.credit += detail.credit;
                });
            });
            setTotal(calculatedTotal);
        });
    }, [startDate, endDate]);

    console.log(form);
    console.log(data);
    console.log(total);


    return (
        <DefaultLayout>
            <Card>
                <h1 className='text-xl font-medium '>Jurnal Umum</h1>
                <p className='text-slate-500 text-small' >Semua pencatatan transaksi akan masuk dan di catat ke dalam jurnal umum</p>
                <div className="total mt-4">
                    <h1>Total Debit : Rp {total.debit}</h1>
                    <h1>Total Kredit: Rp {total.credit}</h1>
                </div>
                <div className="space-y-3 lg:space-y-0 lg:flex  justify-end gap-2 mt-3 lg:mt-0">
                    <ButtonSecondary className=' px-4 rounded-md'>Download dalam bentuk Excel</ButtonSecondary>
                    <DateRangePicker
                        visibleMonths={2}
                        size='sm' onChange={setDate} value={date} aria-label='datepicker' className="max-w-[284px] bg-bone border-2 border-primary rounded-lg"
                    />

                </div>

            </Card>
            <Table className='mt-7 border-hidden' aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>TANGGAL</TableColumn>
                    <TableColumn>KETERANGAN AKUN</TableColumn>
                    <TableColumn>KETERANGAN TRANSAKSI</TableColumn>
                    <TableColumn>REF</TableColumn>
                    <TableColumn>DEBIT</TableColumn>
                    <TableColumn>KREDIT</TableColumn>
                    <TableColumn>ACTION</TableColumn>
                </TableHeader>
                <TableBody
                    loadingContent={<Spinner />}
                    loadingState={loadingState}
                    emptyContent={`Tidak ada transaksi di ${date.start} - ${date.end}`}
                >
                    {dataTrans.map((item: any) =>
                        item.detail.map((detail: any) => (
                            <TableRow key={detail._id}>
                                <TableCell>{new Date(item.journal_date).toLocaleDateString()}</TableCell>
                                <TableCell>{detail.account.name}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{detail.account.account_code}</TableCell>
                                <TableCell>{detail.debit.toLocaleString()}</TableCell>
                                <TableCell>{detail.credit.toLocaleString()}</TableCell>
                                <TableCell>
                                    <div className="flex w-full justify-start gap-2 items-center">
                                        <button onClick={() => modalOpen(item)} >
                                            <FaPenToSquare size={20} />
                                        </button>
                                        <button onClick={() => modalDeleteOpen()} >
                                            <MdOutlineDelete size={24} color='red' />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>


            <Modal isOpen={isOpen} onClose={onClose} size='xl' scrollBehavior='outside'>
                <ModalContent className='p-5' >
                    <h1 className='font-medium' >Update Transaksi</h1>
                    <form action="" className='mt-1' >
                        <InputForm className='bg-bone' htmlFor="name" title="Nama Transaksi" type="text" onChange={handleChange}
                            value={form.name} />

                        <div className="space-y-2">
                            <h2>Tanggal</h2>
                            <DatePicker size='sm'
                                aria-label='datepicker'
                                value={selectedDate}
                                className=" max-w-[284px] bg-bone border-2 border-primary rounded-lg" />
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


                        <div className="images ">
                            {form.image && form.image instanceof Blob ? (
                                <img className="h-[140px] md:h-[140px] w-auto mx-auto rounded-md" src={URL.createObjectURL(form.image)} />
                            ) : (
                                <div className="images border-dashed border-2 border-black rounded-md h-[120px] bg-gray-300">
                                    <button className="flex-col justify-center items-center h-full w-full " type="button" onClick={() => handleFileManager('add')} >
                                        <Image className="w-15 h-15 mx-auto" src={camera} alt='cam' />
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
                            <div className="flex justify-center gap-3 my-3">
                                <button className={`border-2 border-primary  text-primary px-4 py-2 rounded-md ${form.image === null ? 'hidden' : ''}`} type="button" onClick={() => handleFileManager('add')} >Ubah Gambar</button>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3">
                            <ButtonPrimary className='py-2 px-5 rounded-md font-medium' >Ya</ButtonPrimary>
                            <ButtonSecondary className='py-2 px-5 rounded-md font-medium' onClick={onClose}>Tidak</ButtonSecondary>
                        </div>
                    </form>
                </ModalContent>
            </Modal>

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