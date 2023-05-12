// ::::: Redirect to the login page :::::
const loginNavBtnHandler = () => {
  document.location.replace("/login");
};

// ::::: New user event handler :::::
const signupFormHandler = async (event) => {
  event.preventDefault();
  // ::::: Get new user values from the signup form :::::
  const user = document.querySelector("#user-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  console.log(`User: ${user}\nEmail:${email}\nPassword: ${password}`);

  //! ::::: SIGN UP :::::
  // ::::: Redirect to the signup route to create a new user :::::
  if (user && email && password) {
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ user, email, password }), // stringify to send over
      headers: { "Content-Type": "application/json" },
    });

    // ::::: If user created re-route to the home page :::::
    if (response.ok) {
      const { message } = await response.json();
      console.log(message);
      document.location.replace("/api/user/guest-list");
    } else {
      alert(
        "Please check your user name and password.\nIf you are a new user, please Sign Up."
      );
    }
  }
};

//! ::::: LOG IN :::::
const loginFormHandler = async (event) => {
  event.preventDefault();

  //collect values from login form
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  console.log(
    `+++++++++++++++Email:${email}\nPassword: ${password}++++++++++++++++`
  );

  if (email && password) {
    const response = await fetch("api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/event");
      console.log("Logged In!");
    } else {
      console.log(
        `+++++++++++++++Email:${email}\nPassword: ${password}++++++++++++++++`
      );
      alert("Please check your email and password and try again.");
      // alert(response.statusText);
    }
  }
};

const rsvpResponse = async (e) => {
  e.preventDefault();
  const guestName = document.querySelector("#guest-name").value;
  const attending = document.querySelector('input[name="a"]:checked').value;
  const event = e.target.dataset.event;
  console.log("Before PATCH call ++++++++++++++++++++++++++++++++++++++++");
  console.log(`Guest name: ${guestName}`);
  console.log("Attending:", attending);

  const response = await fetch("/api/post/guest-rsvp", {
    method: "PATCH",
    body: JSON.stringify({ guestName, attending, event_id: event }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    if (attending === "true") {
      document.querySelector("#modal-message").textContent =
        "Looking forward to seeing you!";
      $("#modal-1").modal("show");

      // Move the document.location.replace() call here
      $("#modal-1").on("hidden.bs.modal", function () {
        document.location.replace("/");
      });
    } else if (attending === "false") {
      document.querySelector("#modal-message").textContent =
        "Sorry you can't make it.";
      $("#modal-1").modal("show");

      // Move the document.location.replace() call here
      $("#modal-1").on("hidden.bs.modal", function () {
        document.location.replace("/");
      });
    }
  } else {
    alert("Please check your input and try again.");
  }
};

const rsvpPage = async (e) => {
  e.preventDefault();
  console.log("In rsvpPage function");
  const response = await fetch("/api/user/guest-list", {
    method: "GET",
  });

  if (response.ok) {
    document.location.replace("/api/user/guest-list");
  }
};

const userLogout = async (e) => {
  console.log(
    "In logout function.++++++++++++++++++++++++++++++++++++++++++++\n++++++++++++++++++++++++++++++++++++++++++"
  );
  const response = await fetch("/api/user/logout", {
    method: "DELETE",
  });

  if (response.ok) {
    console.log("User has been logged out.");
    document.location.replace("/");
  }
};

const addGuest = async (e) => {
  e.preventDefault();
  console.log(
    "Adding guest function.++++++++++++++++++++++++++++++++++++++++++++\n++++++++++++++++++++++++++++++++++++++++++"
  );

  const newGuest = document.querySelector("#new-guest").value.trim();

  const response = await fetch("/api/post/guest-list", {
    method: "POST",
    body: JSON.stringify({ newGuest, event_id: e.target.dataset.event }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    location.reload();
    console.log("Guest added.");
  }
};

const createEvent = async (e) => {
  e.preventDefault();
  const eventName = document.querySelector("#event-name").value.trim();
  const eventDescription = document
    .querySelector("#event-description")
    .value.trim();

  const response = await fetch("/api/user/add-event", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      event_name: eventName,
      event_description: eventDescription,
    }),
  });

  if (response.ok) {
    location.reload();
    console.log("Event created.");
    // document.location.href = "/api/user/guest-list";
  } else {
    alert("Failed to add event");
  }
};

const loadAddEvent = async (e) => {
  e.preventDefault();
  document.location.href = "/event";
};

const getEvent = (event) => {
  event.preventDefault();
  const eventName = event.target.dataset.event;
  console.log("event name +++++++++++++++++++++++", eventName);
};

//! ::::: LANDING PAGE BUTTONS EVENT LISTENERS :::::
// ::::: Landing page login button :::::
// $("#login-btn").click(loginNavBtnHandler);
const loginBtn = document.getElementById("login-btn");
if (loginBtn) {
  loginBtn.addEventListener("click", loginNavBtnHandler);
}

// $("#user-logout").click(userLogout);
const userLogoutBtn = document.getElementById("user-logout");
if (userLogoutBtn) userLogoutBtn.addEventListener("click", userLogout);

//* ::::: LogIn form button on login page :::::
// $("#login-form-btn").click(loginFormHandler);
const loginFormBtn = document.getElementById("login-form-btn");
if (loginFormBtn) loginFormBtn.addEventListener("click", loginFormHandler);

//* ::::: Signup form button on signup page :::::
// $("#signup-form-btn").click(signupFormHandler);
const signupFormBtn = document.getElementById("signup-form-btn");
if (signupFormBtn) signupFormBtn.addEventListener("click", signupFormHandler);

//* ::::: Guest List nav button :::::
// $("#rsvp-btn").click(rsvpPage);
const guestListBtn = document.querySelector("#guest-list-btn");
if (guestListBtn) guestListBtn.addEventListener("click", rsvpPage);

//* ::::: RSVP form submit :::::
const rsvpForm = document.querySelector("#rsvp-response");
if (rsvpForm) rsvpForm.addEventListener("submit", rsvpResponse);

//* ::::: Create a new guest :::::
const addGuestBtn = document.getElementById("add-guest");
if (addGuestBtn) addGuestBtn.addEventListener("click", addGuest);

//* ::::: Add a new event :::::
const addNewEventBtn = document.getElementById("add-event-form");
if (addNewEventBtn) addNewEventBtn.addEventListener("submit", createEvent);

//* ::::: Load new event page :::::
const navEventBtn = document.getElementById("nav-event-btn");
if (navEventBtn) navEventBtn.addEventListener("click", loadAddEvent);

//* ::::: Load new event page :::::
// // returns an array
// const eventLink = document.querySelectorAll(".event-link");
// // adding event handler to each link
// if (eventLink)
//   eventLink.forEach((link) => link.addEventListener("click", getEvent));
