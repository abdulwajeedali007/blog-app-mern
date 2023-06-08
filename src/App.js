import { Container, Row } from "react-bootstrap";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { HiViewGridAdd, HiOutlineUser } from "react-icons/hi";
import { BsCardHeading } from "react-icons/bs";
import { TiThMenuOutline } from "react-icons/ti";
import { RiLoginCircleLine, RiLogoutCircleLine } from "react-icons/ri";
import { SiGnuprivacyguard, SiPlatformdotsh } from "react-icons/si";

import { ToastContainer } from "react-toastify";
import "./App.scss";
import Home from "./Pages/Home";
import AddPost from "./Pages/AddPost.jsx";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Myblogs from "./Pages/Myblogs";
import { useLogout } from "./Hooks/useLogout";
import { useAuthContext } from "./Context/AuthContext";
import { useState } from "react";
function App() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [activeClass, setActiveClass] = useState(false);

  return (
    <>
      <section className="nav_bar sticky-top z-3 mb-4">
        <Container>
          <Row>
            <nav className="navbar navbar-expand-lg bg-body-tertiary p-0">
              <div className="container-fluid">
                <Link to="/" className="navbar-brand d-flex align-items-center">
                  <SiPlatformdotsh className="text-white icon_logo" />
                  <h1 className="logo m-0 mx-1">W.</h1>
                </Link>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  onClick={() => setActiveClass(!activeClass)}
                >
                  <TiThMenuOutline />
                </button>
                <div
                  className={activeClass ? "mobile_view active" : "mobile_view"}
                >
                  <ul className="navbar-nav  mb-2 mb-lg-0">
                    {user && (
                      <>
                        <li
                          className="nav-item"
                          onClick={() => setActiveClass(!activeClass)}
                        >
                          <Link
                            className="nav-link add_post  text-white d-flex align-items-center justify-content-around"
                            to="/"
                          >
                            All Blogs <BsCardHeading className="add_icon" />
                          </Link>
                        </li>
                        <li
                          className="nav-item"
                          onClick={() => setActiveClass(!activeClass)}
                        >
                          <Link
                            to="/add"
                            className="nav-link text-white add_post d-flex align-items-center justify-content-around"
                          >
                            Add Blog <HiViewGridAdd className="add_icon" />
                          </Link>
                        </li>
                        <li
                          className="nav-item"
                          onClick={() => setActiveClass(!activeClass)}
                        >
                          <Link
                            to="/myblogs"
                            className="nav-link text-white add_post d-flex align-items-center justify-content-around"
                          >
                            My Blogs <HiOutlineUser className="add_icon" />
                          </Link>
                        </li>
                        <li
                          className="nav-item logout-item"
                          title="Logout"
                          onClick={() => {
                            logout();
                            setActiveClass(!activeClass);
                          }}
                        >
                          <Link
                            // to="/add"
                            className="nav-link text-white add_post d-flex align-items-center justify-content-around"
                            onClick={() => setActiveClass(!activeClass)}
                          >
                            <p className="m-0 p-0 text-white">
                              {user.email.split("@")[0]}
                            </p>{" "}
                            <RiLogoutCircleLine className="add_icon" />
                          </Link>
                        </li>
                      </>
                    )}
                    {!user && (
                      <>
                        <li
                          className="nav-item"
                          onClick={() => setActiveClass(!activeClass)}
                        >
                          <Link
                            to="/login"
                            className="nav-link text-white add_post d-flex align-items-center justify-content-around"
                          >
                            Login <RiLoginCircleLine className="add_icon" />
                          </Link>
                        </li>
                        <li
                          className="nav-item"
                          onClick={() => setActiveClass(!activeClass)}
                        >
                          <Link
                            to="/signup"
                            className="nav-link text-white add_post d-flex align-items-center justify-content-around"
                          >
                            Signup <SiGnuprivacyguard className="add_icon" />
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </nav>
          </Row>
        </Container>
        <ToastContainer />
      </section>
      <Container>
        <Routes>
          <Route path="/" element={!user ? <Login /> : <Home />} />
          <Route
            path="/add"
            element={user ? <AddPost /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <Signup />}
          />
          <Route
            path="/myblogs"
            element={user ? <Myblogs /> : <Navigate to="/login" />}
          />
        </Routes>

        {/* <Row className="App-header">
        <Col>
          {" "}
          <h1 className="heading_01">Working fine our here</h1>
          <h1 className="heading_02">Somthing is better than noth</h1>
          <p style={{ fontSize: "14px", fontWeight: "normal" }}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat
            maxime ex obcaecati iure voluptatum nihil eum eius et quas officiis
            id cupiditate veritatis sequi esse, aspernatur reiciendis quo nobis
            non.
          </p>
          <button className="button_dark">Somthing</button>
          <button className="button_secondary">Somthing</button>
        </Col>
      </Row> */}
      </Container>
    </>
  );
}

export default App;
