import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase'; // Firebase configuration
import '../style/Hero.css';

function Hero() {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [transitionClass, setTransitionClass] = useState('fade-in');

  useEffect(() => {
    const fetchImages = async () => {
      const imagesRef = ref(storage, 'hero-images/');
      try {
        const result = await listAll(imagesRef);
        const urlPromises = result.items.map((itemRef) => getDownloadURL(itemRef));
        const urls = await Promise.all(urlPromises);
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
        setTransitionClass('fade-out'); // Start fading out the current image
        
        setTimeout(() => {
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
          setNextImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Update next image index
          setTransitionClass('fade-in'); // Start fading in the new image
        }, 1000); // Match transition duration for fade-out

      }, 5000); // Change image every 5 seconds

      return () => clearInterval(interval); // Clean up interval on unmount
    }
  }, [images]);

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/medlemskap');
  };

  return (
    <div className="hero">
      {images.length > 0 ? (
        <>
          <img
            src={images[nextImageIndex]}
            alt="Next hero background"
            className={`hero-background next ${transitionClass}`} // Apply transition class
          />
          <img
            src={images[currentImageIndex]}
            alt="Current hero background"
            className={`hero-background current ${transitionClass}`} // Apply transition class
          />
        </>
      ) : (
        <div className='center-container'>
          <p>Loading...</p>
        </div>
      )}
      <div className="hero-overlay"></div> {/* Adjust or remove if causing issues */}
      <div className="hero-content">
        <h1>Välkommen till Flatens bågskytteklubb</h1>
        <p>Bli medlem för att delta i spännande skogsäventyr & events.</p>
        <button className="hero-button" onClick={handleButtonClick}>Ansök om medlemskap</button>
      </div>
    </div>
  );
}

export default Hero;





// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ref, listAll, getDownloadURL } from 'firebase/storage';
// import { storage } from '../firebase'; // Firebase configuration
// import '../style/Hero.css';

// function Hero() {
//   const [images, setImages] = useState([]);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [fadeClass, setFadeClass] = useState('visible');
  
//   useEffect(() => {
//     const fetchImages = async () => {
//       const imagesRef = ref(storage, 'hero-images/');

//       try {
//         const result = await listAll(imagesRef);
//         const urlPromises = result.items.map((itemRef) => getDownloadURL(itemRef));
//         const urls = await Promise.all(urlPromises);
//         setImages(urls);
//       } catch (error) {
//         console.error("Error fetching images:", error);
//       }
//     };

//     fetchImages();
//   }, []);

//   useEffect(() => {
//     let fadeTimeout;
//     let interval;

//     if (images.length > 0) {
//       interval = setInterval(() => {
//         setFadeClass('hidden'); // Fade out current image
        
//         fadeTimeout = setTimeout(() => {
//           setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//           setFadeClass('visible'); // Fade in the new image
//         }, 2500); // Wait for fade-out to complete
//       }, 5000); // Change image every 5 seconds
//     }

//     return () => {
//       clearInterval(interval);  // Clean up interval on unmount
//       clearTimeout(fadeTimeout); // Clean up timeout on unmount
//     };
//   }, [images]);

//   const navigate = useNavigate();

//   const handleButtonClick = () => {
//     navigate('/medlemskap');
//   };

//   return (
//     <div className="hero">
//       {images.length > 0 ? (
//         <img
//           src={images[currentImageIndex]}
//           alt="Hero background"
//           className={`hero-background ${fadeClass}`} // Apply visible/hidden class
//         />
//       ) : (
//         <div className='center-container'>
//           <p>Loading...</p>
//         </div>
//       )}
//       <div className="hero-overlay"></div> {/* Dark overlay */}
//       <div className="hero-content">
//         <h1>Välkommen till Flatens bågskytteklubb</h1>
//         <p>Bli medlem för att delta i spännande skogsäventyr & events.</p>
//         <button className="hero-button" onClick={handleButtonClick}>Ansök om medlemskap</button>
//       </div>
//     </div>
//   );
// }

// export default Hero;
