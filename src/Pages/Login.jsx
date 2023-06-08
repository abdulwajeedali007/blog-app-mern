import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLogin } from "../Hooks/useLogin";
import { useNavigate, Link } from "react-router-dom";
import loginBanner from "../Images/first.jpg";
function Login() {
  const [loginUser, setLoginUser] = useState({ email: "", password: "" });
  const { login, error, loading } = useLogin();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    login(loginUser);
    loginUser.email = "";
    loginUser.password = "";
    if (error === null || error) {
      return;
    } else {
      navigate("/");
    }
  };

  return (
    <section className="login" style={{ height: "700px" }}>
      <Container className="h-100">
        <Row className="align-items-center justify-content-center h-100">
          <Col lg={8} className="bg-white rounded-3 overflow-hidden">
            <Row className="align-items-center justify-content-center h-100">
              <Col className="ms-4 me-4 px-0 py-3">
                <h2 className=" fw-bold mb-3">Login</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={loginUser.email}
                      id="floatingInput"
                      placeholder="name@example.com"
                      onChange={(e) =>
                        setLoginUser({
                          ...loginUser,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                    <label htmlFor="floatingInput">Email address</label>
                  </div>
                  <div className="form-floating  mb-3">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={loginUser.password}
                      id="floatingPassword"
                      placeholder="Password"
                      onChange={(e) =>
                        setLoginUser({
                          ...loginUser,
                          [e.target.name]: e.target.value,
                        })
                      }
                      autoComplete="on"
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>
                  <button
                    type="submit"
                    className="button_dark mb-3"
                    disabled={loading}
                  >
                    Submit
                  </button>

                  {error && <div className="alert alert-danger">{error}</div>}

                  <p>
                    Don't have an account yet?{" "}
                    <Link to="/signup"> Sign up</Link>
                  </p>
                </form>
              </Col>
              <Col className="p-0 d-none d-md-block">
                <img src={loginBanner} alt="login" className="w-100" />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
export default Login;
