function logout(req, res) {
  // Destroy session to log out user
  req.session.destroy();
  res.status(200).json({ message: "Logout successful" });
}

module.exports = logout;
