import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigation } from './components/navigation';
import { Header } from './components/header';
import { Features } from './components/features';
import { About } from './components/about';
import { Services } from './components/services';
import { Gallery } from './components/gallery';
import { Testimonials } from './components/testimonials';
import { Team } from './components/Team';
import { Contact } from './components/contact';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import { Home } from './components/Home';
import JsonData from './data/data.json';
import SmoothScroll from 'smooth-scroll';
import { AuthProvider } from './components/AuthContext';
import IsProtected from './components/IsProtected';
import DisplayScreenshots from './components/DisplayScreenshots';
import './App.css';

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});

  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div>
          <Navigation />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header data={landingPageData.Header} />
                  <Features data={landingPageData.Features} />
                  <About data={landingPageData.About} />
                  {/* <Services data={landingPageData.Services} />
                  <Gallery data={landingPageData.Gallery} />
                  <Testimonials data={landingPageData.Testimonials} />
                  <Team data={landingPageData.Team} /> */}
                  <Contact data={landingPageData.Contact} />
                </>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/home"
              element={
                <IsProtected>
                  <Home />
                </IsProtected>
              }
            />
            <Route
              path="/display-screenshots"
              element={
                <IsProtected>
                  <DisplayScreenshots />
                </IsProtected>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
