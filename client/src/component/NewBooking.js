import React, { useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";
import "./style.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";
import NavBar from "./NavBar";
export default function NewBooking() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const { handleSubmit } = useForm();
  let token = localStorage.getItem("token");
  let role = localStorage.getItem("role");
  let name = localStorage.getItem("name");
  let email = localStorage.getItem("email");

  const history = useHistory()
  const onSubmit = () => {
    const newOne = new Date(date).toLocaleDateString("en-fr", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    let booking_data = {
      name: name,
      email: email,
      time: time,
      date: newOne,
      isBooked: true,
    };
    axios
      .post("https://manoj-appointment-booking.herokuapp.com/api/bookings/", booking_data)
      .then((res) => {
        alert("booking done");
        history.push('./mybooking')
      });
  };
  return (
    <>
      <NavBar />
      {!token && !role ? (
        (window.location = "/login")
      )
        : (
          <>
            <div>
              <video
                src="/videos/eduvid2.mp4"
                autoPlay
                loop
                muted
                style={{ width: "100%", height: "auto" }}
              />
              <div className="register " class="registerback">
                <div
                  className="register_container shadow"
                  class="colorbox"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <form onSubmit={handleSubmit(onSubmit)} class=" newrow">
                    <h3 class="section-header">Book Appointment</h3>
                    <br />
                    <div class=" indv">
                      <div
                        class="input-group"
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <span class="input-group-addon">
                          <i class="fa fa-user fa" aria-hidden="true"></i>
                        </span>
                        <DatePicker onChange={setDate} required value={date} />
                      </div>
                    </div>
                    <div class="indv">
                      <div
                        class="input-group"
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <span class="input-group-addon">
                          <i class="fa fa-lock fa" aria-hidden="true"></i>
                        </span>
                        <TimePicker onChange={setTime} value={time} />
                      </div>
                    </div>
                    <br></br>
                    <div class="coolone">
                      <button className="btn btn-success btn-md" type="submit">
                        Book
                      </button>
                    </div>
                    <p style={{ color: "lightgray" }}>
                      Made by Manoj in 2022
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
    </>
  );
}
