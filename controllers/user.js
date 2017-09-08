const User = {
  login: function(req, res) {
    res.render('user/login');
  },
  signup: function(req, res) {
    res.render('user/signup');
  },
  // detail: function(req, res) {
  //   if (req.user) {                                //if user is logged in show message with username
  //     message = req.user.username;
  //   } else {
  //     message = "You did it!";                    //message if not logged in
  //   }
  //   res.json({
  //     message: message
  //   });
  // },
  //
  // create: function(req, res) {
  //   models.User.create({
  //     username: req.body.username,
  //     password: req.body.password
  //   }).then(function(user) {
  //     res.json(user);
  //   });
  // }
};

module.exports = User;
