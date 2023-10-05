import React, { useState, useContext } from 'react'
import{Link} from "react-router-dom";
import AuthContext from '../../context/AuthContext';
import Layout from '../../components/Layout';
import useTokenRedirect from '../../customhooks/useTokenRedirect';

const CandidateLogin = () => {
    useTokenRedirect();
    const {loginUser} = useContext(AuthContext)
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
                <div>
                    <Layout newNavBarCandidateLogin = {true} />
                    <div className='container-fluid'>
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
                        onPaste={(e)=>e.preventDefault()}
                        required />
                        <div className="cli--login-forgot-area" data-aos="fade-left">
                            <a href="/forgot-password/Candidate" className='cli--login-forgot'>Forgot Password</a>
                        </div>
                    </div>
                    <input type='submit' value="Login" className='btn btn-primary my-3' />
                    <p>
                        Don't have an account ? <Link to = "/candiate-register">Create One</Link>
                    </p>

                    </form>
                    </div>
                </div>
    )
}

export default CandidateLogin;