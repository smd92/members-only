import React from "react";

const MessageForm = (props) => {
  const [userID, setUserID] = React.useState("");
  const [messageTitle, setMessageTitle] = React.useState("");
  const [messageText, setMessageText] = React.useState("");

  React.useEffect(() => {
    if (props.userID) setUserID(props.userID);
  });

  return (
    <div>
      <p>Messageform</p>
      <form action="/messages/newMessage" method="POST">
        <input id="userID" name="userID" type="hidden" value={userID} />
        <div>
          <label htmlFor="messageTitle">Title</label>
          <input
            id="messageTitle"
            name="messageTitle"
            type="text"
            maxLength="100"
            required
            onChange={(event) => setMessageTitle(event.target.value)}
            value={messageTitle}
          />
        </div>
        <div>
          <label htmlFor="messageText">Message</label>
          <input
            id="messageText"
            name="messageText"
            type="textarea"
            maxLength="180"
            required
            onChange={(event) => setMessageText(event.target.value)}
            value={messageText}
          />
        </div>
        <button type="submit">Add Message</button>
      </form>
    </div>
  );
};

export default MessageForm;
