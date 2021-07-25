import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CarsList = () => {
  const [cars, setCars] = useState([]);

  const fetchCars = async () => {
    const { data } = await axios.get('http://localhost:8080/cars');
    setCars(data);
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
