'use client'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import ButtonSecondary from '@/components/elements/buttonSecondary'
import Card from '@/components/elements/card/Card'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { dateFirst, formatDate, formatDateStr } from '@/utils/helper'
import { parseDate } from '@internationalized/date'
import { DatePicker, DateRangePicker, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import React from 'react'



const JurnalPenutupan = () => {

    const dateNow = new Date();
    const [data, setData] = React.useState([])
    let [date, setDate] = React.useState({
        start: parseDate((formatDate(dateFirst))),
        end: parseDate((formatDate(dateNow))),
    });
    const startDate = formatDateStr(date.start);
    const endDate = formatDateStr(date.end);

    return (
        <DefaultLayout>
            <Card>
                <h1 className='font-medium text-lg'>Jurnal Penutupan</h1>
                <p className='text-small text-gray' > untuk menutup akun-akun nominal (seperti pendapatan dan beban) pada akhir periode  </p>
                <div className="space-y-3 lg:space-y-0 lg:flex  justify-end gap-2 mt-3 lg:mt-0">
                    <ButtonSecondary className=' px-4 rounded-md w-auto'>Download dalam bentuk Excel</ButtonSecondary>
                    <DateRangePicker
                        visibleMonths={2}
                        size='sm' onChange={setDate} value={date} aria-label='datepicker' className="max-w-[284px] bg-bone border-2 border-primary rounded-lg"
                    />
                </div>

            </Card>
            <div className='mt-7' >
                <div className="space-y-3 lg:space-y-0 lg:flex gap-2 items-center mb-2 justify-between">
                </div>
                <Table className=' border-hidden' aria-label="Example static collection table">
                    <TableHeader  >
                        <TableColumn>TANGGAL</TableColumn>
                        <TableColumn>KETERANGAN AKUN </TableColumn>
                        <TableColumn>DEBIT</TableColumn>
                        <TableColumn>KREDIT</TableColumn>

                    </TableHeader>
                    <TableBody>
                        <TableRow key="1">
                            <TableCell>01/01/2024</TableCell>
                            <TableCell>Kas</TableCell>
                            <TableCell>2.500.000.000</TableCell>
                            <TableCell>{''}</TableCell>

                        </TableRow>
                        <TableRow key="2">
                            <TableCell>01/01/2024</TableCell>
                            <TableCell>Laba Rugi</TableCell>
                            <TableCell>{''}</TableCell>
                            <TableCell>2.500.000.000</TableCell>
                        </TableRow>

                        <TableRow key="3">
                            <TableCell>01/01/2024</TableCell>
                            <TableCell>Pendapatan pajak</TableCell>
                            <TableCell>1.500.000.000</TableCell>
                            <TableCell>{''}</TableCell>
                        </TableRow>

                        <TableRow key="4">
                            <TableCell>01/01/2024</TableCell>
                            <TableCell>Laba Rugi</TableCell>
                            <TableCell>{''}</TableCell>
                            <TableCell>1.500.000.000</TableCell>
                        </TableRow>

                        <TableRow key="5">
                            <TableCell>01/01/2024</TableCell>
                            <TableCell>Modal</TableCell>
                            <TableCell>1.500.000.000</TableCell>
                            <TableCell>{''}</TableCell>

                        </TableRow>

                        <TableRow key="6">
                            <TableCell>01/01/2024</TableCell>
                            <TableCell>Laba Rugi</TableCell>
                            <TableCell>{''}</TableCell>
                            <TableCell>1.500.000.000</TableCell>
                        </TableRow>


                    </TableBody>
                </Table>
                <div className="flex justify-end mt-4">
                    <ButtonPrimary className='py-2 px-4 rounded-md' >Buat jurnal penutupan</ButtonPrimary>
                </div>
            </div>


        </DefaultLayout>

    )
}

export default JurnalPenutupan