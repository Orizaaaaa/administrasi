import { url } from "./auth"
import { axiosInterceptor } from "./axiosInterceptor"

export const listTransaction = (callback: any) => {
    axiosInterceptor(`${url}/transaction/list`)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            console.log(err);

        });
}