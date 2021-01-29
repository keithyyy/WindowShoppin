require('dotenv').config();
const axios = require('axios');

module.exports = function(cb){
// Make a request to currencies API to get currencies
    axios.get(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY_FIXER}/latest/USD`)
    .then(function (response) {
        console.log('Updated currency rates...');
        // handle success
        cb(response.data);
    })
    .catch(function (error) {
        // handle error
        cb({});
        console.log(error);
    })
};
