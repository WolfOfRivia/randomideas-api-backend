// To create seperate file you need to use a router
const express = require('express');
const router = express.Router();

// also changed all instances of app.method() to router.method()

/* Keeping this in a RESTFUL structure, 
  - when we want to get ideas we make a get request to /api/ideas
  - when we want to create ideas we make a post request to /api/ideas
  - when we want to delete ideas we make a delete request to /api/ideas/${the id of the idea}
  - when we want to update ideas we make a put request to /api/ideas
*/

// We now have a working CRUD (Create, Read, Update, Delete) Api, or a full RESTFUL Api
// What's next is using a database to persist the data, because right now this all works in memory

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

// Get all ideas
router.get('/', (req, res) => {
  // You could just send the response this way
  // res.json(ideas);
  // But this is a nicer more dev friendly way of doing it
  res.json({ success: true, data: ideas});
});

// get a single idea
// the :id is a queryparam accessed by the req object
router.get('/:id', (req, res) => {
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

// Add an idea by accepting post requests
router.post('/', (req, res) => {
  // With the data sent, we want to accept text, tag, and username
  // We are dealing with static data so we create the id ourselves, but a database creates it automatically
  const idea = {
    id: ideas.length + 1,
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,// Normally user authentication would be used but that is beyond the scope of this project
    data: new Date().toISOString().slice(0, 10)
  }
  // console.log(idea);
  ideas.push(idea);
  res.json({ sucess: true, data: idea });
})

// Update idea
router.put('/:id', (req, res) => {
  req.params.id;
  const idea = ideas.find((idea) => idea.id === +req.params.id);
  if (!idea) {
    return res.status(404).json( {success: false, error: 'Resource not found'});
  }

  idea.text = req.body.text || idea.text;
  idea.tag = req.body.tag || idea.tag;

  res.json({ success: true, data: idea });

});

// Delete an idea
router.delete('/:id', (req, res) => {
  req.params.id;
  const idea = ideas.find((idea) => idea.id === +req.params.id);
  if (!idea) {
    return res.status(404).json( {success: false, error: 'Resource not found'});
  }

  /*
    Brad wanted us to try on our own first

    This was my solution (It 100% works)

    ideas.forEach((idea) => {
      if(idea.id === +req.params.id) {
        let index = ideas.indexOf(idea);
        ideas.splice(index, 1);
      }
    })
  */

  // This was Brads solution
  const index = ideas.indexOf(idea);
  ideas.splice(index, 1);

  res.json({ success: true, data: {} });

});

// don't forget to export the router
module.exports = router;