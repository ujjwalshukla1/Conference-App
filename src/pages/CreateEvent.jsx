import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate, useSubmit } from "react-router-dom";
import { useAuth0} from "@auth0/auth0-react";
import addNotification from "react-push-notification";


function CreateEvent() {
  const [event, setEvent] = useState({
    title: " ",
    date: " ",
    image: " ",
    description: " ",
    user: " ",
  });
  const { isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();

  useMemo(() => {
    if (isAuthenticated && user) {
      setEvent((prevEvent) => ({ ...prevEvent, user: user.name }));
    }
  }, [isAuthenticated, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    {
      axios
        .post("http://localhost:5000/events", event)
        .then((response) => {
          console.log(response);
          navigate("/EventList");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Create a New Event</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isAuthenticated && user && (
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">User</label>
            <input
              name="user"
              value={user.name}
              readOnly
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Event Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            onChange={(e) => setEvent({ ...event, title: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Event Date</label>
          <input
            id="date"
            type="date"
            name="date"
            onChange={(e) => setEvent({ ...event, date: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">
            Event Image URL
          </label>
          <input
            id="image"
            type="text"
            name="image"
            onChange={(e) => setEvent({ ...event, image: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">
            Event Description
          </label>
          <textarea
            id="description"
            name="description"
            onChange={(e) =>
              setEvent({ ...event, description: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded"
            rows="5"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
         Create Event
        </button>
      </form>
    </div>
  );
}

export default CreateEvent;
