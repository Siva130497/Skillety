import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../components/Layout';

const ClientNewPassword = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [newClient, setNewClient] = useState([]);
    const [credentials, setCredentials] = useState({
        tempPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [passwordError, setPasswordError] = useState('');

    const getAllClient = async () => {
        try {
            const response = await axios.get(`http://localhost:5002/clientWithUrl-Detail/${id}`);
            const result = response.data;
            if (!result.error) {
                console.log(result);
                setNewClient(result);
            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllClient();
    }, []);

    const finalClientDetail = async (userData) => {
        try {
            const response = await axios.post(`http://localhost:5002/finalRegister-Client`, userData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = response.data;
            if (!result.error) {
                console.log(result);
                navigate("/client-login");
            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (credentials.newPassword.length < 8) {
            alert("Password must be atleast 8 characters long");
            return;
        }
        if (credentials.newPassword === credentials.confirmPassword) {
            const { url, _id, ...updatedClient } = newClient[0];
            updatedClient.password = credentials.newPassword;
            updatedClient.userEnterTempPassword = credentials.tempPassword;
            console.log(updatedClient);
            finalClientDetail(updatedClient);
        } else {
            alert("new password doesn't match with confirm password");
            return;
        }
    };

    return (
        <div>
            <Layout ClientNewPassword = {true}/>
            <div className='container-fluid'>
            {newClient.length > 0 ?
                <div>
                    <h3>Welcome {newClient[0].name} from {newClient[0].companyName}</h3>
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
                                // onPaste={(e)=>e.preventDefault()}
                                placeholder="Enter your given temporary password"
                                required />
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
                                // onPaste={(e)=>e.preventDefault()}
                                placeholder="Enter your new password"
                                required />
                            {passwordError && <p>{passwordError}</p>}
                        </div>
                        <div className="form-group">
                            <label
                                htmlFor="confirmPasswordInput"
                                className="form-label mt-4">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPasswordInput"
                                name="confirmPassword"
                                value={credentials.confirmPassword}
                                onChange={handleInputChange}
                                // onPaste={(e)=>e.preventDefault()}
                                placeholder="Re-enter your new password"
                                required />
                        </div>
                        <input type='submit' value="Submit" className='btn btn-primary my-3' />
                    </form>
                </div>
                : <div>
                    <h1>404</h1>
                    <p>Not Found</p>
                    <small>The resource requested could not be found on this server!</small>
                </div>
            }
            </div>
        </div>
    );
};

export default ClientNewPassword;
