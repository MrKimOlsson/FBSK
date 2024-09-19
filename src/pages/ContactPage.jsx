import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { FadeInBox, SlideInBox} from '../components/FramerMotion'

import '../style/ContactPage.css'; // Adjust the path as needed

const ContactPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send('your_service_id', 'your_template_id', form, 'your_user_id')
      .then((response) => {
        console.log('Success:', response);
        setStatus('Tack! Ditt meddelande har skickats.');
        setForm({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      }, (error) => {
        console.error('Error:', error);
        setStatus('Något gick fel, försök igen.');
      });
  };

  return (

    <SlideInBox> 
      <FadeInBox>
        <div>
          <h1>Kontakta oss</h1>
          <p>Telefon: 073-781 38 75</p>
          <p>E-post: <a href="mailto:flatensbagskytteklubb@gmail.com">flatensbagskytteklubb@gmail.com</a></p>

          <form onSubmit={handleSubmit}>
            <label>
              Ditt namn:
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Din e-postadress:
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Ditt telefonnummer:
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </label>
            <label>
              Ditt meddelande:
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
              ></textarea>
            </label>
            <button type="submit">Skicka</button>
          </form>
          
          {status && <p>{status}</p>}
        </div>
        
    </FadeInBox>
  </SlideInBox> 
  );
};

export default ContactPage;
