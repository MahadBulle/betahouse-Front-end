import { getAll, AddData, Update, DeleteData } from './apiCRUD'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify';


export const GetQuery = (endpoint, queryKey) => {
    return useQuery({
        queryKey: [queryKey],
        queryFn: async () => await getAll(endpoint, queryKey),
        onError: () => {
            toast.error("sorry xogta lama keenin")
        },
        onSuccess: () => {
            toast.success("Haa xogta waa lakeeney")
        }
    })
}

export const PostQuery = (endpoint, queryKey) => {
    const queryclient = useQueryClient();
    return useMutation({
        mutationFn: async (data) => await AddData(endpoint, data),
        onSuccess: () => {
            queryclient.invalidateQueries({ queryKey: [queryKey] })
        },
        onError: (err) => {
            toast.error("sorry datada lama xareynin")
            console.log("error", err)
        }

    })
}

export const UpdateQuery = (endpoint, queryKey) => {
    const queryclient = useQueryClient();
    return useMutation({
        mutationFn: (data) => Update(endpoint, data),
        onSuccess: () => {
            queryclient.invalidateQueries({ queryKey: [queryKey] })
        },
        onError: () => {
            toast.error("sorry datada lama xareynin")
        }

    })
}

export const DeleteQuery = (endpoint, queryKey) => {
    const queryclient = useQueryClient();
    return useMutation({
        mutationFn: (id) => DeleteData(endpoint, id),
        onSuccess: () => {
            queryclient.invalidateQueries({ queryKey: [queryKey] })
            toast.success("Deleted successfully")

        },
        onError: () => {
            toast.error("sorry datada deletegareynin")
        }

    })
}


