import React, { useState,useEffect} from "react";
import {Table} from 'react-bootstrap';
import swal from 'sweetalert2';
import Header from './Header'

function ProductList(){
    const [data,setData] = useState([]);
    useEffect(async () => {
        let result = await fetch('http://localhost:8000/api/list');
        result = await result.json();
        setData(result);
        console.log(data);
    },[])   
    return (
        <div>
            <Header/>
            <h1>Product Lists</h1>
            <div className="container">
            <Table hover striped bordered >
                <thead>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Products Image</th>
                </thead>
                <tbody>
                {data.map((item)=>
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.description}</td>
                            <td><img src={"http://localhost:8000/"+item.file_path} style={{width : '100px'}}/></td>
                        </tr>
                )}
                </tbody>
            </Table>
            </div>
        </div>
    )
}

export default ProductList