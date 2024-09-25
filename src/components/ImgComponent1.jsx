import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase'; // Firebase configuration
import '../style/ImgComponent.css';

const ImgComponent1 = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUrl2, setImageUrl2] = useState(null);
  const controls = useAnimation();

  useEffect(() => {
    // Fetch the first image
    const fetchImages = async () => {
      const imagesRef = ref(storage, 'hero-images/');
      try {
        const result = await listAll(imagesRef);
        if (result.items.length > 0) {
          const firstImageRef = result.items[2];
          const secondImageRef = result.items[3];
          const url = await getDownloadURL(firstImageRef);
          const url2 = await getDownloadURL(secondImageRef);
          setImageUrl(url);
          setImageUrl2(url2);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY > 0) {
        controls.start({
          margin: '0 10% 0rem 10%',
          borderRadius: '20px',
          transition: { duration: 1 },
          

        });
      } else {
        controls.start({
          margin: '0px',
          borderRadius: '0px',
          transition: { duration: 1 },
        });
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [controls]);

  return (
    <>
    <div className='ImgComponent'>

    <motion.div
      className={`ImgComponent1 ${imageUrl ? 'has-background' : ''}`}
      animate={controls}
    //   initial={{
        // borderRadius: '0px',
        // margin: '0px',
    //   }}
      style={{
        backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
      }}
    >
    </motion.div>

      <motion.div
      className={`ImgComponent2 ${imageUrl ? 'has-background' : ''}`}
    
      style={{
        backgroundImage: imageUrl ? `url(${imageUrl2})` : 'none',
      }}
    >
    </motion.div>

    </div>

    </>
  );
};

export default ImgComponent1;