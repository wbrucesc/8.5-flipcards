const User = {
  login: function(req, res){
    res.render('user/login');
  },
  signup: function(req, res){
    res.render('user/signup');
  }
};

module.exports = User; 
