import Header from './Header'
import React, { useState,useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import swal from 'sweetalert2';


function Login(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const Navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('user-info')){
            Navigate("/add")
        }
    })
    async function login(){
        console.log(email,password);
        let item = {email,password}
        let result = await fetch("http://localhost:8000/api/login",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body : JSON.stringify(item)
        })
        result = await result.json();
        console.log(result);
        if(result.status === false){
            return swal.fire('Upss!!','Incorrect Username Or Password','error')
        }else{
            localStorage.setItem("user-info",JSON.stringify(result))
            Navigate("/add")
        }
    }
    return(
        <div>
            <Header/>
            <div className="col-sm-6 offset-sm-3">
            <h1>Halaman Login</h1>
            <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Email" />
            <br />
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" placeholder="Password" />
            <br />
            <button onClick={login} className="btn btn-primary">Login</button>
        </div>
        </div>
    )
}
export default Login 