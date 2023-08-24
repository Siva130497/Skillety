import React, { useState, useContext } from 'react';
import {useNavigate} from "react-router-dom"
import AuthContext from '../context/AuthContext';

const ClientRegister = () => {
    const navigate = useNavigate();
    const {registerUser} = useContext(AuthContext);
    const [credentials, setcredentials] = useState({
        name:"",
        phone:"",
        email:"",
        companyName:"",
        industry:"",
        count:"",
        text:"",
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
                    htmlFor="nameInput" 
                    className="form-label mt-4">
                        Your Full Name
                    </label>
                    <input 
                    type="text" 
                    className="form-control" 
                    id="nameInput"  
                    name="name" 
                    value={credentials.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required/>
                </div>
                <div className="form-group">
                    <label 
                    htmlFor="phoneInput" 
                    className="form-label mt-4">
                    Mobile Number
                    </label>
                    <input 
                    type="number" 
                    className="form-control" 
                    id="phoneInput" 
                    name="phone" 
                    value = {credentials.phone} 
                    onChange = {handleInputChange} 
                    placeholder="+94 987654321"
                    required />
                </div>
                <div className="form-group">
                    <label 
                    htmlFor="emailInput" 
                    className="form-label mt-4">
                        Email ID
                    </label>
                    <input 
                    type="email" 
                    className="form-control" 
                    id="emailInput" 
                    aria-describedby="emailHelp" 
                    name="email" 
                    value={credentials.email}
                    onChange={handleInputChange}
                    placeholder="email@example.com"
                    required/>
                </div>
                <div className="form-group">
                    <label 
                    htmlFor="companyNameInput" 
                    className="form-label mt-4">
                        Company name
                    </label>
                    <input 
                    type="text" 
                    className="form-control" 
                    id="companyNameInput"  
                    name="companyName" 
                    value={credentials.companyName}
                    onChange={handleInputChange}
                    placeholder="Enter your company name"
                    required/>
                </div>
                <div className="form-group">
                    <label 
                    htmlFor="Industry" 
                    className="form-label mt-4">
                        Industry
                    </label>
                    <select 
                    className="form-select" 
                    id="industrySelect"
                    name="industry" 
                    value = {credentials.industry}
                    onChange={handleInputChange}
                    required>
                        <option value="">Select an Industry</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                    </select>
                </div>
                <div className="form-group">
                    <label 
                    htmlFor="countInput" 
                    className="form-label mt-4">
                    Headcount
                    </label>
                    <input 
                    type="number" 
                    className="form-control" 
                    id="countInput" 
                    name="count" 
                    value = {credentials.count} 
                    onChange = {handleInputChange} 
                    placeholder="Enter the count"
                    required />
                </div>
                <div className="form-group">
                    <label 
                    htmlFor="textInput" 
                    className="form-label mt-4">
                        From where did you learn about Skillety?
                    </label>
                    <input 
                    type="text" 
                    className="form-control" 
                    id="textInput"  
                    name="text" 
                    value={credentials.text}
                    onChange={handleInputChange}
                    placeholder="Enter the text"
                    required/>
                </div>
                <input type='submit' value="Register" className='btn btn-primary my-3' />
                </form>
            </>
        )
}

export default ClientRegister;