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
            const user = generateAPIKey() ;
            const bucketName = faker.word.noun();
            let newBucket = {
                bucket_key: bucketKey,
               bucket_name: bucketName,
                attached_access: [...generateAPIKey()],
                attached_secret: [...generateAPIKey()]
            };

            // for (let j = 0; j < randomIntFromInterval(1, 6); j++) {
            //     let newEvent = {
            //         timestamp_event: faker.date.past(),
            //         weight: randomIntFromInterval(14,16),
            //     }
            //     newDay.events.push(newEvent);
            // }
            timeSeriesData.push(newDay);
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
