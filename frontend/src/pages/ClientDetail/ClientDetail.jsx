import React, { useEffect, useState } from 'react'
import { v4 as uuidv4} from "uuid";
import axios from 'axios';
import Layout from '../../components/Layout';
import { Footer } from '../../components/Footer';

const ClientDetail = () => {
    const [clientDetail, setClientDetail] = useState([]);
    const [clientWithTempPass, setClientWithTempPass] = useState([]);
    const [emailStatus, setEmailStatus] = useState(true);
    const [emailMsg, setEmailMsg] = useState("");
    const [commonEmails, setCommonEmails] = useState([]);
    const getAllClientDetails = async() => {
        try{
            const response = await axios.get(`http://localhost:5002/client-Detail`);
            const result = response.data;
            if(!result.error){
                setClientDetail(result);
            }else{
                console.log(result);
            }
        }catch(err){
            console.log(err);
        }
    }

    const getAllClient = async() => {
        try{
            const response = await axios.get(`http://localhost:5002/clientWithUrl-Detail`);
            const result = response.data;
            if(!result.error){
                setClientWithTempPass(result);
            }else{
                console.log(result);
            }
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        getAllClientDetails();
        getAllClient();
    },[]);

    const createClient = async (userData) => {
        try {
            const response = await axios.post('http://localhost:5002/tempPass-Client', userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            const result = response.data;
    
            if (!result.error) {
                console.log(result);
    
                // Access emailSent status
                if (result.emailSent) {
                    console.log('Email has been sent successfully.');
                    setEmailStatus(false);
                    setEmailMsg("Email has been sent successfully.")
                } else {
                    console.log('Email sending failed.');
                }
            } else {
                console.log(result);
            }
        } catch (error) {
            console.log(error);
        }
    };
    

    const handleCheckForEmailStatus =() => {
        const newCommonEmails = clientDetail
        .filter(obj1 => clientWithTempPass.some(obj2 => obj2.email === obj1.email))
        .map(obj => obj.email);
        setCommonEmails(newCommonEmails);
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
                <Layout candidateHome={true}/>
                <div className='container-fluid'>
                <h1>All Client Details</h1>
                <hr className="my-4" />
                
                {clientDetail.length === 0 ? <h3>No Client Created Yet</h3> 
                :<div>
                    <p>Total Clients: <strong>{clientDetail.length}</strong></p>
                    <button type="button" className="btn btn-warning my-3" onClick={handleCheckForEmailStatus}>Checking the email status</button>
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
                                <th scope="col">Email Status</th>
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
                                            <td>{commonEmails.includes(client.email) ? "Email already sent" : emailStatus ? "Email still not sent" : emailMsg}</td>
                                        </tr>
                                })}
                        </tbody>
                    </table>
                </div>     
                }  
                </div>
                <Footer/>
            </div>
  )
}

export default ClientDetail;