'use client'
import Card from '@/components/elements/card/Card'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import React, { useState } from 'react'


const CatatTransaksi = () => {
    const [form, setForm] = useState({
        nama_transaksi: '',
        debit: '',
        credit: '',
        bukti: '',
        tanggal: '',
        nominal: ''

    })
    return (
        <DefaultLayout>
            <Card>
                <h1 className='text-xl font-medium' >Pencatatan Transaksi</h1>
                <p className='text-slate-500 text-small' >Pencatatan transaksi disini akan masuk dan di catat ke dalam jurnal umum</p>
                <form action="">

                </form>
            </Card>

        </DefaultLayout>

    )
}

export default CatatTransaksi