import { api } from "../../../apiConfig/Config"

/*
all operation About api 

post
update
delete
get
get by id

*/

export const getAllAbout = async()=>{

    return await api.get("/About")
}

export const getAllAboutById = async (id)=>{
    return await api.get(`/About/${id}`)
}

export const  AddAbout = async (data)=>{
    return await api.post("/About",data)
}
// export const  DeleteAbout = async (id)=>{
//     return await api.delete(`/About/${id}`)
// }
export const  UpdateAbout = async (id,data)=>{
    return await api.put(`/About/${id}`,data)
}
