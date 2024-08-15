import { axiosInterceptor } from "./axiosInterceptor"

export const createProduct = async (form: any, callback: any) => {
    axiosInterceptor.post('/product', form)
        .then((result) => {
            callback(true, result.data);
        }).catch((err) => {
            callback(false, err);
        });
}


export const getDetailProduct = async (id: any, callback: any) => {
    axiosInterceptor.get(`/product/${id}`)
        .then((result) => {
            callback(result.data);
        }).catch((err) => {
            callback(err);
        });
}

export const updateProduct = async (id: any, form: any, callback: any) => {
    axiosInterceptor.put(`/product/${id}`, form)
        .then((result) => {
            callback(true, result.data);
        }).catch((err) => {
            callback(false, err);
        });
}