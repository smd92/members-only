const getUserID= async () => {
  try {
    const res = await fetch("/sessionPassport");
    if (!res.ok) {
      throw new Error(res.statusText);
    } else {
      const userAuth = await res.json();
      return userAuth;
    }
  } catch (err) {
    console.log(err);
  }
};

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

export { getUserID, getUserByID };
