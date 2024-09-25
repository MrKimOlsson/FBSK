import React from 'react'
import Hero from '../components/Hero'
import { FadeInBox, SlideInBox} from '../components/FramerMotion'
import '../style/HomePage.css'
import '../index.css'

import Register from '../components/Register'
import PostComponent from '../components/PostComponent'
import InfoComponent from '../components/InfoComponent'


const Home = () => {
  return (
    <>
   <Hero
      imageIndex={2} // Fetches the first image from the Firebase storage
      heading="Välkommen till Flatens bågskytteklubb"
      text="En oas för skogsälskande bågskyttar"
    />
    <SlideInBox> 
      <FadeInBox>
        <div className='pusher'></div>
        {/* <div>
          <h2 className='home-content'>Importera inlägg från Facebook grupp</h2> 

        </div> */}

        {/* <PostComponent /> */}
        <InfoComponent />
      
        {/* <Register /> */}
      </FadeInBox>
    </SlideInBox> 
    </>

  )
}

export default Home