import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import jscookie from 'js-cookie';
import { useUserContext} from '../ContextApi/UserContext'
export default function Logout() {
  
    const {setIslogin}= useUserContext()
    const usenavigate = useNavigate()
    useEffect(()=>{
        jscookie.remove('token')
        setIslogin = (false)
        usenavigate("/")
    },[])

}
