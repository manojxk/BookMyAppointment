import React from 'react'
import { Link, useHistory } from "react-router-dom";

const NavBar = () => {
    const history = useHistory()
    function logout() {
        if (window.confirm("Would you like to logout?")) {
            localStorage.removeItem("token");
            localStorage.removeItem("name");
            localStorage.removeItem("role");
            localStorage.removeItem("email");

            history.push('./login')
        }
    }
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="/dashboard">
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
                        <Link class="nav-link" to="/newbooking">
                            New Booking
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/mybooking">
                            My Bookings
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

export default NavBar


