const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000;
require('dotenv').config()

//middleware here
app.use(express.json());
app.use(cors())



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// replace username(${process.env.DB_USER}) and password(${process.env.DB_PASSWORD}) here
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@jobportal.in6vycf.mongodb.net/?retryWrites=true&w=majority&appName=JobPortal`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        //Create database
        const db = client.db("JobPortal");
        const jobsCollection = db.collection("Jobs");
        const jobApplicationsCollection = db.collection("JobApplications");

        // post a job
        app.post("/post-job", async (req, res) => {
            const body = req.body;
            body.createdAt = new Date();
            // console.log(body);
            const result = await jobsCollection.insertOne(body);
            if (result.insertedId) {
                return res.status(200).send(result);
            } else {
                return res.status(404).send({
                    message: "can not insert try again leter",
                    status: false,
                });
            }
        });

        //Get all jobs 
        app.get("/all-jobs", async (req, res) => {
            const jobs = await jobsCollection.find({}).sort({ createdAt: -1 }).toArray();
            res.send(jobs);
        });

        // get single job using id
        app.get("/all-jobs/:id", async (req, res) => {
            // console.log(req.params.id);
            const jobs = await jobsCollection.findOne({
                _id: new ObjectId(req.params.id),
            });
            res.send(jobs);
        });

        // get jobs based on email for my job listing 
        app.get("/myJobs/:email", async (req, res) => {
            const jobs = await jobsCollection.find({ postedBy: req.params.email, }).toArray();
            res.send(jobs);
        });

        // delete a job
        app.delete("/job/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await jobsCollection.deleteOne(filter);
            res.send(result);
        })

        // updata a job
        app.patch("/update-job/:id", async (req, res) => {
            const id = req.params.id;
            const jobData = req.body;
            // console.log(body);
            const filter = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: {
                    ...jobData
                },
            };
            const options = { upsert: true };
            const result = await jobsCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        });

        // Route to handle job applications
        app.post("/apply-job", async (req, res) => {
            const { jobId, resumeUrl, applicantEmail} = req.body;
            const application = {
                jobId: new ObjectId(jobId),
                resumeUrl,
                applicantEmail,
                appliedAt: new Date(),
            };
            const result = await jobApplicationsCollection.insertOne(application);
            if (result.insertedId) {
                res.status(200).send({ message: "Application submitted successfully", status: true });
            } else {
                res.status(500).send({ message: "Failed to submit application", status: false });
            }
        });

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
})