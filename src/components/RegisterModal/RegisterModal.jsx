import React, { useState } from "react";
import { Link } from "react-router-dom";
import ModalContainer from "../ModalContainer/ModalContainer";
import  "./RegisterModal.css";
import passwordIcon from "../../assets/passwordIcon.png";

const RegisterModal = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowError(false);
    setIsProcessing(true);
    try {
      const response = await fetch(
        `https://swiptory-backend-w1mb.onrender.com/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      setShowLogin(true);
    } catch (error) {
      setShowError(true);
      setErrorMessage(error.message);
      console.log(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <ModalContainer>
        {showLogin ? (
          <>
            <h1 className='formHeader'>Welcome to SwipTory!</h1>
            <p className='formHeader'>Please sign in to continue</p>
            <Link to="/?signin=true">
              <button className='signInBtn'>Sign In</button>
            </Link>
          </>
        ) : (
          <>
            <h1 className='formHeader'>Register to SwipTory</h1>
            <form className='formContainer'>
              <div>
                <label> Username</label>
                <input
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  type="text"
                  placeholder="Enter username"
                />
              </div>
              <div className='passwordContainer'>
                <label>Password</label>
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className='passwordInput'
                />
                <img
                  onClick={() => setShowPassword(!showPassword)}
                  className='passwordIcon'
                  src={passwordIcon}
                  alt="password icon"
                />
              </div>
              {showError && <div className='error'>{errorMessage}</div>}
              <div>
                <button onClick={handleSubmit}>Register</button>
              </div>
            </form>
          </>
        )}
      </ModalContainer>
    </>
  );
};

export default RegisterModal;