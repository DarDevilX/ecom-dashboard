import React, { useState,useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import swal from 'sweetalert2';
import Header from './Header'
function AddProducts(){
    const [name,setName] = useState("");
    const [file,setFile] = useState("");
    const [price,setPrice] = useState("");
    const [description,setDescription] = useState("");
    const Navigate = useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem('user-info')){
            Navigate("/login")
        }
    })
    async function addProducts(){
        console.log(name,file,price,description);
        const formData = new FormData;
        formData.append('name',name)
        formData.append('file',file)
        formData.append('price',price)
        formData.append('description',description)
        let result = await fetch("http://localhost:8000/api/addProduct",{
            method:'POST',
            body:formData
        })
        console.log(result.status);
        if(result.status === 200){
            return swal.fire('Success','Success adding product!','success')
        }else{
            return swal.fire('Upss!!','Error adding product!','error')
        }
    }
    return(
        <div>
            <Header/>
            <h1>Halaman Add Products</h1>
            <div className="col-sm-6 offset-sm-3">
            <input type="text" onChange={(e)=>setName(e.target.value)} className="form-control" placeholder="Name" />
            <br />
            <input type="file" onChange={(e)=>setFile(e.target.files[0])} className="form-control" placeholder="Choose File..." />
            <br />
            <input type="text" onChange={(e)=>setPrice(e.target.value)} className="form-control" placeholder="Price" />
            <br />
            <input type="text" onChange={(e)=>setDescription(e.target.value)} className="form-control" placeholder="Description"/>
            <br />
            <button onClick={addProducts} className="btn btn-primary">Add Product</button>
        </div>
        </div>
    )
}
export default AddProducts 