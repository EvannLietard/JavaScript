const User = require('../models/user.model').model;

module.exports.home = (_,res) => res.redirect('/user.html');

module.exports.me =
  async (req, res) =>  {
    const user = await User.findById(req.userId);
    console.log(user);
    console.log(req.userId);
    res.status(200).json({ name : user.name });
  }



