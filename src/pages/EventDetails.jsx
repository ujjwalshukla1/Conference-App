import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

function EventDetails() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const { id } = useParams();

  useMemo(() => {
    axios
      .get(`http://localhost:5000/events/${id}`)
      .then((response) => {
        console.log("API response data:", response.data);
        setData(response.data);
      })
      .catch((error) => console.log("Error event:", error));
  }, [id]);

  useMemo(() => {
    axios
      .get(`http://localhost:8000/users?eventId=${id}`)
      .then((response) => {
        console.log("API response data:", response.data);
        setUser(response.data);
      })
      .catch((error) => console.log("Error event:", error));
  }, [id]);

  return (
    <div className="p-4 ">
      <h1 className="font-semibold text-2xl flex justify-center">
        Details of event
      </h1>
      <div key={data.id} className="p-4">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-52 rounded-lg object-cover"
        />
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 flex justify-center">
            {data.title}
          </h3>
          <p className="text-gray-700 mb-4 flex justify-center">
            Date: {data.date}
          </p>
          <p className="flex justify-center">{data.description}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Registered Users</h2>
          {user.length > 0 ? (
            <ul>
              {user.map((user) => (
                <li key={user.id} className="mb-2">
                  {user.title}
                </li>
              ))}
            </ul>
          ) : (
            <p>No users registered for this event.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
