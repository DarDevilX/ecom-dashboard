import React, { useState,useEffect} from "react";
import {Table} from 'react-bootstrap';
import {useNavigate,Link} from 'react-router-dom';
import swal from 'sweetalert2';
import Header from './Header'
function AddProducts(){
    const [data,setData] = useState("")
    useEffect(()=>{
        setData("")
        console.log(data);
    },[])
    
    const Navigate = useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem('user-info')){
            Navigate("/login")
        }
    })

    async function search(key){
        console.log(key)
        let result = await fetch('http://localhost:8000/api/search/'+key)
            result = await result.json()
            console.log(result)
            setData(result)
        
    }

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
                    .then(search());
                }else{
                    return swal.fire('Upss!!','Error deleting data','error')
                }
            } else if(result.isDenied) {
                swal.fire("Delete Canceled!",'You canceled deleting data!','error');
            }
          });
    }
    
    return(
        <div>
        <Header/>
        <h1>Search Products</h1>
            <div className="col-sm-6 offset-sm-3">
                <input type="text" onChange={(e)=>search(e.target.value)} name="name" className="form-control" placeholder="Type to search product" style={{marginBottom : '20px'}} />
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
                { 
                data !== "" ? 
                    data.map((item)=>
                        <tr key={item.id}>
                            <td style={{display:'none'}}>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.description}</td>
                            <td><img src={"http://localhost:8000/"+item.file_path} style={{width : '100px'}}/></td>
                            <td>
                                <button className="btn btn-danger" style={{'marginRight' : '5px'}} onClick={() => deleteOp(item.id)}>Delete</button>
                                <Link to={`/update/${item.id}`}>
                                <button className="btn btn-success">Update</button>
                                </Link>
                            </td>
                        </tr>
                    ):
                    <tr>
                        <td colSpan={5}>
                            <h4 style={{textAlign : 'center'}}>No Data</h4>
                        </td>
                    </tr>
                }
                </tbody>
            </Table>
            </div>
        </div>
    )
}
export default AddProducts 