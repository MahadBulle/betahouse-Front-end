import { useState } from "react"


export const useDeleteHook = ()=>{

const [open,setOpen]=useState(false)
const [message,setMessage]=useState('')

const Toggle = ()=>{
    setOpen(!open)
}

return {open,Toggle,message,setMessage}

}