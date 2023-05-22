const app = require('./app')

const mongoose = require("mongoose");

// 2WG9WNzzmb5dbCHL

const DB_HOST = "mongodb+srv://Vasiliy:2WG9WNzzmb5dbCHL@cluster0.zxzunjg.mongodb.net/contacts_list?retryWrites=true&w=majority";

mongoose.connect(DB_HOST)
  .then(() => {
    console.log("Database connect success");
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000")
    });
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });


