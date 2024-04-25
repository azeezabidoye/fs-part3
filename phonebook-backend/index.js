const express = require("express");
let { personsData } = require("./data/personsData");
const app = express();

app.use(express.json());

// Funcftion for generating new ID for Person
const generateID = () => {
  return Math.floor(Math.random() * 100);
};

console.log(generateID());

// Homepage
app.get("/", (request, response) => {
  response.send("<h1>Welcome to PhoneBook Backend</h1>");
});

// Create a new Person entry

// Get all Persons Data
app.get("/api/persons", (request, response) => {
  response.json(personsData);
});

// Get each Person by ID
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = personsData.find((person) => {
    return person.id === id;
  });
  if (person) {
    return response.json(person);
  } else {
    return response.status(404).end();
  }
});

// Delete Person by ID
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  personsData = personsData.filter((person) => person.id !== id);

  response.status(204).end();
});

// Get application Info page
app.get("/info", (request, response) => {
  const currentTime = new Date();
  response.send(
    `<p>Phonebook has info for ${personsData.length} people. <br /> ${currentTime}</p>`
  );
});

// Server and Port
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`App is currently listening on port ${PORT}`);
});
