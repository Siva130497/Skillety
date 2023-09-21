import React, { useState, useContext } from 'react'
import AuthContext from '../../context/AuthContext';
import Layout from '../../components/Layout';
import RecruiterDashboard from '../RecruiterDashboard/RecruiterDashboard';

const RecruiterLogin = () => {
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
        const userType = "staff"
        const updatedCredentials = [credentials, userType]
        loginUser(updatedCredentials);

    }
    return (
        <>
            <Layout newNavBarRecruiterLogin = {true} />
            <div className='container-fluid'>
            {dashBoard ? <RecruiterDashboard /> :
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
                    </form>
                </>
            }
            </div>
            
            
        </>
    )
}

export default RecruiterLogin;