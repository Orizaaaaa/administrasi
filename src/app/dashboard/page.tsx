"use client"

import Card from "@/components/elements/card/Card";
import { manusiaLaptop, money, outCome, yellowDolar } from "../image";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import Image from "next/image";
import CardBox from "@/components/fragemnts/cardBox/CardBox";;
import ChartLine from "@/components/fragemnts/chartLine/ChartLine";
import useSWR from "swr";
import { fetcher } from "@/api/fetcher";
import { url } from "@/api/auth";

const Dashboard: React.FC = () => {
    const { data } = useSWR(`${url}/balance/finance-data`, fetcher, {
        keepPreviousData: true,
    });

    const getImage = (name: string) => {
        switch (name.toLowerCase()) {
            case "saldo saat ini":
                return money;
            case "semua pemasukan":
                return yellowDolar;
            case "semua pengeluaran":
                return outCome;
            default:
                return manusiaLaptop; // Gambar default jika name tidak sesuai
        }
    };

    console.log(data);


    return (
        <DefaultLayout>
            <Card>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="flex-col space-y-3 my-auto">
                        <h1 className=" text-lg font-medium md:text-2xl md:font-bold font-inter" >Selamat Datang Kembali, Admin!</h1>
                        <p className="text-slate-400 text-sm md:text-base" >Senang melihat Anda kembali. Mari kita mulai hari ini dengan mengelola situs ini.</p>
                    </div>
                    <div className="flex justify-center">
                        <Image src={manusiaLaptop} alt="dashboard" />
                    </div>
                </div>
            </Card>

            <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {data?.dataInformation?.map((item: any, index: number) => (
                    <CardBox
                        key={index}
                        image={getImage(item.name)} // Sesuaikan gambar berdasarkan name
                        value={item.Total.toLocaleString()} // Format angka untuk lebih rapi
                        title={item.name}
                    />
                ))}
            </div>
            <ChartLine />
        </DefaultLayout>

    );
};

export default Dashboard;
