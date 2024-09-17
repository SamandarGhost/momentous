import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import app from './app';

mongoose.connect(process.env.MONGO_URL as string, {})
    .then((data) => {
        console.log("Successfully connection MongoDB");
        const PORT = process.env.PORT ?? 3072;
        app.listen(PORT, function () {
            console.info(`The server is running on port: ${PORT}`);
            console.info(`Owner project on http://localhost:${PORT}/admin \n`);

        })
    })
    .catch((err) => console.log("ERROR on connection MongoDB", err));
