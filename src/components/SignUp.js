import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password
            })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Sign up successfully","success")

            navigate('/login');
        } else {
            props.showAlert("Invalid credentials","danger");
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        
                <div className="container" style={{ width: '500px' }}>
                    <div className="card" style={{ backdropFilter: 'blur(20px)', backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: '10px' }}>
                        <div className="card-header">Signup</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={onChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                    <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={credentials.confirmPassword} onChange={onChange} required />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            
        
    )
}

export default Signup;
