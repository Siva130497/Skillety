import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ClientNewPassword = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [newClient, setNewClient] = useState([]);
    const [credentials, setcredentials] = useState({
        tempPassword:"",
        newPassword:"",
        confirmPassword:"",
    })
    const [passwordError, setPasswordError] = useState('');
    const getAllClient = async() => {
        try{
            const res = await fetch(`http://localhost:5002/clientWithUrl-Detail`,{
                method:"GET"
            });
            const result = await res.json();
            if(!result.error){
                for (const client of result) {
                    if(client.id === id){
                        setNewClient(client);
                    }
                  }
            }else{
                console.log(result);
            }
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        getAllClient();
    },[]);

    const finalClientDetail = async(userData) => {
        try{
            const res = await fetch(`http://localhost:5002/finalRegister-Client`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData)
            })
            const result = await res.json();
            if (!result.error) {
                console.log(result);
                navigate("/client-login");
            }else{
                console.log(result);
            }
        }catch (err){
            console.log(err);
        }
    }

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        if(name === "newPassword" && value.length <8){
            setPasswordError('Password must be at least 8 characters long');
        }
        setcredentials({...credentials, [name]: value});   
    }

    

    const handleSubmit = (event) => {
        event.preventDefault();
        if (credentials.newPassword.length <8){
            return
        }
        if((newClient.tempPassword === credentials.tempPassword) && (credentials.newPassword === credentials.confirmPassword)){
            const { tempPassword, url, _id, ...updatedClient } = newClient;
            updatedClient.password = credentials.newPassword;
            console.log(updatedClient);
            finalClientDetail(updatedClient);
        }else return
    }
  return (
            <>
                <h3>Welcome {newClient.name} from {newClient.companyName}</h3>
                <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label 
                    htmlFor="tempPasswordInput" 
                    className="form-label mt-4">
                        Temporary Password
                    </label>
                    <input 
                    type="password" 
                    className="form-control" 
                    id="tempPasswordInput"  
                    name="tempPassword" 
                    value={credentials.tempPassword}
                    onChange={handleInputChange}
                    placeholder="Enter your given temporary password"
                    required/>
                </div>
                <div className="form-group">
                    <label 
                    htmlFor="newPasswordInput" 
                    className="form-label mt-4">
                        New Password
                    </label>
                    <input 
                    type="password" 
                    className="form-control" 
                    id="newPasswordInput"  
                    name="newPassword" 
                    value={credentials.newPassword}
                    onChange={handleInputChange}
                    placeholder="Enter your new password"
                    required/>
                    {passwordError && <p>{passwordError}</p>}
                </div>
                <div className="form-group">
                    <label 
                    htmlFor="confirmPasswordInput" 
                    className="form-label mt-4">
                        Confirm Password
                    </label>
                    <input 
                    type="text" 
                    className="form-control" 
                    id="confirmPasswordInput"  
                    name="confirmPassword" 
                    value={credentials.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Renter your new password"
                    required/>
                </div>
                <input type='submit' value="Submit" className='btn btn-primary my-3' />
                </form>
            </>
        )
}

export default ClientNewPassword;