import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { usePostContext } from "../../Context";
import { toast } from "react-toastify";
import { useAuthContext } from "../../Context/AuthContext";
function Index() {
  const { dispatch, editId, posts } = usePostContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [formData, setFormdata] = useState({
    title: "",
    image: "",
    description: "",
    error: null,
  });

  //  updating form input fields after edit button clicked
  const post = posts.find((p) => (p._id === editId ? p : null));
  useEffect(() => {
    if (editId) setFormdata(post);
  }, [editId, post]);

  //convert file in base64
  const handleChange = async (e) => {
    const image = e.target.files[0];
    const base64 = await getbaseValue(image);

    setFormdata({ ...formData, image: base64 });
  };

  const getbaseValue = (file) => {
    return new Promise((resolve, reject) => {
      const readFile = new FileReader();
      readFile.readAsDataURL(file);
      readFile.onload = () => {
        resolve(readFile.result);
      };
      readFile.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //  handleEdit
    if (editId) {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/posts/${editId}`,
        {
          method: "PATCH",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
            authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (!response.ok) {
        setFormdata({ ...formData, error: true });
      }
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "UPDATE_POST", payload: data });

        setFormdata({ title: "", image: "", description: "", error: null });
        toast.success("Post Updated successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          className: "toast-message",
        });
        navigate("/");
      }
    } else {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/posts`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
          authorization: `Bearer ${user.token}`,
        },
      });
      if (!response.ok) {
        setFormdata({ ...formData, error: true });
        // throw new Error(response);
      }
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "ADD_POST", payload: data });

        setFormdata({ title: "", image: "", description: "", error: null });
        toast.success("Post added succesfully!", {
          position: toast.POSITION.TOP_RIGHT,
          className: "toast-message",
        });

        navigate("/");
      }
    }
  };
  return (
    <Row className="justify-content-center ">
      <h2 className="fw-bold text-center mb-4">
        {editId ? "Update" : "Add"} Blog
      </h2>
      <Col lg={6}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 form-floating">
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              placeholder="title"
              onChange={(e) =>
                setFormdata({ ...formData, [e.target.name]: e.target.value })
              }
              value={formData.title}
            />
            <label htmlFor="title">Enter Title</label>
          </div>
          <div className="mb-3 ">
            <label htmlFor="image">Upload Image</label>
            <input
              type="file"
              className="form-control"
              id="image"
              name="image"
              onChange={handleChange}
              accept=".jpeg,.png,.jpg,.svg"
            />
          </div>
          <div className="mb-3 form-floating">
            <textarea
              type="text"
              className="form-control"
              id="description"
              name="description"
              placeholder="description"
              style={{ height: "130px" }}
              onChange={(e) =>
                setFormdata({ ...formData, [e.target.name]: e.target.value })
              }
              value={formData.description}
            />
            <label htmlFor="description">Enter Description</label>
          </div>
          <button type="submit" className="button_dark mb-3">
            {editId ? "Update" : "Submit"}
          </button>
          {formData.error && (
            <p className="alert alert-danger">All field are required</p>
          )}
        </form>
      </Col>
    </Row>
  );
}
export default Index;
