import { url } from "inspector";
import { axiosInterceptor } from "./axiosInterceptor"

export const createTransaction = async (form: any, callback: any) => {
    await axiosInterceptor.post('/journal', form)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            callback(err);
            console.log(err);

        });

}

export const getJurnalUmum = (startDate: string, endDate: string, callback: any) => {
    axiosInterceptor.get('/journal/list', { params: { startDate: startDate, endDate: endDate } })
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            callback(err);
        });

}

export const updateJurnalUmum = async (id: string, form: any, callback: any) => {
    await axiosInterceptor.put(`journal/${id}`, form)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            callback(err);
        });
}