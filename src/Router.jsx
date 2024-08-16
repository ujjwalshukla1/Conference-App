import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import EventDetails from "./pages/EventDetails";
import EventList from "./pages/EventList";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import Edit from "./pages/Edit";
import CreateEvent from "./pages/CreateEvent";
import { Auth0Provider } from "@auth0/auth0-react";
import MyEvents from "./pages/MyEvents";

const AppRouter = () => {
  return (
    <Auth0Provider
      domain="dev-2rrmbhzpfb1l1pz3.us.auth0.com"
      clientId="JoA8LFhcCKy6xEdBKYRaHUDB6xrrkFmz"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/EventDetails/:id" element={<EventDetails />} />
          <Route path="/EventList" element={<EventList />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/CreateEvent" element={<CreateEvent />} />
          <Route path="/Edit/:id" element={<Edit />} />
          <Route path="/MyEvents" element={<MyEvents />} />
        </Routes>
        <Footer />
      </Router>
    </Auth0Provider>
  );
};

export default AppRouter;
