import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';  // For making API requests

const ArtworkDetailPage = () => {
  // Get the dynamic artworkId from the URL
  const { artworkId } = useParams();
  
  // State to store the artwork data
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);  // State to handle loading
  const [error, setError] = useState(null);  // State to handle errors

  useEffect(() => {
    // Fetch the artwork data by its ID from the backend
    axios
      .get(`http://localhost:5000/images/${artworkId}`)  // Adjust the endpoint accordingly
      .then((response) => {
        setArtwork(response.data);  // Set the artwork data
        setLoading(false);  // Set loading to false once data is fetched
      })
      .catch((err) => {
        setError('Artwork not found!');  // Handle error if the artwork is not found
        setLoading(false);  // Stop loading
      });
  }, [artworkId]);

  if (loading) {
    return <p>Loading...</p>;  // Show loading message until data is fetched
  }

  if (error) {
    return <p>{error}</p>;  // Show error message if there is an issue
  }

  if (!artwork) {
    return <p>Artwork not found!</p>;  // Handle the case when artwork is not found
  }
console.log(artwork)
  return (
    <div className="bg-black text-white h-screen flex items-center justify-center">
      <div className="flex w-full h-screen">
        {/* Left side (description) */}
        <div className="w-1/3 p-8 flex flex-col justify-center bg-black text-center">
          <h1 className="text-4xl font-bold mb-4">{artwork.title}</h1>
          <p className="text-lg">{artwork.description}</p>
        </div>

        {/* Right side (image) */}
        <div className="w-2/3 flex justify-center items-center bg-cover bg-center">
          <img
            src={artwork.url}  // Use the URL from the fetched artwork data
            alt={artwork.title}
            className="w-full h-auto max-w-2xl rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetailPage;
