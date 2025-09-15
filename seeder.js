// // seeder.js
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const bcrypt = require("bcrypt");
// const User = require("./models/User");
// const connectDB = require("./config/db");

// dotenv.config();

// const users = [
//   { name: "Shreyash Khode", email: "shreyash@example.com", password: "pass123", role: "admin" },
//   { name: "Shreyas Patil", email: "patil@example.com", password: "123456", role: "user" },
//   { name: "Regular Jane", email: "jane@example.com", password: "123456", role: "user" },
// ];

// const importData = async () => {
//   try {
//     await connectDB();
//     await User.deleteMany();

//     const hashed = await Promise.all(users.map(async u => ({
//       name: u.name,
//       email: u.email,
//       role: u.role,
//       password: await bcrypt.hash(u.password, 10)
//     })));

//     await User.insertMany(hashed);
//     console.log("✅ Seeder: Data Imported");
//     process.exit();
//   } catch (err) {
//     console.error("Seeder Error:", err);
//     process.exit(1);
//   }
// };

// const destroyData = async () => {
//   try {
//     await connectDB();
//     await User.deleteMany();
//     console.log("✅ Seeder: Data Destroyed");
//     process.exit();
//   } catch (err) {
//     console.error("Seeder Error:", err);
//     process.exit(1);
//   }
// };

// if (process.argv[2] === "-d") {
//   destroyData();
// } else {
//   importData();
// }


// seeder.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected...");

    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists:", existingAdmin.email);
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASS, 10);

    const adminUser = new User({
      name: process.env.ADMIN_NAME || "Super Admin",
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
    });

    await adminUser.save();
    console.log("🎉 Admin user created:", adminUser.email);

    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding admin:", err.message);
    process.exit(1);
  }
};

seedAdmin();
