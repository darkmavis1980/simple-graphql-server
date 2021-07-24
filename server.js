const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Create a server:
const app = express();

app.use(express.json());

// Create a schema and a root resolver:
const schema = buildSchema(`
  type Car {
    name: String!
    make: String!
    plate: String!
  }

  type Query {
    cars(make: String): [Car]
  }
`);

const getCars = async (make = null) => {
  const file = await fs.readFile(path.resolve('data', 'cars.json'));
  let cars = JSON.parse(file);
  if (make) {
    cars = cars.filter(car => car.make.toLowerCase() === make.toLowerCase());
  }
  return cars;
}

const rootValue = {
  cars: async ({make}) => {
    console.log(make);
    const cars = await getCars(make);
    return cars;
  },
};

const carsRest = async (req, res) => {
  const cars = await getCars(req.query.make);
  res.status(200).json(cars);
};

// Use those to handle incoming requests:
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue
  })
);

app.get('/cars', carsRest);

// Start the server:
app.listen(8080, () => console.log("Server started on port 8080"));