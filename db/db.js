const mongoose = require('mongoose');

module.exports.connectToMongoDB = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect('mongodb://localhost:27017').then(
        () => {
        console.log('connect to BD');
        }
    ).catch(
        (error) => {
            console.log(error.message);
        }
    )
};   