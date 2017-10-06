const User = require('../../db/user');
const Song = require('../../db/song');

//Table of Contents
//FetchAllUsers       -       fetch all users from users collection and send to client
//NewUserSignUp       -       Creates a new user in the database

exports.FetchAllUsers = (req,res) => {
  User.find({})
  .then((users) => {
    res.json(users);
  })
  .catch((err) => {
    res.status(400).send(err);
  });
};

exports.NewUserSignUp = (req, res) => {
  var newUser = new User({
    name: req.body.username
  });

  User.findOne({name: req.body.username})
  .then((user) => {
    if (!user) {
      newUser.save()
      .then((response) => {
        req.session.username = req.body.username;
        res.status(201).send('Registered: ' + req.body.username);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
    } else {
      res.status(400).send('User already exist!');
    }
  });
}