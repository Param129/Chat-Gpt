import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import {loginUser,signupUser,checkAuthStatus,logoutUser} from "../helper/api-communicator"
import { ascetic } from "react-syntax-highlighter/dist/esm/styles/hljs";

// definetype the variable that we want for authentication
type User = {
    name:string,
    email:string
}

type UserAuth  = {
    isLoggedIn:boolean,
    user: User | null

    // now define void functions that return promise
    login:(email:string,password:string)=>Promise<void>;
    signup:(name:string,email:string,password:string)=>Promise<void>;
    logout:()=>Promise<void>;
}


const Authcontext = createContext<UserAuth | null>(null);


export const AuthProvider = ({children}:{children: ReactNode})=>{

    const [user,setUser]=useState <User | null>(null);
    const [isLoggedIn,setisLoggedIn] = useState(false);


    useEffect(() => {
        // fetch if the user's cookies are valid then skip login
        async function checkStatus() {
          const data = await checkAuthStatus();
          if (data) {
            setUser({ email: data.email, name: data.name });
            setisLoggedIn(true);
          }
        }
        checkStatus();
      }, []);


    const login = async(email:string,password:string)=>{
        const data = await loginUser(email, password);
        if (data) {
      setUser({ email: data.email, name: data.name });
      setisLoggedIn(true);
    }
    }

    const signup=async(name:string,email:string,password:string)=>{
        const data = await signupUser(name, email, password);
    if (data) {
      setUser({ email: data.email, name: data.name });
      setisLoggedIn(true);
    }
    }

    const logout=async()=>{
        await logoutUser();
        setisLoggedIn(false);
        setUser(null);
        window.location.reload();
    }


    // now provider will set value to children
    const value = {
        user,isLoggedIn,login,logout,signup
    }

    return <Authcontext.Provider value={value}>{children}</Authcontext.Provider>
}


export const useAuth = () => useContext(Authcontext)