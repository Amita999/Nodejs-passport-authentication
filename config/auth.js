
module.exports = {
    auth: function(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      //res.send('Please log in to view that resource');
      res.redirect('/users/login');
    },
    forwardAuthenticated: function(req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect('/dashboard');      
    }
  };