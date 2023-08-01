
import {api} from '../apiConfig/Config'

// export const getAll = (endpoint) => {
//     return apiConfig.get(endpoint).then((res) => res.data);
// }

// export const getById = (endpoint,id) => {
//     return apiConfig.get(`${endpoint} / ${id}`).then((res) => res.data);
// }

// export const AddData= (endpoint,data)=>{
//     return apiConfig.post(endpoint,data).then((res)=>res.data);
//     }

//     export const Update= (endpoint,id,data)=>{
//         return apiConfig.post(endpoint,data).then((res)=>res.data);
//         }


export const getAll = (endpoint,data) => {
    return api.get(endpoint,data)
}
export const AddData = (endpoint,data) => {
    return api.post(endpoint,data)
}
export const Update = (endpoint,data) => {
    return api.put(endpoint,data)
}
export const DeleteData = (endpoint) => {
    return api.delete(endpoint)
}