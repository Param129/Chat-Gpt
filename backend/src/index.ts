import { connectDB } from "./DB/connection.js";
import app from "./app.js";


const PORT = process.env.PORT || 5000;

connectDB().then(()=>{
  app.listen(PORT,()=>{
    console.log('server is started && DB is connected');
  })
}).catch((err)=>{
  console.log(err);
})






//mongodb+srv://paramtomar01:PARAMtomar123@cluster0.dis2nul.mongodb.net