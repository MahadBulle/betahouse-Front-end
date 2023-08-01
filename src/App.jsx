import React from "react";
import Dashboard from "./Dashboard/Dashboard";
import { Route, Routes } from 'react-router-dom'
import  Clients  from "./components/ClientPage/Clients";
import Services from "./components/ServicesPage/Services";
import Gallery from "./components/GalleryPage/Gallery";
import Home from "./components/HomePage/Home";
import About from "./components/AboutPage/About";
import Contact from "./components/ContactPage/Contact";
import Houses from "./components/HousesPage/Houses";
import Users from "./components/UsersPage/Users";

function app() {
  return (
    <>

      {/* <Dashboard/> */}
      <Routes>

        <Route path='/' element={<h2>Login page</h2>} />

        <Route path='Dashboard' element={<Dashboard />}>
          <Route path='client' element={<Clients />} />
          <Route path='houses' element={<Houses />} />
          <Route path='services' element={<Services />} />
          <Route path='home' element={<Home />} />
          <Route path='gallery' element={<Gallery />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='users' element={<Users />} />
        </Route>

      </Routes>

    </>
  );
}

export default app;