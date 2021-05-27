import React,{useState, useEffect} from 'react'
import { toast } from 'react-toastify';
import {auth} from '../firebase';
import {useSelector} from "react-redux";



const ForgotPassword = ({history}) => {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const {user} = useSelector(state=>({...state}));

    useEffect(() => {
        if(user&&user.token) history.push("/")
    }, [user,history])

    const handleSubmit = async(e)=>{
        setLoading(true);
        e.preventDefault();
        const config = {
            url: process.env.REACT_APP_RESET_PASSWORD_URL,
            handleCodeInApp:true
        }
       await auth.sendPasswordResetEmail(email,config)
        .then(()=>{
            setLoading(false);
            setEmail("");
            toast.success("Check your email for reset password link")

        })
        .catch((error)=>{
            setLoading(false);
            toast.error(error.message);
        }
        )
    }

    return (
        <div>
    <div className="container col-md-6 offset-md-3 p-5">
        {loading?<h4 className="text-danger">Loading...</h4>:(
          <h4>Forgot password</h4>
        )}
    <form onSubmit={handleSubmit}>
        <input
        type="email"
        value={email}
        onChange={e=>setEmail(e.target.value)}
        className="form-control mb-2"
        placeholder="Enter your email addtress"
        autoFocus
        />
        <button type="submit" className="btn btn-raised" disabled={!email}>Submit</button>
    </form>

    </div>
        </div>
    )
}

export default ForgotPassword
