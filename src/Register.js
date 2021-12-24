import React, { useState,useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import Header from './Header'

function Register(){
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");
    const Navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('user-info')){
            Navigate("/add")
        }
    })
    async function signUp() {
        let item={name,password,email};
        console.warn(item);
        let result = await fetch("http://localhost:8000/api/register",{
            method:'POST',
            body:JSON.stringify(item),
            headers:{
                "content-type":'application/json',
                "Accept":'application/json'

            }
        })
        result = await result.json();
        console.warn("result : ",result);
        localStorage.setItem("user-info",JSON.stringify(result))
        Navigate("/add");
    }

    return(
        <>
        <Header/>
        <div className="col-sm-6 offset-sm-3">
            <h1>Halaman Register</h1>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" placeholder="Name" />
            <br />
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" placeholder="Password" />
            <br />
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Email" />
            <br />
            <button onClick={signUp} className="btn btn-primary"> Sign-Up</button>
        </div>
        </>
    );
}
export default Register;
