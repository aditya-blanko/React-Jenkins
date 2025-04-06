import { useState } from 'react';
import "./Demo.css";

export default function Demo2() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [City, setCity] = useState("");
  const [ContactsArray, setContactsArray] = useState([]);

  function GetContact() {
    // Instead of making an API call, we'll just display the current contacts
    console.log("Current contacts:", ContactsArray);
  }

  function PostContact() {
    if (!Name || !Email || !City) {
      alert("Please enter all the fields");
      return;
    }
    
    // Create a new contact object
    const newContact = { 
      name: Name, 
      email: Email, 
      city: City 
    };
    
    // Add the new contact to the array
    setContactsArray([...ContactsArray, newContact]);
    
    // Clear the input fields
    setEmail("");
    setName("");
    setCity("");
    
    console.log("Contact added:", newContact);
  }

  return (
    <div className="container">
      <div className="form-container">
        <h1>PHONEBOOK</h1>
        <input type="text" placeholder="Enter Name" value={Name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Enter Email ID" value={Email} onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder="Enter City" value={City} onChange={(e) => setCity(e.target.value)} />
        <button className="add-button" onClick={PostContact}>ADD CONTACT</button>
        <button className="get-button" onClick={GetContact}>GET ALL CONTACTS</button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email ID</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {ContactsArray.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
