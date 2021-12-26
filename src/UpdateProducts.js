import React, { useState,useEffect} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import Header from './Header'
import swal from 'sweetalert2';
function UpdateProducts(){
    const Navigate = useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem('user-info')){
            Navigate("/login")
        }
    })
    const [data,setData] = useState("");
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [description,setDescription] = useState("");
    const [file,setFile] = useState("");

    const { id } = useParams();
    console.log(id);
    useEffect(()=>{
        async function fetchData(){
            let result = await fetch('http://localhost:8000/api/product/'+id)
            result = await result.json();
            setData(result);
            setName(result.name)
            setPrice(result.price)
            setDescription(result.description)
            setFile(result.file)
            console.log(result);
        }
        fetchData();
    },[])

    async function updateProduct(id){
        console.log(name,file,price,description);
        const formData = new FormData;
        formData.append('name',name)
        formData.append('file',file)
        formData.append('price',price)
        formData.append('description',description)
        let result = await fetch(`http://localhost:8000/api/updateproduct/${id}?_method=PUT`,{
            method:'POST',
            body:formData
        })
        console.log(result.status);
        if(result.status === 200){
            return swal.fire('Success','Success updating product!','success')
        }else{
            
            return swal.fire('Upss!!','Error updating product!','error')
        }
    }
    
    return(
        <div>
            <Header/>
            <h1>Halaman Update Products</h1>    
            <div className="col-sm-6 offset-sm-3">
                <input type="text" onChange={(e)=>setName(e.target.value)} defaultValue={data.name} name="name" className="form-control" placeholder="Name" />
                <br />
                <input type="text" onChange={(e)=>setPrice(e.target.value)} defaultValue={data.price} name="price" className="form-control" placeholder="Price" />
                <br />
                <input type="text" onChange={(e)=>setDescription(e.target.value)} defaultValue={data.description} name="description" className="form-control" placeholder="Description"/>
                <br />
                <input type="file" onChange={(e)=>setFile(e.target.files[0])} name="file" className="form-control" placeholder="Choose File..." />
                <br />
                <img src={'http://localhost:8000/'+data.file_path} style={{width : '100px',marginBottom : '5px'}} />
                <br />
                <button onClick={()=> updateProduct(data.id)} className="btn btn-primary">Update Product</button>
            </div>
        </div>
    )
}
export default UpdateProducts