import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EventDetails() {
  const [data, setData] = useState({
    title: " ",
    image: " ",
    date: " ",
    description: " ",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/events/${id}`, data)
    .then((res) => {
      console.log(res.data)
      navigate("/EventList")
    })
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/events/${id}`)
      .then((response) => {
        console.log("API response data:", response.data);
        setData(response.data);
      })
      .catch((error) => console.log("Error event:", error));
  }, [id]);

  return (
    <div>
      <h1 className="font-semibold flex justify-center text-2xl pt-5" >Update Details</h1>
      <div className="container mx-auto p-8">
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">
              Event Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">
              Event Date
            </label>
            <input
              id="date"
              type="date"
              name="date"
              value={data.date}
              onChange={(e) => setData({ ...data, date: e.target.value })}
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
              value={data.image}
              onChange={(e) => setData({ ...data, image: e.target.value })}
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
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
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
            Update Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default EventDetails;
