import React, { useState } from 'react';
import UserNav from '../../components/nav/UserNav';
import {auth} from "../../firebase";
import {toast} from "react-toastify";

const Password = () => {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async(e) =>{
        e.preventDefault();
        setLoading(true);
        await auth.currentUser
        .updatePassword(password)
        .then(()=>{
            setLoading(false);
            setPassword("");
            toast.success("Password has been updated successfully");
        }
        ).catch(err=>{
            setLoading(false);
            toast.error(err.message)
        })


    }

    const passwordUpdateForm = () => <form onSubmit={handleSubmit}>
    <div className="form-group">
    <label>Your new password</label>
    <input type="password" onChange={(e)=>setPassword(e.target.value)}
    className="form-control"
    placeholder="Enter your new password"
    value={password}
    disabled={loading}
     />
     <button disabled={!password || password.length<6 || loading } className="btn btn-primary btn-raised mt-2">Update</button>
    </div>


    </form>
    return (
        <div>
            <div className="container-fluid">
        <div className="row">

        <div className="col-md-2">
        <UserNav />
        </div>

        <div className="col">
           {loading?<h2 className="text-danger">Loading...</h2>: <h2>Password Update</h2>}
            {passwordUpdateForm()}
        </div>

        </div>
    </div>
        </div>
    )
}

export default Password
