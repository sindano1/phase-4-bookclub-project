import { useContext, useEffect } from "react";
import { UserContext } from "../Components/UserContext/UserContext";


function useRetrieveUserBooks(){
    const { userLibrary, setUserLibrary} = useContext(UserContext);

    useEffect(()=>{
        fetch("/user-library")
        .then(res => res.json())
        .then(bookList => setUserLibrary(bookList))
        .catch(error => console.log(error.message));
    }, [setUserLibrary])


}

export default useRetrieveUserBooks;
