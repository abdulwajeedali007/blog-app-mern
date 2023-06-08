import { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import firstImage from "../Images/FirstImage.jpg";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import "../Components/Posts/post.scss";
import { formatDistanceToNow } from "date-fns";
import { toast } from "react-toastify";
import Modal from "../Components/Modal";
import { usePostContext } from "../Context";
import { useAuthContext } from "../Context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Myblogs() {
  const { myposts, dispatch } = usePostContext();
  const { user } = useAuthContext();
  const navigator = useNavigate();
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/posts/myposts`, {
      headers: { authorization: `Bearer ${user.token}` },
    })
      .then((result) => result.json())
      .then((data) => {
        dispatch({ type: "ALL_MY_POSTS", payload: data });
      })
      .catch((error) => console.log(error));
  }, [dispatch, user]);

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
        dispatch({ type: "DELETE_MY_POST", payload: result._id });
        toast.success("Post deleted successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          className: "toast-message",
        });
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <Row>
      {myposts.length === 0 && (
        <h1>
          You ({user && user.email}) not uploaded any post yet, if you want?{" "}
          <Link to="/add">Add post</Link>
        </h1>
      )}
      {myposts &&
        myposts.map((post) => (
          <Col className="mb-3" key={post._id} lg={12}>
            <Card className="h-100 d-row">
              <Row>
                <Col lg={4} sm={12}>
                  <Card.Img
                    src={post.image ? post.image : firstImage}
                    alt="post-image"
                  />
                </Col>
                <Col lg={8} sm={12}>
                  <Card.Body className="h-100">
                    <div className="content_container h-100 d-flex flex-column">
                      <h4 className="heading p-0 m-0">{post.title}</h4>
                      <p className="text-highliter">
                        Updated :{" "}
                        {formatDistanceToNow(new Date(post.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                      <p className="text">{post.description}</p>
                      <div className="card_icons mt-auto">
                        <button
                          className="btn btn-secondary"
                          onClick={() => {
                            setValue(post._id);
                          }}
                        >
                          know more
                        </button>
                        {!user ? (
                          <>Loading</>
                        ) : (
                          user.id === post.user_id && (
                            <>
                              <button
                                className="btn btn-danger mx-2"
                                onClick={() => handleDelete(post._id)}
                              >
                                {" "}
                                Delete {<AiOutlineDelete />}
                              </button>
                              <button
                                className="edit_button edit_my_button"
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
                          )
                        )}
                      </div>
                    </div>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
            <Modal
              show={value === post._id}
              onHide={() => setValue(0)}
              post={post}
            />
          </Col>
        ))}
    </Row>
  );
}
export default Myblogs;
