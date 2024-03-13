// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.authenticated) {
      next(); // User is authenticated, proceed to the next middleware or route handler
    } else {
      res.status(401).json({ message: "Unauthorized" }); // User is not authenticated, send 401 Unauthorized response
    }
  };
  module.exports = isAuthenticated;