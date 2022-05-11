import React, { useState } from "react";

const UserContext = React.createContext();

function UserProvider({children}){
        // the value prop of the provider will be our context data
        const [user, setUser] = useState({});
        const [isLoggedIn, setIsLoggedIn] = useState(false)
        // this value will be available to child components of this provider
        return (<UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
                        {children}
                </UserContext.Provider>)
}

export {UserContext, UserProvider};