const getUserByID = async (userID) => {
  try {
    const res = await fetch(`/users/${userID}`);
    if (!res.ok) {
      throw new Error(res.statusText);
    } else {
      const user = await res.json();
      return user;
    }
  } catch (err) {
    console.log(err);
  }
};

const getMessagesList = async () => {
  try {
    const res = await fetch("/messages");
    if (!res.ok) {
      throw new Error(res.statusText);
    } else {
      const messageList = await res.json();
      return messageList;
    }
  } catch (err) {
    console.log(err);
  }
};

const deleteMessage = async (messageID) => {
  try {
    const res = await fetch(`/messages/${messageID}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
  } catch (err) {
    console.log(err);
  }
};

export { getUserByID, getMessagesList, deleteMessage };
