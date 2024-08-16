import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyEvents() {
  const [myEvent, setMyEvent] = useState([]);
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    if (isAuthenticated && user) {
      axios
        .get("http://localhost:5000/events")
        .then((response) => {
          const userEvents = response.data.filter(
            (event) => event.user === user.name
          );
          setMyEvent(userEvents);
        })
        .catch((error) => console.error("Error fetching events:", error));
    }
  }, [isAuthenticated, user]);

  const handleDelete = (id) => {
    const confirm = window.confirm("Would you like to delete ?");
    if (confirm) {
      axios
        .delete(`http://localhost:5000/events/${id}`)
        .then((res) => {
          location.reload("/MyEvents");
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div>
      <section id="events" className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Your Events</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {myEvent.length > 0 ? (
              myEvent.map((event) => (
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
                    <p className="text-gray-600 mb-4">
                      {event.description.slice(0, 50)}
                    </p>
                    <div className="flex items-center">
                      <Link
                        to={`/EventDetails/${event.id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                      >
                        Learn More
                      </Link>

                      {isAuthenticated && user && user.name === event.user && (
                        <div>
                          <Link
                            to={`/Edit/${event.id}`}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 ml-2 rounded-lg"
                          >
                            Edit
                          </Link>
                          <Link
                            onClick={(e) => handleDelete(event.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 ml-2 rounded-lg"
                          >
                            Delete
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">Create the events on create event.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default MyEvents;
