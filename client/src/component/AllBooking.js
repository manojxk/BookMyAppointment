import React, { useEffect, useState } from "react";

import "./style.css";

import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

export default function AllBooking() {
  const { register, handleSubmit, errors, watch } = useForm();
  const [bookings, setBookings] = useState([]);

  let token = localStorage.getItem("token");
  let role = localStorage.getItem("role");


  useEffect(() => {
    axios.get("https://souvik-appointment-bookingapp.herokuapp.com/userbookings/").then((res) => {
      if (res.data == 0) {
        console.log("no data");
      } else {
        console.log(res.data);
        setBookings(res.data);
      }
    });
  }, []);

  function clickDelete(id) {
    if (window.confirm("are you sure you want to delete the booking?")) {
      axios.delete("https://souvik-appointment-bookingapp.herokuapp.com/userbookings/" + id).then((res) => {
        // console.log(res.data);
        window.location.reload();
      });
    }
  }

  return (
    <>
      <AdminNavbar />

      {!token && !role ? (
        (window.location = "/AdminLogin")
      ) : (
        <div>
          <img
            class="fillpic"
            src="/pokemon.jpg"

            style={{ width: "100%", height: "auto" }}
          />
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Sr.No</th>
                <th scope="col">Booking ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            {bookings.map((booking, index) => (
              <>
                <tbody style={{ backgroundColor: ' rgba(0, 0, 0, 0.637)' }}>
                  <tr style={{ color: 'white' }}>
                    <th scope="row">{index + 1}</th>
                    <td>{booking._id}</td>
                    <td>{booking.name}</td>
                    <td>{booking.email}</td>
                    <td>{booking.date}</td>
                    <td>{booking.time}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          clickDelete(booking._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </>
            ))}
          </table>
        </div>
      )}
    </>
  );
}
