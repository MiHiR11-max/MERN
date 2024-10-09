import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Newbill() {
    
    const [customerName, setCustomerName] = useState("");
    const [customerAddress, setCustomerAddress] = useState("");
    const [items, setItems] = useState([{ name: "", quantity: 1, price: 0 }]);
    const [currentDate, setCurrentDate] = useState("");
    const navigate = useNavigate();
  
    // Set current date
    useEffect(() => {
      const today = new Date();
      const formattedDate = today.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      setCurrentDate(formattedDate);
    }, []);
  
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
        item:items,
        total: calculateTotal(),
        date: currentDate,
      };
  
      console.log("Data being sent:", JSON.stringify(data)); 


      // Send POST request to the server
      fetch("http://localhost:8000/students", {
        method: "POST",
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
          {/* Header with Title and Date */}
          <div className="d-flex justify-content-between align-items-center">
            <h1>Bill Book</h1>
            <div className="text-muted">{currentDate}</div>
          </div>
  
          
  
          {/* Customer Information */}
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
  
          {/* Item Table */}
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
  
          {/* Add Item Button */}
          <button className="btn btn-primary mb-4" onClick={addItem}>
            Add Another Item
          </button>
  
          {/* Total Calculation */}
          <div className="text-right">
            <strong>Grand Total: </strong>
            <span id="grand-total">${calculateTotal().toFixed(2)}</span>
          </div>
  
          {/* Submit Button */}
          <button onClick={handleSubmit} name="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    );
  

}
