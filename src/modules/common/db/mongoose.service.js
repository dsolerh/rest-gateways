const mongoose = require("mongoose");
const { sleep } = require("../sleep");
let count = 0;

const options = {
  autoIndex: false, // Don't build indexes
  // poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  // bufferMaxEntries: 0,
  // all other approaches are now deprecated by MongoDB:
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/**
 *
 * @returns {Promise<mongoose>}
 */
async function getMongoose(
  connectionString = process.env.MONGOOSE_CONN ||
    "mongodb://localhost:27017/rest-tutorial"
) {
  try {
    return await mongoose.connect(connectionString, options);
  } catch (error) {
    console.error(error);
    await sleep(5000);
    await getMongoose(connectionString);
  } finally {
    count++;
  }
}

module.exports = getMongoose;
