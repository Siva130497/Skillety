import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../../context/AuthContext';
import Layout from '../../components/Layout';
import useTokenRedirect from '../../customhooks/useTokenRedirect';

const AdminLogin = () => {
    useTokenRedirect();
    const {loginUser, errorMsg, setErrorMsg} = useContext(AuthContext)
    const [credentials, setcredentials] = useState({
        userId:"",
        password:"",
    });

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setcredentials({...credentials, [name]:value});
        setErrorMsg("");
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
                        htmlFor="userIdInput" 
                        className="form-label mt-4">
                            UserId
                        </label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="userIdInput" 
                        aria-describedby="emailHelp" 
                        name="userId" 
                        value={credentials.userId} 
                        onChange = {handleInputChange} 
                        placeholder="Enter your Email ID"
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
                        {errorMsg ?
                                            <p className='log-error-msg'>{errorMsg && "!!!" + errorMsg}</p>
                                            : null
                                        }

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