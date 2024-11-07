import mongoose from "mongoose";

export default async function connectToMongoDB(){

    try {
        
        const db = await mongoose.connect("mongodb+srv://adamevanswork1:WHWK6GXRs3QN7IRM@cluster0.sfvqz.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0");

        console.log("Connected to the database " + db.connection.host);

    } catch (error) {
        console.log("unable to connect to the database.");
        process.exit(1);
    }


}

//WHWK6GXRs3QN7IRM