'use client'
import { GetLabaRugi } from '@/api/transaction'
import ButtonSecondary from '@/components/elements/buttonSecondary'
import Card from '@/components/elements/card/Card'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { changeTypeAccount, dateFirst, formatDate, formatDateStr } from '@/utils/helper'
import { parseDate } from '@internationalized/date'
import { DatePicker, DateRangePicker, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import React, { useEffect } from 'react'


const LabaRugi = () => {

    const dateNow = new Date();
    const [data, setData] = React.useState<any>(null);
    let [date, setDate] = React.useState({
        start: parseDate((formatDate(dateFirst))),
        end: parseDate((formatDate(dateNow))),
    });
    const startDate = formatDateStr(date.start);
    const endDate = formatDateStr(date.end);


    useEffect(() => {
        GetLabaRugi(startDate, endDate, (result: any) => {
            setData(result.data);
        });
    }, [startDate, endDate]);

    console.log(data);


    return (
        <DefaultLayout>
            <Card>
                <h1 className='font-medium text-lg' >Laporan Laba Rugi</h1>
                <p className='text-small text-gray' >Untuk melihat laporan laba bersih atau laba kotor</p>
                <div className="space-y-3 lg:space-y-0 lg:flex  justify-end gap-2 mt-3 lg:mt-0">
                    <ButtonSecondary className=' px-4 rounded-md w-auto'>Download dalam bentuk Excel</ButtonSecondary>
                    <DateRangePicker
                        visibleMonths={2}
                        size='sm' onChange={setDate} value={date} aria-label='datepicker' className="max-w-[284px] bg-bone border-2 border-primary rounded-lg"
                    />
                </div>

            </Card>
            <div className="pendapatan mt-4">
                <h1 className='mb-2 font-medium' >Pendapatan</h1>
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>TIPE AKUN</TableColumn>
                        <TableColumn>AKUN</TableColumn>
                        <TableColumn>REF</TableColumn>
                        <TableColumn>JUMLAH</TableColumn>
                    </TableHeader>
                    <TableBody>

                        {data?.pendapatan?.map((item: any, index: any) => (
                            <TableRow key={index}>
                                <TableCell>{changeTypeAccount(item.account_type)}</TableCell>
                                <TableCell> {item.name}</TableCell>
                                <TableCell>{item.account_code}</TableCell>
                                <TableCell>500.000.000</TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </div>
            <div className="beban mt-4">
                <h1 className='mb-2 font-medium' >Beban</h1>
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>TIPE AKUN</TableColumn>
                        <TableColumn>AKUN</TableColumn>
                        <TableColumn>REF</TableColumn>
                        <TableColumn>JUMLAH</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {data?.beban?.map((item: any, index: any) => (
                            <TableRow key={index}>
                                <TableCell>{changeTypeAccount(item.account_type)}</TableCell>
                                <TableCell> {item.name}</TableCell>
                                <TableCell>{item.account_code}</TableCell>
                                <TableCell>500.000.000</TableCell>
                            </TableRow>
                            //  <TableRow key="2">
                            //      <TableCell>Kas</TableCell>
                            //      <TableCell>101</TableCell>
                            //      <TableCell>Aset</TableCell>
                            //      <TableCell>pendapatan pajak masyarakat</TableCell>
                            //      <TableCell >1.500.000.000</TableCell>
                            //  </TableRow>
                            //  <TableRow key="3">
                            //      <TableCell className='font-bold' >TOTAL PENDAPATAN</TableCell>
                            //      <TableCell>{''}</TableCell>
                            //      <TableCell>{''}</TableCell>
                            //      <TableCell>{''}</TableCell>
                            //      <TableCell className='font-bold'  >1.550.000.000</TableCell>
                            //  </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="flex text-lg font-medium mt-4">
                {/* jika di kredit maka akan menggunakan tanda kurung */}
                Laba Bersih (Net Profit) = Rp. 1.500.000.000
            </div>
        </DefaultLayout>
    )
}

export default LabaRugi