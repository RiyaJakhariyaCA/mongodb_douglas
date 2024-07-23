const mongoose = require('mongoose');

const express = require('express')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require('dotenv').config();

// Connect to MongoDB


const port = process.env.PORT || 3000;

// Define a schema and model for your documents


app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html")
});

app.post('/', async (req, res) => {
  try {
    const  myuri  = req.body.myuri;

    // Connect to MongoDB using the provided URI
    await mongoose.connect(myuri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Define a schema and model for your documents
    const Schema = mongoose.Schema;
    const DocumentSchema = new Schema({
      // Define your schema fields here
      studName: String,
      studId: String,
    });

    const Document = mongoose.model('s24students', DocumentSchema);

    // Example: Adding a document to the database
    const newDocument = new Document({
      studName: 'Riya Jakhariya',
      studId: '300391713',
    });

    await newDocument.save();
    console.log('Document added to MongoDB');
  res.send(`<h1>Document  Added</h1>`);
} catch (error) {
  console.error('Error adding student:', error);
  res.status(500).send('Error adding student');
}
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
