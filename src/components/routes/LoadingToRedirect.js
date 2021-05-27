import React, { useEffect, useState } from 'react'
import {useHistory} from "react-router-dom"

const LoadingToRedirect = () => {
    const [count, setCount] = useState(3);
    let history = useHistory();

    useEffect(() => {
       const interval= setInterval(() => {
            setCount((currnetCount)=>(currnetCount-=1))
        }, 1000);
        count===0&&history.push("/");
        return ()=> clearInterval(interval)
    }, [count,history])





    return (
        <div className="p-5 text-center container">
        <h3>Redirecting you in {count} {count===1?"second":"seconds"}</h3>

        </div>
    )
}

export default LoadingToRedirect
