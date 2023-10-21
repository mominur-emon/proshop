const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Admin User",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Emon",
    email: "emon@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    name: "Rifat Ahmed",
    email: "rifat@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];

module.exports = users;
