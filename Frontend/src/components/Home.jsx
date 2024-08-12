import { Image } from "./image";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Home = (props) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post('/logout', {}, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true // This is important for sending cookies with the request
      });

      if (response.status === 200) {
        // Clear any session storage or cookies related to user authentication
        sessionStorage.clear();
        console.log("User logged out");
        // Redirect to the login page or home page
        navigate("/");
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleDownload = async () => {
    const username = sessionStorage.getItem('username'); // Retrieve the username from session storage
    if (!username) {
      console.error("No username found in session storage");
      return;
    }

    try {
      const response = await axios.get(`/download/${username}`, {
        responseType: 'blob', // Important for handling file downloads
        withCredentials: true // This is important for sending cookies with the request
      });

      // Create a URL for the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${username}_file.txt`); // Set the file name including username
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const handleNavigateToScreenshots = () => {
    navigate("/display-screenshots");
  };

  return (
    <div id="portfolio" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Home Page</h2>
          <p>
          </p>
          <div className="btn-container">
            <button onClick={handleLogout} className="btn btn-primary">
              Logout
            </button>
            <button onClick={handleDownload} className="btn btn-secondary">
              Download File
            </button>
            <button onClick={handleNavigateToScreenshots} className="btn btn-tertiary">
              Display Screenshots
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

