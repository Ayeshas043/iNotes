import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';
const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            
            body: JSON.stringify({email: credentials.email, password: credentials.password})
            
        });
        const json = await response.json()
        console.log(json);
        
        if(json.success){
        localStorage.setItem('token' , json.authtoken);
        props.showAlert("logged in successfully","success")

        navigate('/');
        } else{
            props.showAlert("Invalid credentials","danger");
        }
        
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    const handleSignup = () => {
        navigate('/signup'); // Navigate to the signup page
    };
    return (
    
            <div className="container"style={{width:'500px'}}>
                <div className="card" style={{ backdropFilter: 'blur(20px)', backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: '10px' }}>
                    <div className="card-header">Login</div>
                    <div className="card-body" mx-3>
                        <form onSubmit={handleSubmit}>
                            <div className="my-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} required />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                        <div className="mt-3">
                                <p>Don't have an account? <button className="btn btn-link" onClick={handleSignup}>Sign up</button></p>
                            </div>
                    </div>
                </div>
            </div>
        
    )
}

export default Login