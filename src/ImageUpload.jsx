import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch images from the backend when the component mounts
    
    axios.get('http://localhost:5000/images')
      .then(response => setImages(response.data))
      .catch(error => console.error('Error fetching images:', error));
  }, []);

  const handleFileChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      return alert('Please select an image to upload');
    }

    const formData = new FormData();
    formData.append('image', selectedImage);
    formData.append('description', description);

    try {
      console.log('Uploading FormData:', formData); // Log the FormData content for debugging

      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Update the list of images with the newly uploaded one
      setImages([...images, response.data]);
      setSelectedImage(null); // Reset the selected image
      setDescription(''); // Reset the description

    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Upload Image</h1>
      
      {/* Image Upload Section */}
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl space-y-6">
        {/* Input for selecting an image */}
        <div className="flex flex-col items-center">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange}
            className="border border-gray-300 rounded-lg py-2 px-4 w-full max-w-xs text-blue-200 mb-4"
          />
          {selectedImage && (
            <div className="w-full max-w-xs">
              <img 
                src={URL.createObjectURL(selectedImage)} 
                alt="Selected preview" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>

        {/* Description Input */}
        <input
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={handleDescriptionChange}
          className="border border-gray-300 rounded-lg py-2 px-4 w-full max-w-xs text-gray-700 mb-4"
        />
        
        {/* Upload Button */}
        <button 
          onClick={handleUpload}
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Upload
        </button>
      </div>

      {/* Display uploaded images */}
      <div className="mt-12 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Uploaded Images</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <div key={image._id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img 
                src={image.url} 
                alt={image.description} 
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <p className="text-gray-700 text-sm">{image.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
