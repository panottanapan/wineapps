const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://s6807012660149_db_user:s6807012660149_db_user@cluster0.uttbozp.mongodb.net/?appName=Cluster0';
    await mongoose.connect(MONGO_URI);
    console.log(' Connected to MongoDB Atlas successfully!');
  } catch (err) {
    console.error(' MongoDB Connection Error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;