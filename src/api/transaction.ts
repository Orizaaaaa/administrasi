import { axiosInterceptor } from "./axiosInterceptor"

export const createTransaction = async (form: any, callback: any) => {
    await axiosInterceptor.post('/transaction', form)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            callback(err);
        });

}