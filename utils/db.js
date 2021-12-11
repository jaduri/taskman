import mongoose from "mongoose";

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("connected to DB");
    connection.isConnected = db.connections[0].readyState;
  } catch (err) {
    console.log(err.message);
  }
}

export default dbConnect;
