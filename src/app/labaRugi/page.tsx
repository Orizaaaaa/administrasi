'use client'
import { downloadLabaRugi, GetLabaRugi } from '@/api/transaction'
import ButtonSecondary from '@/components/elements/buttonSecondary'
import Card from '@/components/elements/card/Card'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { changeTypeAccount, dateFirst, formatDate, formatDateStr, formatRupiah } from '@/utils/helper'
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

    const handleDownload = () => {
        downloadLabaRugi(startDate, endDate, (result: any) => {
            if (result instanceof Blob) {
                // Jika hasil adalah Blob, kita lanjutkan dengan download
                const url = window.URL.createObjectURL(result);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `Laba-rugi-${startDate}-${endDate}.xlsx`);
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
            <Card>
                <h1 className='font-medium text-lg' >Laporan Laba Rugi</h1>
                <p className='text-small text-gray' >Untuk melihat laporan laba bersih atau laba kotor</p>
                <div className="space-y-3 lg:space-y-0 lg:flex  justify-end gap-2 mt-3 lg:mt-0">
                    <ButtonSecondary onClick={handleDownload} className=' px-4 rounded-md w-auto'>Download dalam bentuk Excel</ButtonSecondary>
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
                        <TableColumn>NAMA AKUN</TableColumn>
                        <TableColumn>TIPE AKUN</TableColumn>
                        <TableColumn>REF</TableColumn>
                        <TableColumn>DEBIT</TableColumn>
                        <TableColumn>KREDIT</TableColumn>
                        <TableColumn>JUMLAH</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={`Tidak ada transaksi di ${date.start} - ${date.end}`}>

                        {data?.pendapatan?.map((item: any, index: any) => (
                            <TableRow key={index}>
                                <TableCell> {item.name}</TableCell>
                                <TableCell>{changeTypeAccount(item.account_type)}</TableCell>
                                <TableCell>{item.account_code}</TableCell>
                                <TableCell>{item.totalCredit.toLocaleString()}</TableCell>
                                <TableCell>{item.totalDebit.toLocaleString()}</TableCell>
                                <TableCell className='font-bold' >{item?.total.toLocaleString()} </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </div>
            <div className="beban mt-4">
                <h1 className='mb-2 font-medium' >Beban</h1>
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>NAMA AKUN</TableColumn>
                        <TableColumn>TIPE AKUN</TableColumn>
                        <TableColumn>REF</TableColumn>
                        <TableColumn>DEBIT</TableColumn>
                        <TableColumn>KREDIT</TableColumn>
                        <TableColumn>JUMLAH</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {data?.beban?.map((item: any, index: any) => (
                            <TableRow key={index}>
                                <TableCell> {item.name}</TableCell>
                                <TableCell>{changeTypeAccount(item.account_type)}</TableCell>
                                <TableCell>{item.account_code}</TableCell>
                                <TableCell>{item.totalCredit.toLocaleString()}</TableCell>
                                <TableCell>{item.totalDebit.toLocaleString('id-ID')}</TableCell>
                                <TableCell className='font-bold' >{item?.total.toLocaleString()}</TableCell>
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
                Total Pendapatan = <span className={` ms-1 ${data?.totalBeban < 0 ? 'text-red' : 'text-primary'}`} > {data?.totalBeban.toLocaleString()}</span>
            </div>
            <div className="flex text-lg font-medium mt-4">
                {/* jika di kredit maka akan menggunakan tanda kurung */}
                Total Beban = <span className={` ms-1 ${data?.totalPendapatan < 0 ? 'text-red' : 'text-primary'}`} > {data?.totalPendapatan.toLocaleString()}</span>
            </div>
            <div className="flex text-lg font-medium mt-4">
                {/* jika di kredit maka akan menggunakan tanda kurung */}
                Laba Bersih (Net Profit) = <span className={` ms-1 ${data?.labaBersih < 0 ? 'text-red' : 'text-primary'}`} > {data?.labaBersih.toLocaleString()}</span>
            </div>
        </DefaultLayout>
    )
}

export default LabaRugi