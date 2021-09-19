import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "./index.css";

const initialData = {
  title: "",
  subtitle: "",
  content: "",
  image_url: "",
};

const NewsForm = ({ initialArticle = initialData, onSubmitCallback }) => {
  const [data, setData] = useState(initialArticle);

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmitCallback(data);
    setData(initialArticle);
  };
  const showWidget = (e) => {
    let widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "olymp-cinema",
        uploadPreset: "olymp_cinema",
        folder: "news",
        chunk_size: 6000000,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log(
            "File uploaded successfully! Here is the info: ",
            result.info
          );
          setData({ ...data, image_url: result.info.secure_url });
        }
      }
    );

    widget.open();
  };

  return (
    <>
      <h4 className="m-4 text-center">News Form</h4>
      <form className="news-form" onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Article Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Article Title"
            name="title"
            value={data.title}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Article Subtitle</Form.Label>
          <Form.Control
            type="text"
            placeholder="Article Subtitle"
            name="subtitle"
            value={data.subtitle}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Article Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="content"
            value={data.content}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Control
          type="text"
          placeholder="Upload Image (double click)"
          readOnly
          className="mb-3 text-center"
          id="image_upload"
          onDoubleClick={showWidget}
        />
        <div style={{ marginBottom: "20px" }}>
          {data.image_url && (
            <img
              src={data.image_url}
              alt="news_article_image"
              style={{
                width: "100%",
                display: "block",
                margin: "0 auto",
              }}
            />
          )}
        </div>
        <div className="news-btn">
          <button
            className=" btn btn-primary"
            style={{
              width: "250px",
              background: "#d1a019",
              color: "black",
              fontWeight: "bold",
              border: "none",
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};
export default NewsForm;
