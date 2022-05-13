function useBookCrud(method = "GET", route, body, readsId, state, setState){

    //This function can CREATE, DELETE, ADD and UPDATE a book
    //To do this on the Reads table, we need to get the reads ID

    function returnConfigObj () {

    if (method === "GET" || method === "DELETE"){
         const configObj = {
            method : method,
            headers :{
                "Content-Type" : "application/json"
            }
        }
        return configObj;
        
    }else{
        const configObj = {
            method : method,
            headers : {
                "Content-Type" : "application/json",
                "Accepts" : "application/json"
            },
            body : JSON.stringify(body)
        }
        return configObj;  
    }
}
    
    const configuration = returnConfigObj()

    if (method === "DELETE"){
        fetch(`/${route}`, configuration)
        .then(res => res.json())
        .then(data => {
            //we need the state and setState for the user Library
            setState(prev => prev.filter(stateObject => stateObject.reads[0].id !== readsId))
        });
    }
}

    

export default useBookCrud;
