const app = require('./app');
const dotenv = require('dotenv');

//config dotenv
dotenv.config({ path: 'config/config.env' })


const port = process.env.PORT || 5000;
// console.log(process.env.PORT);

app.listen(port, () => {
   console.log('running app on port ' + port);
});
