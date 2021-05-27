import React,{useState, useEffect} from 'react'
import { toast } from 'react-toastify';
import {auth} from '../firebase';
import {createOrUpdateUser}  from "../functions/auth"
import {useDispatch, useSelector} from "react-redux";





const RegisterComplete = ({history}) => {
    const dispatch = useDispatch();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const {user} = useSelector(state=>({...state}));

    useEffect(() => {
        if(user&&user.token) {
            history.push("/")
        }
    }, [user,history])

    useEffect(() => {
      const emailId = window.localStorage.getItem("emailForRegistration");
      setEmail(emailId);
    }, [])

    const handleSubmit =async(e)=>{
        e.preventDefault();
        if(!email || !password ){
            toast.error("Email and password are required!");
            return;
        }
        if(password.length<6){
            toast.error("Password must be 6 characters long!");
            return;
        }

        try{

            const result = await auth.signInWithEmailLink(
                email,
                window.location.href
                );
                if(result.user.emailVerified){
                    //remove user from the local storage
                    window.localStorage.removeItem("emailForRegistration");
                    //update password and get token
                    let user =auth.currentUser;
                    await user.updatePassword(password);
                    const idTokenResult = await user.getIdTokenResult() //JSON web token
                    // redux store
                    createOrUpdateUser(idTokenResult.token)
            .then(res=>{
                dispatch({
                    type:"LOOGED_IN_USER",
                    payload:{
                        name:res.data.name,
                        email:res.data.email,
                      token:idTokenResult.token,
                      role:res.data.role,
                      _id:res.data._id
                    }
                  })

            })
            .catch(err=>console.log(err))
                    // redirect
                    history.push("/");


                }

        }catch(error){
            console.log(error);
            toast.error(error.message)
        }



    }

    const registerCompleteForm = () =><form onSubmit={handleSubmit}>
        <input type="email" className="form-control"
        value={email}
        disabled/>
        <input type="password"
        onChange={e=>setPassword(e.target.value)}
        placeholder="password"
        className="form-control mt-2"
        />
        <button type="submit" className="btn btn-raised mt-3">complete</button>
    </form>


    return (
        <div>
<div className="container">
<div className="row p-5">
    <div className="col-md-6 offset-md-3">
        <h4 className="m-3">Complete your regestration here</h4>
        { registerCompleteForm()}
    </div>
</div>
</div>
        </div>
    )
}

export default RegisterComplete
