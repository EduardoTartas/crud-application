import prisma from "../config/prisma.js";

export const getCars = async () => {
    return await prisma.car.findMany();
}

export const createCar = async (data) => {
    return await prisma.car.create({
        data: {
            make: data.make,
            model: data.model,
            year: data.year,
            lcns_plate: data.lcns_plate.toUpperCase()
        }
    });
}

export const updateCar = async (id, data) => {
    return await prisma.car.update({
        where: {
            id: id
        },
        data: {
            make: data.make,
            model: data.model,
            year: data.year,
            lcns_plate: data.lcns_plate.toUpperCase()
        }
    });
}

export const deleteCar = async (id) => {
    return await prisma.car.delete({
        where: {
            id: id
        }
    });
}