import React, { useEffect, useState } from 'react'
import { v4 as uuidv4} from "uuid";


const ClientDetail = () => {
    const [clientDetail, setClientDetail] = useState([]);
    const getAllClientDetails = async() => {
        try{
            const res = await fetch(`http://localhost:5002/client-Detail`,{
                method:"GET"
            });
            const result = await res.json();
            if(!result.error){
                setClientDetail(result);
            }else{
                console.log(result);
            }
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        getAllClientDetails();
    },[]);

    const createClient = async(userData) => {
        try{
            const res = await fetch(`http://localhost:5002/tempPass-Client`, {
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

    const handleGeneratePassword = (id) => {
        
        const baseUrl = "http://localhost:3000/";
        const token = uuidv4();
        const tempUrl = baseUrl+token;

        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
        let password = '';
          
        for (let i = 0; i < 12; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        console.log(tempUrl);
        console.log(password);
        for (const client of clientDetail) {
            if(client._id === id){
                client.tempPassword = password;
                client._id = undefined;
                client.url = tempUrl;
                client.id = token;
                console.log(client);
                createClient(client);
            }
          }
    };

  return (
            <div>
                <h1>All Client Details</h1>
                <hr className="my-4" />
                
                {clientDetail.length === 0 ? <h3>No Client Created Yet</h3> 
                :<>
                    <p>Total Clients: <strong>{clientDetail.length}</strong></p>
                    <table className="table table-hover">
                        <thead>
                            <tr className='table-dark'>
                                <th scope="col">Full Name</th>
                                <th scope="col">Mobile Number</th>
                                <th scope="col">Email ID</th>
                                <th scope="col">Company Name</th>
                                <th scope="col">Industry</th>
                                <th scope="col">Headcount</th>
                                <th scope="col">From where did you learn about Skillety?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientDetail.map((client) => {
                                return <tr key={client._id} onClick={() => handleGeneratePassword(client._id)}>
                                            <th scope="row">{client.name}</th>
                                            <td>{client.phone}</td>
                                            <td>{client.email}</td>
                                            <td>{client.companyName}</td>
                                            <td>{client.industry}</td>
                                            <td>{client.count}</td>
                                            <td>{client.text}</td>
                                        </tr>
                                })}
                        </tbody>
                    </table>
                </>     
                }  
            </div>
  )
}

export default ClientDetail;