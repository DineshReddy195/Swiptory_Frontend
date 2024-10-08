import React, { useState } from "react";
import ModalContainer from "../ModalContainer/ModalContainer";
import "./SignInModal.css";
import passwordIcon from "../../assets/passwordIcon.png";

const SignInModal = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setIsProcessing(true);
    try {
      const response = await fetch(
        `https://swiptory-backend-w1mb.onrender.com/api/auth/login`,
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

      const responseData = await response.json();
      window.localStorage.setItem("token", responseData.token);
      window.localStorage.setItem("userId", responseData.userId);
      window.localStorage.setItem("username", responseData.username);
      setSuccess(true);

      setTimeout(() => {
        window.location.href = "/";
      }, 1200);
    } catch (error) {
      setError(error.message);
      console.log(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ModalContainer>
      {success ? (
        <>
          <h1 className='formHeader'>Login Successful!</h1>
        </>
      ) : (
        <>
          <h1 className='formHeader'>Login to SwipTory</h1>
          <form className='formContainer'>
            <div>
              <label>Username</label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Enter username"
              />
            </div>
            <div className='passwordContainer'>
              <label>Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
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
            {error && <div className='error'>{error}</div>}
            <div>
              <button onClick={handleSubmit}>Login</button>
            </div>
          </form>
        </>
      )}
    </ModalContainer>
  );
};

export default SignInModal;