import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CarsList = () => {
  const [cars, setCars] = useState([]);

  const fetchCars = async () => {
    // const { data } = await axios.get('http://localhost:8080/cars');
    const { data: { data: { cars } } } = await axios.post('http://localhost:8080/graphql', {
      query: `
    {
      cars {
        name
        make
        plate
      }
    }`
  });
    setCars(cars);
  }

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <ul>
      {cars.map((car, index) => (
        <li key={index}>
          {`${car.make} ${car.name}`}
        </li>
      ))}
    </ul>
  )
};

export default CarsList;
