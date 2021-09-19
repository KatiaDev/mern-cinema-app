import React, { useState } from "react";
import EmailForm from "../components/EmailForm";
import MapForm from "../components/MapForm";
import { sendMessage } from "../actions/InBoxNotification";
import NotificationModal from "../components/NotificationModal";

const Contact = () => {
  const [showModal, setShowModal] = useState(false);
  const [response, setRespose] = useState("");

  const onSendMessage = (email, title, content) => {
    sendMessage(email, title, content).then((message) => {
      setShowModal(true);
      setRespose(message);
    });
  };

  return (
    <div class="row justify-content-center">
      <div class="col-12 col-md-7 col-lg-6 pb-5">
        <MapForm />
        <EmailForm onSendMessage={onSendMessage} />
      </div>
      <NotificationModal
        show={showModal}
        onHide={(e) => {
          setShowModal(false);
        }}
        title={response.title}
        body={response.body}
        messageType={response.messageType}
      ></NotificationModal>
    </div>
  );
};

export default Contact;
