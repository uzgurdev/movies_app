import { Api } from "modules/movie";
import React from "react";

interface ModalProps {
  show: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ show, onClose }) => {
  const [genre, setGenre] = React.useState("");

  async function handleAddGenre() {
    await Api.Genre.Create({ name: genre });

    setGenre("");
    onClose();
  }

  return (
    <div className={show ? "modalByHand modal" : "modal-hide"}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Modal title
            </h1>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <label>Enter Genre Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Genre Name...."
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddGenre}
            >
              Add Genre
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
