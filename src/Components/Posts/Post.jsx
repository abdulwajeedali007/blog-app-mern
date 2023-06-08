import { useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import firstImage from "../../Images/FirstImage.jpg";
import mainBanner from "../../Images/main.jpg";
import { BiEditAlt, BiMessageSquareDetail } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import "./post.scss";
import { formatDistanceToNow } from "date-fns";
import Modal from "../Modal";
import { toast } from "react-toastify";
import { usePostContext } from "../../Context";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";

function Post({ posts }) {
  const { dispatch } = usePostContext();
  const { user } = useAuthContext();
  const navigator = useNavigate();
  // Show modal
  const [value, setValue] = useState(0);
  // handleDELETE
  const handleDelete = (id) => {
    if (!user) {
      toast.error("You must be login first", {
        position: toast.POSITION.TOP_RIGHT,
        className: "toast-message",
      });
      return;
    }
    fetch(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, {
      method: "delete",
      headers: { authorization: `Bearer ${user.token}` },
    })
      .then((res) => res.json())
      .then((result) => {
        dispatch({ type: "DELETE_POST", payload: result._id });
        toast.success("Post deleted successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          className: "toast-message",
        });
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <Row className="mb-4">
        <Col>
          <div className="card_container overflow-hidden rounded-2">
            <img src={mainBanner} alt="Reactjs" className="w-100 h-100 " />
            <div className="card_container_content">
              <h1>
                All you want to know about, updated technologies, working with
                developers and creating delightful prodcut experience.
              </h1>
              <p className="text ">
                Once a wise man said, “One machine can do the work of fifty
                ordinary men and no machine can do the work of one extraordinary
                man”. And in order to become extraordinary in the 21st century
                you have to be updated with the current technology which is
                bringing evolution in the IT sector.
              </p>
            </div>
          </div>
        </Col>
      </Row>
      {posts.length === 0 && !user && <h1>Nobody is register yet.</h1>}
      {posts.length === 0 && user && (
        <h1>
          Want to add post? <Link to="/add">Add post</Link>
        </h1>
      )}
      <Row>
        {posts &&
          posts.map((post) => (
            <Col lg={4} className="mb-3" key={post._id}>
              <Card className="h-100">
                <Card.Img src={post.image ? post.image : firstImage} />
                <Card.Body className="h-100">
                  <div className="content_container h-100 d-flex flex-column">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <h4 className="heading p-0 m-0">{post.title}</h4>
                        <p className="text-highliter">
                          Updated :{" "}
                          {formatDistanceToNow(new Date(post.createdAt), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                      <p className="p-0 m-0 align-self-start">
                        <span
                          className="d-block fst-italic"
                          style={{ fontSize: "12px" }}
                        >
                          Posted by
                        </span>
                        <p className="d-flex align-items-center justify-space-between">
                          <BiMessageSquareDetail />{" "}
                          <span style={{ fontSize: "14px", marginLeft: "5px" }}>
                            {post.user_mail}
                          </span>
                        </p>
                      </p>
                    </div>
                    <p className="text text-dots mb-5">{post.description}</p>
                    <div className="card_icons d-flex align-items-center justify-content-between mt-auto">
                      <button
                        className="button_secondary px-2 py-1"
                        onClick={() => {
                          setValue(post._id);
                        }}
                      >
                        know more
                      </button>
                      {!user
                        ? null
                        : user.id === post.user_id && (
                            <>
                              <button
                                className="btn btn-danger"
                                onClick={() => handleDelete(post._id)}
                              >
                                {" "}
                                Delete {<AiOutlineDelete />}
                              </button>
                              <button
                                className="edit_button"
                                onClick={() => {
                                  dispatch({
                                    type: "UPDATE_POST_ID",
                                    payload: post._id,
                                  });
                                  navigator("/add");
                                }}
                              >
                                <BiEditAlt />
                              </button>
                            </>
                          )}
                    </div>
                  </div>
                </Card.Body>
              </Card>
              <Modal
                show={value === post._id}
                onHide={() => setValue(0)}
                post={post}
              />
            </Col>
          ))}
      </Row>
    </>
  );
}
export default Post;
