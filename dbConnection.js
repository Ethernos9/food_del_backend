import mongoose from "mongoose";

async function connectDB (url){
  await mongoose.connect(url)
  .then(()=>console.log("DB connected Successfully"))
  .catch((error)=>console.log(error))
}

export default connectDB;