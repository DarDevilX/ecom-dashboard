import React, { useState,useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import Header from './Header'
function UpdateProducts(){
    const Navigate = useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem('user-info')){
            Navigate("/login")
        }
    })
    return(
        <div>
            <Header/>
            <h1>Halaman Update Products</h1>
        </div>
    )
}
export default UpdateProducts