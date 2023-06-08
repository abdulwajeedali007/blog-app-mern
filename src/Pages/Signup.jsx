import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSignup } from "../Hooks/useSignup";
import { useNavigate, Link } from "react-router-dom";
import signupbanner from "../Images/second.jpg";
function Signup() {
  const navigate = useNavigate();
  const { signup, error, loading } = useSignup();
  const [signupUser, setSignupUser] = useState({ email: "", password: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    signup(signupUser);
    signupUser.email = "";
    signupUser.password = "";
    if (error === null || error) {
      return;
    } else {
      navigate("/");
    }
  };
  return (
    <section className="signup" style={{ height: "700px" }}>
      <Container className="h-100">
        <Row className="align-items-center justify-content-center h-100">
          <Col lg={8} className="bg-white rounded-3 overflow-hidden">
            <Row className=" align-items-center justify-content-center h-100">
              <Col className="ms-4 me-4 px-0 py-3">
                <h2 className="fw-bold mb-3">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={signupUser.email}
                      id="floatingInput"
                      placeholder="name@example.com"
                      onChange={(e) =>
                        setSignupUser({
                          ...signupUser,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                    <label htmlFor="floatingInput">Email address</label>
                  </div>
                  <div className="form-floating  mb-3">
                    <input
                      type="password"
                      name="password"
                      value={signupUser.password}
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      onChange={(e) =>
                        setSignupUser({
                          ...signupUser,
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
                    If you already have account? <Link to="/login">Login</Link>
                  </p>
                </form>
              </Col>
              <Col className="p-0 d-none d-md-block">
                <img src={signupbanner} alt="signup" className="w-100 " />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
export default Signup;
