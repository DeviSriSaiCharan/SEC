import mongoose from "mongoose"


const connecttoMongo=async ()=>{

    try{
          await mongoose.connect(process.env.MONGO_DB_URL);
          console.log("database connected succefully");
    }catch(err){
        console.log("error connecting to db",err);
    }
}

export default connecttoMongo;

//useNewUrlParser
//useUnifiedTopology

