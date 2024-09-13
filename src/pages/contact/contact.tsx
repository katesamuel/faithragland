import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./contact.css";
import { ContactContent } from "../../assets/content/contact";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Email sent successfully!');
      } else {
        alert('Failed to send email');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error sending email');
    }
  };

  return (
    <div>
      {isSubmitted ? (
        <h3>Thank you! Your message has been sent.</h3>
      ) : (
        <div className="contact-container">
          <div className="foreword">
            <p>{ContactContent.main}</p>
            <p>{ContactContent.main2}</p>
            <p>{ContactContent.classes}</p>
            <p>{ContactContent.closing}</p>
            <p>{ContactContent.thanks}</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="user-details">
              <div className="name">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="email">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="message">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                className="message-text"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <div className="button-container">
              <button type="submit">Send</button>
            </div>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          </form>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
