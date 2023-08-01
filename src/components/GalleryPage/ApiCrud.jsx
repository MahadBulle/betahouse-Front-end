import { api } from "../../../apiConfig/Config"

/*
all operation gallery api 

post
update
delete
get
get by id

*/

export const getAllGallery = async()=>{

    return await api.get("/gallery")
}

export const getAllGalleryById = async (id)=>{
    return await api.get(`/gallery/${id}`)
}

export const  AddGallery = async (data)=>{
    return await api.post("/gallery",data)
}

export const  DeleteGallery = async (id)=>{
    return await api.delete(`/gallery/${id}`)
}

export const  UpdateGallery = async (id,data)=>{
    return await api.put(`/gallery/${id}`,data)
}
