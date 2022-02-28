const mongoose = require("mongoose");

exports.createConnection = (done) => {
  mongoose.connect(
    "mongodb://localhost:27017/GatewayTest",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done()
  );
};
exports.closeConnection = (done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
};
