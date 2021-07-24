const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Create a server:
const app = express();

// Create a schema and a root resolver:
const schema = buildSchema(`
  type Car {
    name: String!
    make: String!
    plate: String!
  }

  type Query {
    carsByMake(make: String!): [Car]
    cars: [Car]
  }
`);

const rootValue = {
  cars: async () => {
    const file = await fs.readFile(path.resolve('data', 'cars.json'));
    return JSON.parse(file);
  },
  carsByMake: async ({make}) => {
    const file = await fs.readFile(path.resolve('data', 'cars.json'));
    const cars = JSON.parse(file);
    const filtered = cars.filter(car => car.make.toLowerCase() === make.toLowerCase());
    return filtered;
  },
};

// Use those to handle incoming requests:
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue
  })
);

// Start the server:
app.listen(8080, () => console.log("Server started on port 8080"));