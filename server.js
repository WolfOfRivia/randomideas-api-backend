// bring in express
const express = require('express');

// set our port (for backend development brad uses 5000)
const port = 5000

// initialize express
const app = express();

const ideas = [
  {
    id: 1,
    text: 'Postive Newsletter, a newsletter that only shares positive uplifting news',
    tag: 'Technology',
    username: 'CommanderSheperd',
    date: '2024-12-01',
  },
  {
    id: 2,
    text: 'Milk cartons that turn a different color the older your milk is getting',
    tag: 'Inventions',
    username: 'TaliNarAya',
    date: '2023-04-02',
  },
  {
    id: 3,
    text: 'ATM location app which lets you know where the closest ATM is and if it can be calibrated',
    tag: 'Software',
    username: 'JustGarrus',
    date: '2023-15-12',
  }
]

// create routes
app.get('/', (req, res) => {
  // This response works the content type is text/html 
  // res.send('Hello World');
  // This also works content type is application/json, you also don't need to use .json() or stringify, just a simple json object works
  res.json({ message: 'Welcome to the RandomIdeas API'});
});

/* Keeping this in a RESTFUL structure, 
  - when we want to get ideas we make a get request to /api/ideas
  - when we want to create ideas we make a post request to /api/ideas
  - when we want to delete ideas we make a delete request to /api/ideas/${the id of the idea}
  - when we want to update ideas we make a put request to /api/ideas
*/

// Get all ideas
app.get('/api/ideas', (req, res) => {
  // You could just send the response this way
  // res.json(ideas);
  // But this is a nicer more dev friendly way of doing it
  res.json({ success: true, data: ideas});
});

// get a single idea
// the :id is a queryparam accessed by the req object
app.get('/api/ideas/:id', (req, res) => {
  // access :id
  req.params.id;
  // When finding by id it's easier in Databases but in this case we need to manually do it with high order array methods like .find()
  const idea = ideas.find((idea) => idea.id === +req.params.id); // the + parsed the id from a string to a number
  // ERROR handing (say there is no idea with the requested id)
  if (!idea) {
    return res.status(404).json( {success: false, error: 'Resource not found'});
  }
  res.json({ success: true, data: idea});
});

// create server
app.listen(port, () => console.log(`Server listening on port ${port}`));