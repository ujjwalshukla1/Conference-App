import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("/data/events.json")
      .then((response) => setEvents(response.data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  return (
    <div>
      <section id="events" className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Upcoming Events
          </h2>
          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {events.length > 0 ? (
                events.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white shadow-lg rounded-lg overflow-hidden"
                  >
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-700 mb-4">Date: {event.date}</p>
                      <p className="text-gray-600 mb-4">{event.description}</p>
                      <Link
                        to={`/`}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center">No events available</p>
              )}
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Home;
