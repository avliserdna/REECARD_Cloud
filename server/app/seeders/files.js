/* mySeedScript.js */

// require the necessary libraries
const faker = require("faker");
const MongoClient = require("mongodb").MongoClient;

// function randomIntFromInterval(min, max) { // min and max included
//     return Math.floor(Math.random() * (max - min + 1) + min);
// }

async function seedDB() {
    // Connection URL
    const uri = process.env.uri;

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
    });

    try {
        await client.connect();
        console.log("Connected correctly to server");

        const collection = client.db("db").collection("buckets");

        // The drop() command destroys all data from a collection.
        // Make sure you run it against proper database and collection.
        collection.drop();

        // make a bunch of time series data
        let timeSeriesData = [];

        for (let i = 0; i < 5000; i++) {
            const bucketKey = generateAPIKey();
            const fileName = faker.word.noun();
            const fileType = `${faker.word.noun()}.png`
            let newFile = {
                bucket_key: bucketKey,
               file_key: fileName,
               file_type: fileType
            };

            timeSeriesData.push(newFile);
        }
        collection.insertMany(timeSeriesData);

        console.log("Database seeded! :)");
        client.close();
    } catch (err) {
        console.log(err.stack);
    }
}
function generateAPIKey() {
    const apiKeyLength = 23; // You can adjust the length as needed
    const apiKey = crypto.randomBytes(apiKeyLength).toString('hex');
    return apiKey;
  }
seedDB();
