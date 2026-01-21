const express = require("express");
const dotenv = require("dotenv");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const url = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;
const client = new MongoClient(url);

// GET all passwords
app.get("/", async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection("passwords");
    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// SAVE password
app.post("/", async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection("passwords");
    const result = await collection.insertOne(req.body);
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ error: "Failed to save password" });
  }
});

// DELETE password by ID
app.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const db = client.db(dbName);
    const collection = db.collection("passwords");

    const result = await collection.deleteOne({
      _id: new ObjectId(id),
    });

    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

// Start server safely
async function startServer() {
  try {
    await client.connect();
    console.log("✅ MongoDB connected");

    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("❌ Mongo connection failed", err);
  }
}

startServer();
