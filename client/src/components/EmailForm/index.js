import React, { useState } from "react";
import "./index.css";

const EmailForm = ({ onSendMessage }) => {
  const [inputState, setInputState] = useState({
    email: "",
    title: "",
    content: "",
  });

  const handleInputChange = (e) => {
    setInputState({ ...inputState, [e.target.name]: e.target.value });
  };

  const handleClickMessage = (e) => {
    onSendMessage(inputState.email, inputState.content, inputState.title);
  };

  return (
    <div className="card">
      <div className="card-header p-0 m-0">
        <div className="bg-dark text-white text-center py-2 rounded-1">
          <h3>
            <i className="fa fa-envelope"></i> Mesagerie electronică
          </h3>
          <p className="m-0">Cu ce vă putem ajuta ? </p>
        </div>
      </div>
      <div className="card-body p-3">
        <div className="form-group">
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <i className="fa fa-user text-dark"></i>
              </div>
            </div>
            <input
              type="text"
              className="form-control"
              onChange={handleInputChange}
              id="title"
              name="title"
              value={inputState.title}
              placeholder="Subiectul"
              required
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <i className="fa fa-envelope text-dark"></i>
              </div>
            </div>
            <input
              type="email"
              className="form-control"
              onChange={handleInputChange}
              id="email"
              name="email"
              value={inputState.email}
              placeholder="Adresa electronică"
              required
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <i className="fa fa-comment text-dark"></i>
              </div>
            </div>
            <textarea
              className="form-control"
              name="content"
              value={inputState.content}
              placeholder="  Textul mesajului"
              required
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>

        <div className="text-center">
          <input
            type="submit"
            value="Expediază"
            className="btn btn-warning  btn-block rounded-10"
            onClick={handleClickMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default EmailForm;
