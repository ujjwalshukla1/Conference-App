import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-white text-lg font-bold">
          Event Management
        </a>
        
        {/* Desktop Menu */}
        <div className="hidden items-center md:flex space-x-4">
          <Link to={"/"} className="text-white px-3 font-semibold">
            Home
          </Link>
          <Link to={"/EventList"} className="text-white px-3 font-semibold">
            Event List
          </Link>
          <Link to={"/Profile"} className="text-white px-3 font-semibold">
            Profile
          </Link>
          {isAuthenticated ? (
            <>
              <button
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
                className="text-white py-2 m-0 rounded px-3 bg-gray-700 hover:bg-gray-600"
              >
                Log Out
              </button>
              <Link
                to={"/CreateEvent"}
                className="text-white py-2 ml-2 rounded px-3 bg-gray-700 hover:bg-gray-600"
              >
                + Create Event
              </Link>
              <Link
                to={"/MyEvents"}
                className="text-white py-2 ml-2 rounded px-3 bg-gray-700 hover:bg-gray-600"
              >
                My Events
              </Link>
            </>
          ) : (
            <button
              onClick={() => loginWithRedirect()}
              className="text-white py-2 m-0 rounded px-3 bg-gray-700 hover:bg-gray-600"
            >
              Log In
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={handleMenuToggle}
          className="md:hidden text-white focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-0 bg-gray-800 bg-opacity-75 z-50 transition-transform transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-end p-4">
            <button
              onClick={handleMenuToggle}
              className="text-white focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col items-center mt-8">
            <Link
              to={"/"}
              className="text-white px-3 py-2 text-lg font-semibold"
              onClick={handleMenuToggle}
            >
              Home
            </Link>
            <Link
              to={"/EventList"}
              className="text-white px-3 py-2 text-lg font-semibold"
              onClick={handleMenuToggle}
            >
              Event List
            </Link>
            <Link
              to={"/Profile"}
              className="text-white px-3 py-2 text-lg font-semibold"
              onClick={handleMenuToggle}
            >
              Profile
            </Link>
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => {
                    logout({ logoutParams: { returnTo: window.location.origin } });
                    handleMenuToggle();
                  }}
                  className="text-white px-3 py-2 text-lg font-semibold"
                >
                  Log Out
                </button>
                <Link
                  to={"/CreateEvent"}
                  className="text-white px-3 py-2 text-lg font-semibold"
                  onClick={handleMenuToggle}
                >
                  + Create Event
                </Link>
                <Link
                  to={"/MyEvents"}
                  className="text-white px-3 py-2 text-lg font-semibold"
                  onClick={handleMenuToggle}
                >
                  My Events
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  loginWithRedirect();
                  handleMenuToggle();
                }}
                className="text-white px-3 py-2 text-lg font-semibold"
              >
                Log In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
