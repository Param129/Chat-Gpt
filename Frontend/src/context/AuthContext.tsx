import { ReactNode, createContext, useContext, useEffect, useState } from "react";

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


    useEffect(()=>{
        //fetch if user cokies are valid then skip login
    },[]);


    const login = async(email:string,password:string)=>{

    }

    const signup=async(name:string,email:string,password:string)=>{

    }

    const logout=async()=>{

    }


    // now provider will set value to children
    const value = {
        user,isLoggedIn,login,logout,signup
    }

    return <Authcontext.Provider value={value}>{children}</Authcontext.Provider>
}


export const useAuth = () => useContext(Authcontext)