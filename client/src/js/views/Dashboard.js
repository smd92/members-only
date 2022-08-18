import React from "react";
import { getMessagesList, deleteMessage } from "../helpers";

const Dashboard = (props) => {
  const [messagesList, setMessagesList] = React.useState([]);
  const [messagesNodes, setMessagesNodes] = React.useState(null);
  const [rerender, setRerender] = React.useState(false);

  React.useEffect(() => {
    getMessagesList().then((messages) => {
      setMessagesList(messages);
      const nodeList = messagesList.map((message) => {
        return (
          <div key={message["_id"]}>
            <h3>User: {message.user}</h3>
            <h3>Title: {message.title}</h3>
            <p>{message.text}</p>
            {props.isAdmin && (
              <button
                onClick={() => {
                  deleteMessage(message["_id"]);
                  setRerender(!rerender);
                }}
              >
                Delete
              </button>
            )}
            <hr />
          </div>
        );
      });
      setMessagesNodes(nodeList);
    });
  }, [rerender, props.isAdmin, messagesList.length]);

  return (
    <div>
      <h1>Messages</h1>
      <div className="messageContainer">
        {messagesNodes === null ? "Loading..." : messagesNodes}
      </div>
    </div>
  );
};

export default Dashboard;
