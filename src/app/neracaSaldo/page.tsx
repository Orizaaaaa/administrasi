'use client'

import { downloadNeraca, getNeraca } from '@/api/transaction'
import ButtonSecondary from '@/components/elements/buttonSecondary'
import Card from '@/components/elements/card/Card'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { changeTypeAccount, dateFirst, formatDate, formatDateStr } from '@/utils/helper'
import { parseDate } from '@internationalized/date'
import { DateRangePicker, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import React, { useEffect } from 'react'


const NeracaSaldo = () => {

    const dateNow = new Date();
    const [data, setData] = React.useState([])
    let [date, setDate] = React.useState({
        start: parseDate((formatDate(dateFirst))),
        end: parseDate((formatDate(dateNow))),
    });
    const startDate = formatDateStr(date.start);
    const endDate = formatDateStr(date.end);

    useEffect(() => {
        getNeraca(startDate, endDate, (result: any) => {
            const sortedData = result.data.sort((a: any, b: any) => a.account_type - b.account_type);
            setData(sortedData);
        });
    }, [startDate, endDate]);

    const handleDownload = () => {
        downloadNeraca(startDate, endDate, (result: any) => {
            if (result instanceof Blob) {
                // Jika hasil adalah Blob, kita lanjutkan dengan download
                const url = window.URL.createObjectURL(result);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `Neraca-${startDate}-${endDate}.xlsx`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                console.log('Download success');
            } else {
                // Jika tidak, anggap itu sebagai error
                console.error('Download failed:', result);
            }
        });
    };


    return (
        <DefaultLayout>
            <Card className='mb-4' >
                <h1>Neraca Saldo</h1>
                <p className='text-small text-gray' >Untuk menghitung total perbulan nya</p>
                <div className="space-y-3 lg:space-y-0 lg:flex  justify-end gap-2 mt-3 lg:mt-0">
                    <ButtonSecondary onClick={handleDownload} className=' px-4 rounded-md w-auto'>Download dalam bentuk Excel</ButtonSecondary>
                    <DateRangePicker
                        visibleMonths={2}
                        size='sm' onChange={setDate} value={date} aria-label='datepicker' className="max-w-[284px] bg-bone border-2 border-primary rounded-lg"
                    />
                </div>
            </Card>
            <Table aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>NAMA AKUN</TableColumn>
                    <TableColumn>TIPE AKUN</TableColumn>
                    <TableColumn>REF</TableColumn>
                    <TableColumn>DEBIT</TableColumn>
                    <TableColumn>KREDIT</TableColumn>
                    <TableColumn>TOTAL</TableColumn>
                </TableHeader>
                <TableBody emptyContent={`Tidak ada transaksi di ${date.start} - ${date.end}`}>
                    {data.map((item: any, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{changeTypeAccount(item.account_type)}</TableCell>
                            <TableCell>{item.account_code}</TableCell>
                            <TableCell>{item.totalDebit.toLocaleString()}</TableCell>
                            <TableCell>{item.totalCredit.toLocaleString()}</TableCell>
                            <TableCell className='font-bold'>
                                {(Number(item.totalDebit || 0) - Number(item.totalCredit || 0)).toLocaleString()}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </DefaultLayout>

    )
}

export default NeracaSaldo