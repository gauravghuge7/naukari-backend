
import { connectDB } from './database/db.js';
import dotenv from 'dotenv';
import server from './NodeServer/socket.js';


dotenv.config(
   {
      path: "./.env"
   }
)







const PORT = process.env.PORT || 5000;

// step 1: connect to the database
// step 2: listen the app on port Process.env.PORT

connectDB()
.then(() => {
   server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}
            check Server Here => http://localhost:${PORT}   
      `);
   })
})
.catch((error) => {
   console.log("Error while Starting the Express Server",error)
   process.exit(1)   
})
