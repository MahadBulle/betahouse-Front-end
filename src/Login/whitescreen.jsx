import { useEffect } from 'react'
import React from 'react'
import { useNavigate,Navigate } from 'react-router-dom'
import jscookie from 'js-cookie'

export default function Whitescreen() {
  const usenav = useNavigate()
  useEffect(()=>{
    if(!jscookie.get('token')){
        usenav('/')
    }
  },[])
  return <Navigate to='/'/>
}
