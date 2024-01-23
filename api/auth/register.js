const User = require("../../model/Users");
const router = require("../../router/authRouter");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  isEmailValid,
  isPasswordValid,
  isPhoneNumberValid,
  isRoleValid,
} = require("../../utils/check");
const verifyToken = require("../../middlewares/verifyToken");

router.get("/loggedUser", verifyToken, async (req, res) => {
  const email = req?.decoded?.email;
  console.log(email);

  const filter = { email: email };

  const user = await User.findOne(filter);
  res.send(user);
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check email
    if (!isEmailValid(email)) {
      return res.status(400).send("Invalid email address");
    }

    // Check password
    if (!isPasswordValid(password)) {
      return res.status(400).send("Invalid password");
    }

    const user = await User.findOne({ email: email });

    // check user email and password matched or not

    const comparedPass = await bcrypt.compareSync(password, user?.password);

    console.log(comparedPass);

    if (user?.email !== email || !comparedPass) {
      return res.status(401).send({ message: "Auth failed" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        // sameSite: "none",
      })
      .send(user);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { email, password, phoneNumber, role, fullName } = req.body;

    // Check email
    if (!isEmailValid(email)) {
      return res.status(400).send("Invalid email address");
    }

    // Check password
    if (!isPasswordValid(password)) {
      return res.status(400).send("Invalid password");
    }

    // Check phone number
    if (!isPhoneNumberValid(phoneNumber)) {
      return res.status(400).send("Invalid phone number");
    }

    // Check role
    if (!isRoleValid(role)) {
      return res.status(400).send("Invalid role");
    }

    const user = await User.findOne({ email: email });

    // console.log(user?.email);

    if (user?.email) {
      return res.status(400).send("User Already exists!");
    }

    let hashedPassword = await bcrypt.hashSync(password, 10);

    let newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
    newUser = await newUser.save();

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
      })
      .send(newUser);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});

module.exports = { authRouter: router };
