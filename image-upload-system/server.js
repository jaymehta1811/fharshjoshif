const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cors = require('cors');
const mongoose = require('mongoose');  // Importing mongoose

// Load environment variables from .env file
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer to store images directly in Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',  // Folder in Cloudinary to store the images
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'bmp']
  }
});

const upload = multer({ storage: storage });

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log('Error connecting to MongoDB:', err);
});

// Create a schema for image and description storage
const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Image = mongoose.model('Image', imageSchema);  // Create the model

// Set up Express app
const app = express();
const port = 5000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:5173', // Allow only this origin (your frontend)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers in the request
}));

// Define the image upload route
app.post('/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  const { description } = req.body;  // Get description from the request body

  if (!description) {
    return res.status(400).send('No description provided');
  }

  // Save the Cloudinary image URL and description to MongoDB
  try {
    const newImage = new Image({
      url: req.file.path,  // Save the Cloudinary URL
      description: description  // Save the description
    });
    await newImage.save();  // Save to MongoDB

    // Send the URL of the uploaded image and the description from Cloudinary
    res.status(200).json({
      message: 'Image uploaded and URL saved successfully',
      url: req.file.path,
      description: description
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error saving the image URL and description', error: error.message });
  }
});

// Define the route to get all images
app.get('/images', async (req, res) => {
    try {
      const images = await Image.find();  // Fetch all images from the database
      res.status(200).json(images);  // Return all image data
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error fetching images', error: error.message });
    }
  });

// Route to get a specific image by ID
app.get('/images/:id', async (req, res) => {
    try {
      const image = await Image.findById(req.params.id);  // Find image by ID
      if (!image) {
        return res.status(404).json({ message: 'Image not found' });
      }
      res.json(image);  // Return image data (URL + description)
    } catch (error) {
      res.status(500).json({ message: 'Error fetching image', error: error.message });
    }
});
  
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
