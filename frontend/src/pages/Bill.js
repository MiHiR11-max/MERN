import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Bill() {

    const [data,setData] = useState([]);

    const apiUrl = "http://localhost:8000/students"

    useEffect((e)=>{
        fetch(apiUrl).then(res=>res.json()).then(res=>setData(res));
    },[]);

    const fData = data.map((bill)=>{
        return(
            <tr>
                <td>{bill.date}</td>
                <td>{bill.customerName}</td>
                <td><Link className="btn btn-primary" to={"/billdetail/"+bill._id}>view detail</Link></td>
            </tr>
        );
    })

  return (
    <>
    <table className='table'>
    {fData}
    </table>
    </>
  )
}
