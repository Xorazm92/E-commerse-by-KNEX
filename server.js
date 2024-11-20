import { connect } from 'mongoose'
import app from './src/app.js'
import { config } from './src/config/index.js'
import { logger } from './src/utils/index.js'

// console.log(config.monodb.db_uri);
const mongo_uri = config.monodb.db_uri
const bootstrap = async () => {
    try {
        await connect(mongo_uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          })
        logger.info("connect to mongo");
        app.listen(config.app.port, () => {
            
            logger.info(`server running on port: ${config.app.port}`)
        })
    } catch (error) {
        console.log(error);
        
        logger.error(error)
    }
}


bootstrap()