import React, { useEffect, useState } from "react";
import NavBar from './NavBar'
import "./style.css";

import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Dashboard() {
  let token = localStorage.getItem("token");
  let role = localStorage.getItem("role");
  let name = localStorage.getItem("name");
  let email = localStorage.getItem("email");



  return (
    <>
      <NavBar />

      {token && role ? (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <video
              src="/videos/space2.mp4"
              autoPlay
              loop
              muted
              style={{ width: "100%", height: "auto" }}
            />

            <section
              class="headsect"
              style={{
                marginTop: "10%",
                padding: "5px 15px",
                borderRadius: "30px",
              }}
            >
              <h1 style={{ color: "white", fontSize: "100px" }}>
                Welcome {name}
              </h1>
              <br />
              <div style={{ textAlign: "center", color: "white" }}>
                <h3>Go <Link to="/newbooking">Book an appointment</Link> bro!!</h3>
                <h3><i>or check out </i><Link to="/mybooking" i>Your Bookings</Link></h3>

              </div>
            </section>
          </div>
        </>
      ) : (
        (window.location = "/login")
      )}
    </>
  );
}
