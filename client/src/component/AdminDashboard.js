import "./style.css";
import { Link } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";


export default function AdminDashboard() {
  let token = localStorage.getItem("token");
  let role = localStorage.getItem("role");



  return (
    <>
      <AdminNavbar />

      {token && role ? (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <video
              src="/videos/space.mp4"
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
                Welcome {role}!!
              </h1>
              <br />
              <div style={{ textAlign: "center", color: "white" }}>
                <h3>Go check out some <Link to="/allbooking">User bookings</Link> mate!!</h3>
                <h3><i>...and come back later for some Pizza</i></h3>

              </div>

            </section>

          </div>

        </>
      ) : (
        (window.location = "/AdminLogin")
      )}
    </>
  );
}
