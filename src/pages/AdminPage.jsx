import React from 'react'
import Register from '../components/Register'
import { FadeInBox, SlideInBox} from '../components/FramerMotion'


const AdminPage = () => {
  return (
    <>
    <SlideInBox> 
      <FadeInBox>
        <Register />
      </FadeInBox>
    </SlideInBox> 
    </>
  )
}

export default AdminPage