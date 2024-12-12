import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!);

        const connection = await mongoose.connection;

        connection.on('connected', () => {
            console.log('Mongoose connection established');
        });

        connection.on('error', (error) => {
            console.error('Mongoose connection error: ', error);
            process.exit();
        });
        
    } catch (error) {
        console.log("Something went wrong!", error);

    }
}