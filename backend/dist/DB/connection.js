import { connect, disconnect } from "mongoose";
async function connectDB() {
    try {
        await connect(process.env.MONGO_URL);
        console.log("DB connected");
    }
    catch (err) {
        console.log(err);
        throw new Error("cannot connect to MONGODB");
    }
}
async function disconnectDB() {
    try {
        await disconnect();
        console.log("DB disconencted");
    }
    catch (err) {
        console.log(err);
        throw new Error("cannot connect to MONGODB");
    }
}
export { connectDB, disconnectDB };
//# sourceMappingURL=connection.js.map