import { createContext, useContext, useEffect, useState } from "react";
import jscookie from "js-cookie";
const UserContextApi = createContext()
// const jwtdecode = from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export const UserContextProvide = ({ children }) => {

    const usenavigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isLogin, setIsLogin] = useState(false)

    const LogOut = () => {

        console.log('Log Out');
        jscookie.remove('token')
        setIsLogin(false);
        usenavigate("/")
    }

    useEffect(() => {
        const token = jscookie.get('token')

        if (!token) {
            usenavigate("/")
        } else {
            // console.log(jwtDecode(token))
            const jwtdecoded = jwtDecode(token)
            setEmail(jwtdecoded.email);
            setIsLogin(true);
        }
    }, [])

    return (
        <UserContextApi.Provider value={{ email, LogOut, isLogin, setIsLogin }}>
            {children}
        </UserContextApi.Provider>
    )




}

//use contex function to use the context api

export const useUserContext = () => {
    return useContext(UserContextApi)
}
