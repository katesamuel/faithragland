import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./index.css";
import { ContactContent } from "../../../assets/content/contact";
import { EmailJS } from "../../../config/Email";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [statusMessage, setStatusMessage] = useState("");
  const [statusMessageClass, setStatusMessageClass] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    emailjs
      .sendForm(EmailJS.serviceID, EmailJS.templateID, form, EmailJS.userID)
      .then(
        (response) => {
          setStatusMessage("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" });
          setStatusMessageClass("green");
        },
        (error) => {
          setStatusMessage("Failed to send message. Please try again later.");
          setStatusMessageClass("red");
        }
      );
  };

  return (
    <div>
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
          {statusMessage && <p style={{color: `${statusMessageClass}`}}><b>{statusMessage}</b></p>}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
