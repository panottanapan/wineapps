const User = require('../models/User');

exports.signup = async (req, res) => {
  const { fullName, email, password, dob } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({ error: 'Please fill in all required fields.' });
  }
  try {
    const newUser = new User({ fullName, email, password, dob });
    await newUser.save();
    res.json({ message: 'User registered successfully!', userId: newUser._id });
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ error: 'This email is already registered.' });
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ error: 'Invalid email or password.' });
    res.json({
      message: 'Login successful!',
      user: { id: user._id, fullName: user.fullName, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};