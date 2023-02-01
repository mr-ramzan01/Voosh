import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextprovider = ({children}) => {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState({});


    const isLoggedIn = () => {
        setIsLoading(true);
        fetch('/users/loggedInUser')
        .then((res) => res.json()) 
        .then((res) => {
            if(res.success) {
                setIsAuth(true);
                setUserData(res.data);
            }
            else {
                setIsAuth(false);
            }
        })
        .catch((err) => {
            console.log(err, 'err');
            setIsAuth(false);
        })
        .finally(() => {
            setIsLoading(false);
        })
    }
    useEffect(() => {
        isLoggedIn();
    },[]);


    return <AuthContext.Provider value={{isAuth, isLoading, userData, setIsAuth}}>{children}</AuthContext.Provider>
}