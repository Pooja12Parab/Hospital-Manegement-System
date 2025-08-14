import React, { useState } from "react";
import axios from "axios";
import "./Contactpage.css";

const Contactpage = () => {
  const [contactdetails, setContactdetails] = useState({
    name: "",
    email: "",
    message: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setContactdetails({ ...contactdetails, [name]: value });
  };

  const handleSubmit = async () => {
    console.log("Contact Details:", contactdetails);
    try {
      const response = await axios.post(
        "http://localhost:8000/add-contact",
        contactdetails
      );
      console.log("Message sent successfully:", response.data);
      alert("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="contact-container">
      <div className="headerimg">
        <div className="dpage">Contact</div>
      </div>
      <div className="contact-info">
        <div className="cinfo">
          <h1>Get in touch</h1>
          <p>
            This is Herman Brooks. Herman is just like the rest of us. Every day
            he has to make all kinds of decisions like what to wear, whom to
            date, and when to panic.
          </p>
          <p>
            Now, these decisions should be easy, but if you take a look inside
            Herman’s head, you’ll see why he sometimes has trouble making up his
            mind. Sometimes they agree… usually they don’t. But the struggle is
            going on inside all of us, and it’s all going on inside Herman’s
            head.
          </p>
          <div className="cinfo2">
            <h1>
              CONTACT<span> INFO</span>
            </h1>
            <p> info@hospitalplus.com</p>
            <p> +91 98765 43210</p>
            
          </div>
        </div>

        <div className="contact-form">
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" onChange={onChangeHandler} />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" onChange={onChangeHandler} />
          </div>

          <div className="input-group">
            <label htmlFor="message">Message</label>
            <textarea name="message" onChange={onChangeHandler}></textarea>
          </div>

          <button type="submit" className="cformbtn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>

      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27272.68253523636!2d72.845704!3d19.23177445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b128b333e163%3A0x985640540577af7e!2sBorivali%2C%20Mumbai%2C%20Maharashtra!5e1!3m2!1sen!2sin!4v1739374631551!5m2!1sen!2sin"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Contactpage;
