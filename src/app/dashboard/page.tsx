"use client"

import Card from "@/components/elements/card/Card";
import { manusiaLaptop } from "../image";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import Image from "next/image";
import CardBox from "@/components/fragemnts/cardBox/CardBox";;
import ChartLine from "@/components/fragemnts/chartLine/ChartLine";

const Dashboard: React.FC = () => {

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
                <CardBox />
                <CardBox />
                <CardBox />
            </div>
            <ChartLine />
        </DefaultLayout>

    );
};

export default Dashboard;
