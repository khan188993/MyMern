const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
//config dotenv
dotenv.config({ path: 'backend/config/config.env' })

//connect to database
connectDB();


const port = process.env.PORT || 5000;
// console.log(process.env.PORT);

app.listen(port, () => {
   console.log('running app on port ' + port);
});
