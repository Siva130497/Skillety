import React, { useState, useContext } from 'react';
import {useNavigate} from "react-router-dom"
import AuthContext from '../context/AuthContext';

const ClientRegister = () => {
    const navigate = useNavigate();
    const {registerUser} = useContext(AuthContext);
    const [credentials, setcredentials] = useState({
        days:"",
    })

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setcredentials({...credentials, [name]: value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!credentials.name || !credentials.phone || !credentials.email || !credentials.companyName || !credentials.industry || !credentials.count || !credentials.text ){
            return
        }
        registerUser(credentials);
        navigate("/packages");
    }
  return (
            <>
                <h3>Create your account</h3>
                <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label 
                    htmlFor="days" 
                    className="form-label mt-4">
                        In how many days can you Join? 
                    </label>
                    <select 
                    className="form-select" 
                    id="days"
                    name="days" 
                    value = {credentials.days}
                    onChange={handleInputChange}
                    required>
                        <option value="">Please select any one bucket.</option>
                        <option value="admin">0 to 7 days</option>
                        <option value="teacher">8 to 15 days </option>
                        <option value="student">16 to 30 days</option>
                        <option value="student">More than 30 days</option>
                    </select>
                </div>
                <input type='submit' value="Register" className='btn btn-primary my-3' />
                </form>
            </>
        )
}

export default ClientRegister;