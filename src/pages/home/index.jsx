//react hooks
import { useEffect, useState, useRef } from "react";

import "./style.css";
import api from "../../services/api";

function Home() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    getCars();
  }, []);

  const inputMake = useRef();
  const inputModel = useRef();
  const inputYear = useRef();
  const inputLcnsPlate = useRef();
  const deleteBtn = useRef();

  async function getCars() {
    const carsFromApi = await api.get("/cars");
    setCars(carsFromApi.data);
  }

  async function createCars() {
    try {
        await api.post("/cars", {
        make: inputMake.current.value,
        model: inputModel.current.value,
        year: parseInt(inputYear.current.value),
        lcns_plate: inputLcnsPlate.current.value.toUpperCase()
        });
    } catch (error) {
      console.error("Erro ao criar carro:", error.response?.data || error.message);
    }
    finally{
      inputMake.current.value = "";
      inputModel.current.value = "";
      inputYear.current.value = "";
      inputLcnsPlate.current.value = "";
    }
  }

  async function deleteCars() {
  console.log(deleteBtn.current.id);

  await api.delete(`cars/${deleteBtn.current.id}`);
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

          <button type="button" className="btn saveBtn" onClick={async () => { await createCars(), await getCars();}}> Save </button>
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
                <button ref={deleteBtn} id={car.id} className="delete-btn" onClick={deleteCars}>Delete</button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default Home;
