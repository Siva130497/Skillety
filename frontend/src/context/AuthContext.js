import { createContext} from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    
    //register user
    const registerUser = async(userData) => {
        try{
            const res = await fetch(`http://localhost:5002/register-Client`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({...userData})
            })
            const result = await res.json();
            if (!result.error) {
                console.log(result);
            }else{
                console.log(result);
            }
        }catch (err){
            console.log(err);
        }
    }

    


    return<AuthContext.Provider value={{registerUser}}>
            {children}
        </AuthContext.Provider>
}

export default AuthContext;