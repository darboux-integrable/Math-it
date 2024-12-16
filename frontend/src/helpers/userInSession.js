const USER_SESSION_KEY = "user.session.key.id";

function saveUsertoSessionStorage(userId){
    sessionStorage.setItem(USER_SESSION_KEY, userId);
}

// Check if the user has been logged in. 
// I know the user is logged in if the ID for the user is found in session storage.
function fetchUserFromSessionStorage(){

    const userId = sessionStorage.getItem(USER_SESSION_KEY) || null;

    if(!userId){
        return 0;
    } 

    let user;

    fetch("http://127.0.0.1:5000")
    .then(res => {
        console.log(res);
        return res.json();
    })
    .then(data => {
        console.log(data);
        user = data;
    })

    return user;
}