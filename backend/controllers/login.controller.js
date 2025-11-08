const { getAllUsers, getOneUser } = require("./user.controller");

const login = async (req, res) => {
  const { user_name, password } = req.body;
  console.log(req.body);

  try {
    const user = await getOneUser(user_name);
    console.log(user);
      if (user && user.password === password) {
        return res.status(200).json({
          message: "Login successful",
        });
      }
    return res.status(401).json({ message: "Invalid ID" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { login };
