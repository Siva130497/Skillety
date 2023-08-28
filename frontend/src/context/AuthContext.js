import { createContext} from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const navigate = useNavigate();
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
                navigate("/client-dashboard");
            }else{
                console.log(result);
            }
        }catch (err){
            console.log(err);
        }
    }

    //client login request
    const loginClient = async(userData) => {

            try{
                const res = await fetch(`http://localhost:5002/login-Client`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({...userData})
                })
                const result = await res.json();
                if(!result.error){
                    console.log(result);
                }else{
                    console.log(result); 
                }
            }catch (err){
                console.log(err);
            }
    }

    //candidate register
    const candidateReg = async(userData) => {

        try{
            const res = await fetch(`http://localhost:5002/candidate-reg`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData)
            })
            const result = await res.json();
            if(!result.error){
                console.log(result);
            }else{
                console.log(result); 
            }
        }catch (err){
            console.log(err);
        }
}


    return<AuthContext.Provider value={{registerUser, loginClient, candidateReg}}>
            {children}
        </AuthContext.Provider>
}

export default AuthContext;