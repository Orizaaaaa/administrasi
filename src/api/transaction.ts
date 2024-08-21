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