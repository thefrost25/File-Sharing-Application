import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const DBConnection = async () => {
    const PASSWORD = process.env.DB_PASSWORD;

    const MONGO_URI = `mongodb+srv://group2:${PASSWORD}@filesharingdata.piuam.mongodb.net/?retryWrites=true&w=majority&appName=FileSharingData`;
    try {
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true });
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting with the database ', error.message);
    }
}

export default DBConnection;