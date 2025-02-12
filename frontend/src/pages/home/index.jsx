import { useEffect, useState, useRef } from "react";

import "./style.css";
import api from "../../services/api";

function Home() {
  const [cars, setCars] = useState([]);
  const [car,   setCar] = useState({});

  const inputMake      = useRef();
  const inputModel     = useRef();
  const inputYear      = useRef();
  const inputLcnsPlate = useRef();

  useEffect(() => {
    setCar(null);
    getCars();
  }, []);

  async function getCars() {
    const carsFromApi = (await api.get("/cars")).data;
    setCars(carsFromApi.data);
  }

  async function saveButton(car) {
    if (car) {
      await editCars(car);
    } else {
      await createCars();
    }
    await getCars();
  }

  async function createCars() {
    if(!inputMake.current.value || !inputModel.current.value || !inputYear.current.value || !inputLcnsPlate.current.value){
      window.alert("All fields must be filled");
    }
    else if(isNaN(inputYear.current.value)) {
      window.alert("Year must be a number");
    }
    else{
      try {
        await api.post("/cars", {
          make:       inputMake.current.value,
          model:      inputModel.current.value,
          year:       parseInt(inputYear.current.value),
          lcns_plate: inputLcnsPlate.current.value
        });
      } catch (error) {
        console.error("Erro ao criar carro:", error.response?.data || error.message);
      }
      finally {
        clearInput();
      }
    }
  }

  async function deleteCars(id) {
    if(!window.confirm("Are you sure you want to delete this car?")){
      return;
    }
    else{
      await api.delete(`cars/${id}`);
    }
    
  }

  async function editCars() {
    if(!inputMake.current.value || !inputModel.current.value || !inputYear.current.value || !inputLcnsPlate.current.value){
      window.alert("All fields must be filled");
    }
    else if(isNaN(inputYear.current.value)) {
      window.alert("Year must be a number");
    }
    else{
      try {
        await api.put(`cars/${car.id}`, {
          make: inputMake.current.value,
          model: inputModel.current.value,
          year: parseInt(inputYear.current.value),
          lcns_plate: inputLcnsPlate.current.value
        });
      }
      catch (error) {
        console.error("Erro ao editar carro:", error.response?.data || error.message);
      }
      finally {
        setCar(null);
        clearInput();
      }
    }
  }

  function loadInput(car) {
    setCar(car);
    inputMake.current.value = car.make;
    inputModel.current.value = car.model;
    inputYear.current.value = car.year;
    inputLcnsPlate.current.value = car.lcns_plate;
  }

  function clearInput() {
    inputMake.current.value = "";
    inputModel.current.value = "";
    inputYear.current.value = "";
    inputLcnsPlate.current.value = "";
  }

  return (
    <div className="container">
      <h1>CRUD Application</h1>
      <form>
        <div className="form-group">
          <label for="fbrand">Make:</label>
          <input type="text" ref={inputMake} />

          <label for="fmodel">Model:</label>
          <input type="text" ref={inputModel} />

          <label for="fyear">Year:</label>
          <input type="text" ref={inputYear} />

          <label for="fplate">License plate:</label>
          <input type="text" ref={inputLcnsPlate} />

          <button type="button" className="btn saveBtn" onClick={async () => { saveButton(car); }}> Save </button>
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
          {cars.map((car) => (
            <tr key={car.id}>
              <td>{car.make}</td>
              <td>{car.model}</td>
              <td>{car.year}</td>
              <td>{car.lcns_plate}</td>
              <td className="actions">
                <button className="delete-btn action-btn" onClick={async () => { await deleteCars(car.id), getCars() }}>Delete</button>
                <button className="edit-btn action-btn" onClick={async () => { loadInput(car) }}>Edit</button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default Home;
