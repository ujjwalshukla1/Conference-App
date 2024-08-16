import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import addNotification from "react-push-notification";

const Create = () => {
  const [events, setEvents] = useState([]);
  const { isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();
  
  useEffect(() => {
    axios
      .get("http://localhost:5000/events")
      .then((response) => {
        const eventsData = response.data;
        setEvents(eventsData)
        notifyTodayEvents(eventsData);
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const notifyTodayEvents = (eventsData) => {
    const now = new Date();
    const todayStart = new Date(now.setHours(0, 0, 0, 0));
    const todayEnd = new Date(now.setHours(23, 59, 59, 999));

    eventsData.forEach((event) => {
      const eventDate = new Date(event.date);
      
      if (eventDate >= todayStart && eventDate <= todayEnd) {
        addNotification({
          title: `Today's Event: ${event.title}`,
          message: `Don't miss out on "${event.title}" happening today!`,
          duration: 5000,
          native: true,
        });
      }
    });
  };

  const handleRegister = (eventId) => {
    if (!isAuthenticated) return;

    const confirm = window.confirm("Would you like to register for the event?");
    if (confirm) {
      const userData = {
        title: user.name,
        user: user.email,
        eventId,
      };

      const notify = () => {
        addNotification({
          title: "Registered for the",
          message: "Please note the date of the event",
          duration: 5000,
          native: true,
        });
      };

      axios
        .post("http://localhost:8000/users", userData)
        .then((res) => {
          console.log("User registered:", res.data);
          notify();
          navigate(`/EventDetails/${eventId}`);
        })
        .catch((error) => console.error("Error registering user:", error));
    }
  };

  return (
    <div>
      <section id="events" className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">All Events</h2>
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
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/EventDetails/${event.id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                      >
                        Learn More
                      </Link>
                      {isAuthenticated && (
                        <button
                          onClick={() => handleRegister(event.id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                          Register
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No events available</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Create;
