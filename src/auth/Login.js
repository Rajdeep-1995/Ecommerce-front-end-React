import React,{useState, useEffect} from 'react'
import { toast } from 'react-toastify';
import {googleAuthProvider,auth} from '../firebase';
import {Button} from "antd";
import { GoogleOutlined, MailOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import { Link } from 'react-router-dom';
import {createOrUpdateUser}  from "../functions/auth";



const Login = ({history}) => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loading,setLoading] = useState(false);

    const {user} = useSelector(state=>({...state}));

    useEffect(() => {
        if(user&&user.token) history.push("/")
    }, [user,history])

    const dispatch = useDispatch();

    const  roleBasedRedirect = (res)=>{
        if(res.data.role==="admin"){
            history.push("/admin/dashboard")
        }else{
            history.push("/user/history")
        }
    }


    const handleSubmit =async(e)=>{
        e.preventDefault();
        setLoading(true);
        try {
            const loggedInUser = await auth.signInWithEmailAndPassword(email,password);

            const {user} = loggedInUser;
            const idTokenResult = await user.getIdTokenResult();

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
                  roleBasedRedirect(res)

            })
            .catch(err=>console.log(err))

              setLoading(false)


        } catch (error) {
            setLoading(false);
            toast.error(error.message)
        }

    }

    const GoogleLogin = async (e) =>{
        e.preventDefault();

        auth.signInWithPopup(googleAuthProvider)
        .then(async (result)=>{
            const {user} = result;
            const idTokenResult = await user.getIdTokenResult();

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
                  roleBasedRedirect(res)

            })
            .catch(err=>console.log(err))

        })
        .catch(err=>{
            console.log(err);
            toast.error(err.message);
        })

    }

    const loginForm = () =><form onSubmit={handleSubmit}>

         <div className="form-group">
         <input type="email" className="form-control"
        onChange={(e)=>setEmail(e.target.value)}
        value={email}
        placeholder="your email"
         autoFocus={true}/>
         </div>

         <div className="form-group">
         <input type="password" className="form-control"
        onChange={(e)=>setPassword(e.target.value)}
        placeholder="your password"
        value={password}
         />

         </div>

        <Button
        className="mb-3"
        icon={<MailOutlined/>}
        type="primary"
        onClick={handleSubmit}
        block
        shape="round"
        size="large"
        disabled={!email || password.length<6}
        >Login with email/password</Button>

<Button
        icon={<GoogleOutlined/>}
        type="danger"
        onClick={GoogleLogin}
        block
        shape="round"
        size="large"
        >Login with Google</Button>
        <Link to="/forgot/password" className="text-danger float-right">Forgot password?</Link>
    </form>



    return (
        <div>
<div className="container">
<div className="row p-5">
    <div className="col-md-6 offset-md-3">
        {loading?<h4 className="text-danger">Loading...</h4>:<h4>Login</h4>}
        {loginForm()}
    </div>
</div>
</div>
        </div>
    )
}

export default Login
