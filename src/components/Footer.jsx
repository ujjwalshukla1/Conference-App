import React from "react";

function Footer() {
  return (
    <div>
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p className="mb-2">
            &copy; 2024 Event Management Inc. All rights reserved.
          </p>
          <a href="#" className="text-blue-400 hover:underline">
            Privacy Policy
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
