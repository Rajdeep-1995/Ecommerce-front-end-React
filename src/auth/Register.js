import React,{useState, useEffect} from 'react'
import { toast } from 'react-toastify';
import {auth} from '../firebase';
import {useSelector} from "react-redux";



const Register = ({history}) => {

    const [email,setEmail] = useState("");

    const {user} = useSelector(state=>({...state}));

    useEffect(() => {
        if(user&&user.token) history.push("/")
    }, [user,history])

    const handleSubmit =async(e)=>{
        e.preventDefault();
        const config = {
            url: process.env.REACT_APP_RGISTRATION_URL,
            handleCodeInApp:true
        }
        await auth.sendSignInLinkToEmail(email,config);
        toast.success(`Email is sent to ${email}. Click the link to complete the regestration`);
        window.localStorage.setItem("emailForRegistration",email);
        setEmail("");
    }

    const registerForm = () =><form onSubmit={handleSubmit}>
        <input type="email" className="form-control"
        onChange={(e)=>setEmail(e.target.value)}
        value={email}
         autoFocus={true}/>
        <button type="submit" className="btn btn-raised mt-3">Register</button>
    </form>


    return (
        <div>
<div className="container">
<div className="row p-5">
    <div className="col-md-6 offset-md-3">
        <h4>Register</h4>
        {registerForm()}
    </div>
</div>
</div>
        </div>
    )
}

export default Register
