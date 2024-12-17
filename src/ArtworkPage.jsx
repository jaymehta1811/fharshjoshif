import React, { useEffect, useState } from 'react';
import axios from 'axios';  // Import Axios for API requests
import { Link } from 'react-router-dom';

const ArtworkGallery = () => {
  // State to store gallery items
  const [galleryItems, setGalleryItems] = useState([]);

  // Fetch data when the component mounts
  useEffect(() => {
    // Make the GET request to fetch images from the backend
    axios
      .get('http://localhost:5000/images')  // Adjust the backend URL as needed
      .then((response) => {
        // Set the gallery items with the fetched data
        setGalleryItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
      });
  }, []);

  return (
    <div className="bg-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-5xl font-bold text-center mb-8">MY ARTWORK GALLERY</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.length === 0 ? (
            <p>Loading images...</p>
          ) : (
            galleryItems.map((item) => (
              <Link
                to={`/${item._id}`}  // Dynamic path based on image ID
                key={item._id}  // Use MongoDB _id for unique key
                className="bg-white rounded-lg shadow-lg overflow-hidden relative block"
              >
                <img
                  src={item.url}  // Use the URL from the backend response
                  alt={`Artwork ${item._id}`}  // Dynamic alt text
                  className="w-full h-48 object-cover transition-transform duration-300 transform hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white p-4 opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100">
                  <p>Artwork {item._id}</p>  {/* Display the ID or title */}
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtworkGallery;
