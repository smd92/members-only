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

export { getUserByID };
