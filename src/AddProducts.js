import React, { useState,useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import Header from './Header'
function AddProducts(){
    const Navigate = useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem('user-info')){
            Navigate("/login")
        }
    })
    return(
        <div>
            <Header/>
            <h1>Halaman Add Products</h1>
        </div>
    )
}
export default AddProducts 