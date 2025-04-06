import axios from 'axios';
import { useState } from 'react';

export default function  Demo()
{
  const [id, setID] = useState("");  
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [customersArray, setCustomersArray] = useState([]);

  function buttonClick1()
  {
    let url = "https://assignment2-420250312113455-h7bfhjh7b6a5g0du.canadacentral-01.azurewebsites.net/api/employee";

    axios.get(url).then(resData=>
        {
            console.log(resData.data);
            setCustomersArray(resData.data);
        });    
  }

  function buttonClick2() {

    let url = "https://assignment2-420250312113455-h7bfhjh7b6a5g0du.canadacentral-01.azurewebsites.net/api/employee";

    if (!id || !name || !salary) {
      alert("Please enter all the fields");
      return;
    }
    const newEmployee = { id: parseInt(id), name: name, salary: parseInt(salary) };

    axios
      .post(url, newEmployee)
      .then((response) => {
        console.log("Employee added:", response.data);

        // Update the UI with new employee
        setCustomersArray([...customersArray, response.data]);

        // Clear input fields
        setID("");
        setName("");
        setSalary("");
      })
      .catch((error) => {
        console.error("Error posting data:", error);
      });
  }


  var result =  customersArray.map( (item, index) => 
  <tr>  
     <td> {item.id}  </td> 
     <td> {item.name}  </td> 
     <td> {item.salary}  </td> 
  </tr>);

    return (
        <>
          <h3>Server Communication in React JS</h3>
          <hr/>
          <button  onClick={buttonClick1}>Get Employee</button>
          <hr/>
          <hr/>
          <input
        type="number"
        placeholder="Enter Employee ID"
        value={id}
        onChange={(e) => setID(e.target.value)}
      />
          <input
        type="text"
        placeholder="Enter Employee Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter Salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
      />
      <button onClick={buttonClick2}>Add Employee</button>
          <hr/>

          <table  border="2"  cellpadding="5"  cellSpacing="0" width="700">
                <tr>
                    <th>Employee ID</th>
                    <th>Employee Name</th>
                    <th>Salary</th>                    
                </tr>
                {result}
            </table>

        </>
    );
}

