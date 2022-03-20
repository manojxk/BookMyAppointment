import React from 'react'
import { Link } from "react-router-dom";

const AdminNavbar = () => {
    function logout() {
        if (window.confirm("Would you like to logout?")) {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            window.location = "/AdminLogin";
        }
    }
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="/admindashboard">
                BookIt!
            </a>
            <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">

                    <li class="nav-item ">
                        <Link class="nav-link" to="/allbooking">
                            All Bookings
                        </Link>
                    </li>

                </ul>
                <button className="btn btn-danger navbar-btn ml-auto" onClick={logout}>
                    Logout
                </button>
            </div>
        </nav>
    )
}

export default AdminNavbar