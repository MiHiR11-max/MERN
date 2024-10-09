import React, { useEffect , useState  } from 'react'
import { useParams , useNavigate , Link } from 'react-router-dom';

export default function Billdetail() {
    const [data, setData] = useState({});

    const{ id } = useParams();

    const navigate = useNavigate();

    const apiUrl = "http://localhost:8000/students/"+id;

    useEffect((e) => {
        fetch(apiUrl).then(res => res.json()).then(res => {
            console.log("API response:", res);
            setData(res);
        });
    }, [apiUrl]);


    return (
        <>

            <Link to="/bill" className="btn btn-info">Back</Link>
            <Link to={"/editbill/"+id} className="btn btn-warning">edit</Link>

            <button className="btn btn-danger" onClick={()=>{
                const apiUrl = "http://localhost:8000/students/"+id;

                fetch(apiUrl, {method:"DELETE"})
                .then(res=>res.json())
                .then(res=>{
                    navigate('/bill');
                })

                

            }}>Delete</button>

            <table className='table'>
            <div className='container'>
                    <div className='row'>
                        <div className='col-1'></div>
                        <div className='col-2'>date</div>
                        <div className='col-2'>name</div>
                        <div className='col-2'>price</div>
                        <div className='col-2'>address</div>
                        <div className='col-2'>product</div>
                        <div className='col-1'></div>
                    </div>
                    <div className='row'>
                        <div className='col-1'></div>
                        <div className='col-2'>{data.date}</div>
                        <div className='col-2'>{data.customerName}</div>
                        <div className='col-2'>{data.total}</div>
                        <div className='col-2'>{data.customerAddress}</div>
                        <div className='col-2'>
                            {data.item && data.item.length > 0 ? (
                                data.item.map((product, index) => (
                                    <div key={product._id || index}>
                                        <p>{product.name} - {product.quantity} x ${product.price}</p>
                                    </div>
                                ))
                            ) : (
                                "No items available"
                            )}
                        </div>
                        <div className='col-1'></div>
                    </div>
                </div>
            </table>
        </>
    )
}
