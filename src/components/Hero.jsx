import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase'; // Din firebase-konfiguration
import '../style/Hero.css'

function Hero() {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      const imagesRef = ref(storage, 'hero-images/'); // Path to your folder in Firebase Storage

      try {
        const result = await listAll(imagesRef); // Hämta alla bilder i mappen
        const urlPromises = result.items.map((itemRef) => getDownloadURL(itemRef)); // Hämta varje bilds URL
        const urls = await Promise.all(urlPromises);
        console.log("Fetched image URLs:", urls); // Kontrollera URL:erna här
        setImages(urls);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000); // Växlar var 5:e sekund

      return () => clearInterval(interval); // Rensa intervallet vid unmount
    }
  }, [images]);


  const navigate = useNavigate(); // Skapa en instans av navigate

  const handleButtonClick = () => {
    navigate('/medlemskap'); // Navigera till den angivna vägen
  };

  return (
    <div className="hero">
      {images.length > 0 ? (
        <img
          src={images[currentImageIndex]}
          alt="Hero background"
          className="hero-background"
        />
      ) : (
        <p>Loading...</p> // Kan visas medan bilderna laddas
      )}
      <div className="hero-content">
        <h1>Välkommen till Flatens bågskytteklubb</h1>
        <p>Bli medlem för att delta i spännade skogsäventyr & events.</p>
        <button className="hero-button" onClick={handleButtonClick}>Ansök om medlemskap</button>
      </div>
    </div>
  );
}

export default Hero;

