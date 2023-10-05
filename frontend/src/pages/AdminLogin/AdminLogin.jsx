import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../../context/AuthContext';
import Layout from '../../components/Layout';
import useTokenRedirect from '../../customhooks/useTokenRedirect';

const AdminLogin = () => {
    useTokenRedirect();
    const {loginUser} = useContext(AuthContext)
    const [credentials, setcredentials] = useState({
        email:"",
        password:"",
    });

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setcredentials({...credentials, [name]:value});
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const userType = "admin"
        const updatedCredentials = [credentials, userType]
        loginUser(updatedCredentials);

    }
    return (
                <div>
                    <Layout newNavBarAdminLogin = {true} />
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
                            <a href="/forgot-password/Admin" className='cli--login-forgot'>Forgot Password</a>
                        </div>
                    </div>
                    <input type='submit' value="Login" className='btn btn-primary my-3' />
                    </form>
                    </div>
                </div>
    )
}

export default AdminLogin;