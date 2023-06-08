import Modal from "react-bootstrap/Modal";
import { formatDistanceToNow } from "date-fns";
function Index(props) {
  return (
    <>
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title className="m-0 align-items-center">
            {props.post.title}
            <br />
            <p className="text-highliter  m-0">
              Updated :{" "}
              {formatDistanceToNow(new Date(props.post.createdAt), {
                addSuffix: true,
              })}
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{props.post.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="button_dark" onClick={props.onHide}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Index;
