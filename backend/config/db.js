const mongoose = require("mongoose");
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const conn = async () => {
  try {
    const dbConn = await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@cluster0momentixdb.vj4jmrv.mongodb.net/`
    );
    console.log("Conexão realizada com sucesso!");

    return dbConn;
  } catch (error) {
    console.log(error.message);
  }
};

conn();
module.exports = conn;
