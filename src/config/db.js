import { config } from "dotenv";
config()

export default {
    monodb:{
        db_uri: process.env.MONGO_DB
    }
}
