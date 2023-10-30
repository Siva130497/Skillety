import React, { useState, useEffect } from 'react'
import axios from 'axios';


const AllClients = ({staffToken}) => {
    const [clientDetail, setClientDetail] = useState([]);
    const [clientWithTempPass, setClientWithTempPass] = useState([]);
    const [emailStatus, setEmailStatus] = useState(true);
    const [emailMsg, setEmailMsg] = useState("");
    const [commonEmails, setCommonEmails] = useState([]);

    const getAllClientDetails = async() => {
        try{
            const response = await axios.get(`http://localhost:5002/client-Detail`, {
                headers: {
                    Authorization: `Bearer ${staffToken}`,
                    Accept: 'application/json'
                }
              });
            const result = response.data;
            if(!result.error){
                console.log(result);
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
            const response = await axios.get(`http://localhost:5002/clientWithUrl-Detail`, {
                headers: {
                    Authorization: `Bearer ${staffToken}`,
                    Accept: 'application/json'
                }
              });
            const result = response.data;
            if(!result.error){
                console.log(result);
                setClientWithTempPass(result);
            }else{
                console.log(result);
            }
        }catch(err){
            console.log(err);
        }
    }

    const handleCheckForEmailStatus = () => {
        const newCommonEmails = clientDetail
        .filter(obj1 => clientWithTempPass.some(obj2 => obj2.email === obj1.email))
        .map(obj => obj.email);
        setCommonEmails(newCommonEmails);
    }

    useEffect(()=>{
        getAllClientDetails();
        getAllClient();
    },[]);

    useEffect(()=>{
        if(clientDetail.length>0 && clientWithTempPass.length>0){
            handleCheckForEmailStatus();
        }
    },[clientDetail, clientWithTempPass]);

    
    const createClient = async (id) => {
        const userId = {id};
        try {
            const response = await axios.post(`http://localhost:5002/tempPass-Client/${id}`, userId, {
                headers: {
                    Authorization: `Bearer ${staffToken}`,
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
    
    const handleGeneratePasswordAndTempUrl = (id) => {
        createClient(id);
    };

  return (
            <div>
                <h1>All Client Details</h1>
                {clientDetail.length === 0 ? <h3>No Client Created Yet</h3> 
                :<div>
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
                                <th scope="col">Email Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientDetail.map((client) => {
                                return <tr key={client._id}>
                                            <th scope="row">{client.name}</th>
                                            <td>{client.phone}</td>
                                            <td>{client.email}</td>
                                            <td>{client.companyName}</td>
                                            <td>{client.industry}</td>
                                            <td>{client.count}</td>
                                            <td>{client.text}</td>
                                            <td>{commonEmails.includes(client.email) ? "Email already sent" : emailStatus ? "Email still not sent" : emailMsg}</td>
                                            <td><button type="button" className="btn btn-outline-info" onClick={() => handleGeneratePasswordAndTempUrl(client._id)}>Send mail</button></td>
                                        </tr>
                                })}
                        </tbody>
                    </table>
                </div>     
                }  
            </div>
  )
}

export default AllClients