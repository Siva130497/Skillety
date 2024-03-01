import React, { useState, useContext } from 'react'
import AuthContext from '../../context/AuthContext';
import Layout from '../../components/Layout';
import useTokenRedirect from '../../customhooks/useTokenRedirect';

const RecruiterLogin = () => {
    useTokenRedirect();
    const {loginUser} = useContext(AuthContext)
    const [credentials, setcredentials] = useState({
        userId:"",
        password:"",
    })
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setcredentials({...credentials, [name]:value});
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const userType = "staff"
        const updatedCredentials = [credentials, userType]
        loginUser(updatedCredentials);

    }
    return (
                <div>
                    <Layout newNavBarRecruiterLogin = {true} />
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
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
                        // onPaste={(e)=>e.preventDefault()}
                        required />
                    </div>
                    <input type='submit' value="Login" className='btn btn-primary my-3' />
                    </form>
                    </div>
                </div>
    )
}

export default RecruiterLogin;