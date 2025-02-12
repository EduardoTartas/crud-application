import * as carService from '../services/carService.js';
import { formatResponse } from '../utils/apiResponse.js';

export const getCars = async (req, res) => {
    try{
        const cars = await carService.getCars();
        formatResponse(res, 200, 'Success', cars);
    }
    catch(err){
        formatResponse(res, 500, 'Error', null, err);
    }
}

export const createCar = async (req, res) => {
    try{
        const car = await carService.createCar(req.body);
        formatResponse(res, 201, 'Car created successfully', car);
    }
    catch(err){
        formatResponse(res, 400, 'Error creating car', null, err);
    }
}

export const updateCar = async (req, res) => {
    try{
        const car = await carService.updateCar(req.params.id, req.body);
        formatResponse(res, 200, 'Car updated successfully', car);
    }
    catch(err){
        formatResponse(res, 400, 'Error updating car', null, err);
    }
}

export const deleteCar = async (req, res) => {
    try{
        const car = await carService.deleteCar(req.params.id);
        formatResponse(res, 204, 'Car deleted successfully', car);
    }
    catch(err){
        formatResponse(res, 400, 'Error deleting car', null, err);
    }
}