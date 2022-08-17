import React from "react";
import { getMessagesList } from "../helpers";

const Dashboard = () => {
  const [messagesList, setMessagesList] = React.useState(null);
  const [messagesNodes, setMessagesNodes] = React.useState(null);
  const [rerender, setRerender] = React.useState(false);

  React.useEffect(() => {
    getMessagesList().then((messages) => {
      setMessagesList(messages);
      if (messagesList) {
        const nodeList = messagesList.map((message) => {
          return (
            <div key={message["_id"]}>
              <h3>User: {message.user}</h3>
              <h3>Title: {message.title}</h3>
              <p>{message.text}</p>
              <hr />
            </div>
          )
        })
        setMessagesNodes(nodeList);
      } else {
        setRerender(!rerender);
      }
    });
  }, [rerender]);

  return (
    <div>
      <h1>Messages</h1>
      <div className="messageContainer">
        {messagesList === null || messagesNodes === null ? "Loading..." : messagesNodes}
      </div>
    </div>
  );
};

export default Dashboard;
