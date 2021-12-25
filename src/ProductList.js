import React, { useState,useEffect} from "react";
import {Table} from 'react-bootstrap';
import swal from 'sweetalert2'; // Biar bagus sedikit Bu alertnya
import Header from './Header'

function ProductList(){
    const [data,setData] = useState([]);
    useEffect(async () => {
        let result = await fetch('http://localhost:8000/api/list');
        result = await result.json();
        setData(result);
        console.log(data);
    },[]) 
    
    async function deleteOp(id){
        console.log(id)
        swal.fire({
            title : "Are you sure?",
            text : "Once deleted, you will not be able to recover this data!",
            icon : "warning",
            showDenyButton : true,
            denyButtonText : "Cancel!"
          })
          .then(async (result) => {
            if (result.isConfirmed) {
                let result = await fetch('http://localhost:8000/api/delete/'+id,{
                    method : 'DELETE'
                })
                if(result.status === 200){
                    swal.fire({title : "Poof!",text : "Your data has been deleted!",icon : "success"})
                    .then(async ()=>{
                            let result = await fetch('http://localhost:8000/api/list');
                            result = await result.json();
                            setData(result);
                            console.log(data);
                    });
                }else{
                    return swal.fire('Upss!!','Error deleting data','error')
                }
            } else if(result.isDenied) {
                swal.fire("Delete Canceled!",'You canceled deleting data!','error');
            }
          });
    }
    
    return (
        <div>
            <Header/>
            <h1>Product Lists</h1>
            <div className="container">
            <Table hover bordered >
                <thead>
                    <tr>
                        <th style={{display:'none'}}>Id</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Products Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((item)=>
                        <tr>
                            <td style={{display:'none'}}>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.description}</td>
                            <td><img src={"http://localhost:8000/"+item.file_path} style={{width : '100px'}}/></td>
                            <td><button className="btn btn-danger" onClick={() => deleteOp(item.id)}>Delete</button></td>
                        </tr>
                )}
                </tbody>
            </Table>
            </div>
        </div>
    )
}

export default ProductList