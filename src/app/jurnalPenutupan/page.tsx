'use client';
import { getBukuBesar } from '@/api/transaction';
import ButtonPrimary from '@/components/elements/buttonPrimary';
import ButtonSecondary from '@/components/elements/buttonSecondary';
import Card from '@/components/elements/card/Card';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import { dateFirst, formatDate, formatDateStr } from '@/utils/helper';
import { parseDate } from '@internationalized/date';
import { DateRangePicker, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import React, { useEffect } from 'react';

const JurnalPenutupan = () => {
    const dateNow = new Date();
    const [data, setData] = React.useState([]);
    const [date, setDate] = React.useState({
        start: parseDate(formatDate(dateFirst)),
        end: parseDate(formatDate(dateNow)),
    });
    const startDate = formatDateStr(date.start);
    const endDate = formatDateStr(date.end);

    useEffect(() => {
        getBukuBesar(startDate, endDate, (result: any) => {
            setData(result.data || []);
        });
    }, [startDate, endDate]);

    const processData = () => {
        const accountSummary: { [key: string]: { date: string; name: string; totalDebit: number; totalCredit: number }[] } = {};

        data.forEach((account: any) => {
            if (!account.journal_details || account.journal_details.length === 0) return; // Pastikan journal_details tidak kosong

            let totalDebit = 0;
            let totalCredit = 0;

            // Menghitung total debit dan total kredit dari setiap detail jurnal
            account.journal_details.forEach((detail: any) => {
                if (detail.debit == null) detail.debit = 0; // Pastikan debit ada dan valid
                if (detail.credit == null) detail.credit = 0; // Pastikan credit ada dan valid
                totalDebit += detail.debit;
                totalCredit += detail.credit;
            });

            const balance = totalDebit - totalCredit;
            const formattedDate = account.journal_details[0]?.journal_date ? formatDate(account.journal_details[0].journal_date) : 'Tanggal Tidak Tersedia';

            if (!accountSummary[formattedDate]) {
                accountSummary[formattedDate] = [];
            }

            const existingAccount = accountSummary[formattedDate].find(item => item.name === account.name);

            if (existingAccount) {
                if (balance >= 0) {
                    existingAccount.totalDebit += balance;
                } else {
                    existingAccount.totalCredit += Math.abs(balance);
                }
            } else {
                accountSummary[formattedDate].push({
                    date: formattedDate,
                    name: account.name,
                    totalDebit: balance >= 0 ? balance : 0,
                    totalCredit: balance < 0 ? Math.abs(balance) : 0,
                });
            }
        });

        return Object.values(accountSummary).flat();
    };

    const renderRows = () => {
        const processedData = processData();

        return processedData.map((account, index) => (
            <TableRow key={index}>
                <TableCell>{account.date}</TableCell>
                <TableCell>{account.name}</TableCell>
                <TableCell>{account.totalDebit !== 0 ? account.totalDebit.toLocaleString() : ''}</TableCell>
                <TableCell>{account.totalCredit !== 0 ? `-${account.totalCredit.toLocaleString()}` : ''}</TableCell>
            </TableRow>
        ));
    };



    console.log(data);


    return (
        <DefaultLayout>
            <Card>
                <h1 className='font-medium text-lg'>Jurnal Penutupan</h1>
                <p className='text-small text-gray'>
                    Halaman ini untuk menutup akun-akun transaksi pada akhir periode, di bawah ini merupakan hasil kalkulasi saldo dari tiap akun
                </p>
                <div className="space-y-3 lg:space-y-0 lg:flex justify-end gap-2 mt-3 lg:mt-0">
                    <DateRangePicker
                        visibleMonths={2}
                        size='sm'
                        onChange={setDate}
                        value={date}
                        aria-label='datepicker'
                        className="max-w-[284px] bg-bone border-2 border-primary rounded-lg"
                    />
                </div>
            </Card>
            <div className='mt-7'>
                <Table className='border-hidden' aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>TANGGAL</TableColumn>
                        <TableColumn>NAMA AKUN</TableColumn>
                        <TableColumn>DEBIT</TableColumn>
                        <TableColumn>KREDIT</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {renderRows()}
                    </TableBody>
                </Table>
                <div className="flex justify-end mt-4">
                    <ButtonPrimary className='py-2 px-4 rounded-md'>
                        Buat jurnal penutupan
                    </ButtonPrimary>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default JurnalPenutupan;
