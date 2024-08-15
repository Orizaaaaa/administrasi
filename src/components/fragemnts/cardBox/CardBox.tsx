import { money } from '@/app/image'
import Card from '@/components/elements/card/Card'
import Image from 'next/image'
import React from 'react'

type Props = {}

const CardBox = (props: Props) => {
    return (
        <Card padding='p-3'>
            <div className="w-full">
                <div className="flex justify-between items-center">
                    <p className='text-slate-500' >Barang masuk</p>
                    <Image src={money} alt="dashboard" />
                </div>
                <h1 className='text-2xl font-bold my-3' >1.789</h1>
                <p className='text-slate-500' ><span className='text-green-500 ' >10%</span> 1 minggu terakhir</p>
            </div>
        </Card>
    )
}

export default CardBox