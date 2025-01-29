//react hooks
import { useEffect, useState, useRef } from 'react';

import './style.css'
import api from '../../services/api'

function Home() {
  const [cars, setCars] = useState([]);

  const inputMake      = useRef();
  const inputModel     = useRef();
  const inputYear      = useRef();
  const inputLcnsPlate = useRef();
  
  async function getCars() {
  const carsFromApi = await api.get('/cars');
  setCars(carsFromApi.data);
  }

  async function createCars(){
    console.log(inputMake.current.value);
    await api.post('/cars',{
      make:inputMake.current.value,
      model:inputModel.current.value,
      year:inputYear.current.value,
      lcns_plate:inputLcnsPlate.current.value
    });
    
  }

  useEffect(() =>{
    getCars();
  }, []);

  return (
    <div className="container">
      <h1>CRUD Application</h1>
      <form>
        <div className="form-group">
          <label for="fbrand" ref={inputMake}>Make:</label>
          <input type="text" />

          <label for="fmodel" ref={inputModel}>Model:</label>
          <input type="text" />

          <label for="fyear" ref={inputYear}>Year:</label>
          <input type="text" />

          <label for="fplate" ref={inputLcnsPlate}>License plate:</label>
          <input type="text" />

          <button type='button' className="btn saveBtn" onClick={createCars} >Save</button>
        </div>
      </form>
      <div className="list">
      <table>
          <tr>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>License Plate</th>
            <th>Actions</th>
          </tr>
        {
          cars.map(car =>(
            <tr key={car.id}>
                <td>{car.make}</td>
                <td>{car.model}</td>
                <td>{car.year}</td>
                <td>{car.year}</td>
                <td className="actions">
                    <button className="delete-btn">Delete</button>
                </td>
            </tr>
          ))
        }
        
        </table>
      </div>
    </div>
    )
}

            export default Home
