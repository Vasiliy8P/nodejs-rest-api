const app = require('./app')
const mongoose = require('mongoose');

// tKDMd6CGMNjM4dpO

// DB_HOST = "mongodb+srv://vasiliy8P:tKDMd6CGMNjM4dpO@cluster0.kxphkog.mongodb.net/db-contacts?retryWrites=true&w=majority"

const {DB_HOST, PORT = 3000} = process.env

mongoose.connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");

    app.listen(PORT, () => {
      console.log("Server running. Use our API on port: 3000")
    })
  })
  .catch(error => {
    console.log(error.mesage);
    process.exit(1);
  });
