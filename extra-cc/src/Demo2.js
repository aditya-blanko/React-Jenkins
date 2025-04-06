import axios from 'axios';
import { useState } from 'react';
import "./Demo.css";

export default function Demo2() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [City, setCity] = useState("");
  const [ContactsArray, setContactsArray] = useState([]);

  function GetContact() {
    let url = "https://localhost:7233/api/Phone";
    axios.get(url).then((resData) => {
      console.log(resData.data);
      setContactsArray(resData.data);
    });
  }

  function PostContact() {
    let url = "https://localhost:7233/api/Phone";
    if (!Name || !Email || !City) {
      alert("Please enter all the fields");
      return;
    }
    const newContact = { name: Name, email: Email, city: City };
    axios
      .post(url, newContact)
      .then((response) => {
        console.log("Contact added:", response.data);
        setContactsArray([...ContactsArray, response.data]);
        setEmail("");
        setName("");
        setCity("");
      })
      .catch((error) => {
        console.error("Error posting data:", error);
      });
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
