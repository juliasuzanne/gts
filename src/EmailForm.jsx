import axios from "axios";
import { useState } from "react";
import "./CSS/emailform.css";
import { useRef } from "react";
import emailjs from "@emailjs/browser";

export function EmailForm() {
  const form = useRef();
  const [errors, setErrors] = useState([]);
  const [errorShow, setErrorShow] = useState(true);
  const [successMessageShow, setSuccessMessageShow] = useState(true);
  const [successMessage, setSuccessMessage] = useState([]);

  const sendEmail = (e) => {
    e.preventDefault();
    const params = new FormData(e.target);
    setErrors([]);

    emailjs
      .sendForm("service_8n7cbdl", "template_m40n1lg", form.current, {
        publicKey: "yllTUPIWKi2ZgJtsa",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          e.target.reset();
          setSuccessMessage(["E-mail sent successfully!"]);
          setSuccessMessageShow(false);
          setErrorShow(true);
          setErrors([]);
        },
        (error) => {
          console.log("FAILED...", error.text);
          setSuccessMessage([]);
          setErrorShow(false);
          setSuccessMessageShow(true);
          setErrors(["Error, please try again."]);
        }
      );
  };

  return (
    <div id="login">
      <form ref={form} onSubmit={sendEmail}>
        <div className="container">
          <div className="row">
            <div className="email-outsides">
              <h2 className="headertitle">
                Ready To Get Started? <span className="connector">Reach Out!</span>
              </h2>
            </div>
          </div>
          <div className="break2"> </div>
          <div className="row">
            <div>
              <input name="email" className="form-control" type="user_email" placeholder="E-mail" />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <input name="name" className="form-control" type="string" placeholder="First Name" />
            </div>
            <div className="col-sm-6">
              <input name="last_name" className="form-control" type="string" placeholder="Last Name" />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <textarea name="message" type="text" className="textarea" placeholder="Message"></textarea>

              {/* <input name="message" className="textarea form-control" type="text" /> */}
            </div>
          </div>
          <ul hidden={successMessageShow} className="success">
            {successMessage.map((successMessage) => (
              <li key={successMessage}>{successMessage}</li>
            ))}
          </ul>
          <ul hidden={errorShow} className="errors">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
          <div className="row">
            <button className="submitbutton btn btn-secondary mt-3 submit ">SEND</button>
          </div>
        </div>
      </form>
      <br></br>
      <br></br>

      <br></br>
    </div>
  );
}
