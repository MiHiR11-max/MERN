import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Editbill() {

  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [items, setItems] = useState([{ name: "", quantity: 1, price: 0 }]);
  const [currentDate, setCurrentDate] = useState("");
  const navigate = useNavigate(); 
  const { id } = useParams();

  const apiUrl = `http://localhost:8000/students/${id}`;

  // Fetch data and update states
  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(res => {
        console.log("API response:", res);

        // Initialize customerName, customerAddress, and items with fetched data
        if (res.customerName) setCustomerName(res.customerName);
        if (res.customerAddress) setCustomerAddress(res.customerAddress);
        if (res.item && Array.isArray(res.item)) {
          setItems(res.item);  
        }
        if (res.date) setCurrentDate(res.date);
      });
  }, [apiUrl]);

  

  // Function to add a new item
  const addItem = () => {
    setItems([...items, { name: "", quantity: 1, price: 0 }]);
  };

  // Function to handle changes in item input fields
  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  // Calculate the total for each item and the grand total
  const calculateTotal = () => {
    return items.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); 

    // Prepare data to be sent
    const data = {
      customerName,
      customerAddress,
      item: items,
      total: calculateTotal(),
      date: currentDate,
    };

    console.log("Data being sent:", JSON.stringify(data));

    fetch(apiUrl, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        navigate('/bill');
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <div className="d-flex justify-content-between align-items-center">
          <h1>Bill Book</h1>
          <div className="text-muted">{currentDate}</div>
        </div>

        <div className="mt-4">
          <h3>Customer Information</h3>
          <input
            type="text"
            className="form-control my-2"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Customer Name"
          />
          <textarea
            className="form-control"
            value={customerAddress}
            onChange={(e) => setCustomerAddress(e.target.value)}
            placeholder="Customer Address"
          ></textarea>
        </div>

        <table className="table table-bordered mt-4">
          <thead className="thead-light">
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Quantity</th>
              <th scope="col">Unit Price</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={item.name}
                    onChange={(e) =>
                      handleItemChange(index, "name", e.target.value)
                    }
                    placeholder="Item name"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={item.quantity}
                    min="1"
                    onChange={(e) =>
                      handleItemChange(index, "quantity", parseInt(e.target.value))
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={item.price}
                    min="0"
                    onChange={(e) =>
                      handleItemChange(index, "price", parseFloat(e.target.value))
                    }
                  />
                </td>
                <td className="text-right">
                  ${item.quantity * item.price || 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="btn btn-primary mb-4" onClick={addItem}>
          Add Another Item
        </button>

        <div className="text-right">
          <strong>Grand Total: </strong>
          <span id="grand-total">${calculateTotal().toFixed(2)}</span>
        </div>

        <button onClick={handleSubmit} name="submit" className="btn btn-primary">
          EDIT
        </button>
      </div>
    </div>
  );
}
