function saveUserCookie(userId) {
  document.cookie = "userID=" + userId;
}

function getCookieValue(name) {
  const regex = new RegExp(`(^| )${name}=([^;]+)`);
  const match = document.cookie.match(regex);
  if (match) {
    return match[2];
  }
}

// Check if the user has been logged in.
// I know the user is logged in if the ID for the user is found in session storage.
function fetchUserFromCookie(ifSuccessful) {
  const userId = getCookieValue("userID") || "unknownID";

  if (userId == "unknownID") {
    if (window.location.pathname != "/login") location.replace("/login");

    return 0;
  }

  let user;

  // Return the user json promise.
  fetch("http://127.0.0.1:5000/users/" + userId)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      user = data;
      ifSuccessful(user);
    })
    .catch((err) => {});
}

export { saveUserCookie, fetchUserFromCookie };
