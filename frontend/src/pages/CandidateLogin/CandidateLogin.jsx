import React, { useState, useContext } from 'react'
import{Link} from "react-router-dom";
import AuthContext from '../../context/AuthContext';
import CandidateDashboard from '../CandidateDashboard/CandidateDashboard';
import Layout from '../../components/Layout';

const CandidateLogin = () => {
    const {loginUser, dashBoard} = useContext(AuthContext)
    const [credentials, setcredentials] = useState({
        email:"",
        password:"",
    })
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setcredentials({...credentials, [name]:value});
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const userType = "login-Candidate"
        const updatedCredentials = [credentials, userType]
        loginUser(updatedCredentials);

    }
    return (
        <>
            <Layout newNavBarCandidateLogin = {true} />
            <div className='container-fluid'>
            {dashBoard ? <CandidateDashboard /> :
                <>
                    <h3>Login</h3>

                    <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label 
                        htmlFor="emailInput" 
                        className="form-label mt-4">
                            Email address
                        </label>
                        <input 
                        type="email" 
                        className="form-control" 
                        id="emailInput" 
                        aria-describedby="emailHelp" 
                        name="email" 
                        value={credentials.email} 
                        onChange = {handleInputChange} 
                        placeholder="example@example.com"
                        required />
                    </div>
                    <div className="form-group">
                        <label 
                        htmlFor="passwordInput" 
                        className="form-label mt-4">
                            Password
                        </label>
                        <input 
                        type="password" 
                        className="form-control" 
                        id="passwordInput" 
                        name="password" 
                        value = {credentials.password} 
                        onChange = {handleInputChange} 
                        placeholder="Enter your password"
                        required />
                    </div>
                    <input type='submit' value="Login" className='btn btn-primary my-3' />
                    <p>
                        Don't have an account ? <Link to = "/candiate-register">Create One</Link>
                    </p>

                    </form>
                </>
            }
            </div>
            
            
        </>
    )
}

export default CandidateLogin;