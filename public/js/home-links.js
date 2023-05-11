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
    const response = await fetch("api/user", {
      method: "POST",
      body: JSON.stringify({ user, email, password }), // stringify to send over
      headers: { "Content-Type": "application/json" },
    });

    // ::::: If user created re-route to the home page :::::
    if (response.ok) {
      const { message } = await response.json();
      console.log(message);
      document.location.replace("api/user/guest-list");
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

  console.log(`Email:${email}\nPassword: ${password}`);

  if (email && password) {
    const response = await fetch("api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/api/user/guest-list");
      console.log("Logged In!");
    } else {
      alert("Please check your email and password and try again.");
      // alert(response.statusText);
    }
  }
};

const rsvpResponse = async (e) => {
  e.preventDefault();
  const guestName = document.querySelector("#guest-name").value;
  const attending = document.querySelector('input[name="a"]:checked').value;
  console.log("Before PATCH call ++++++++++++++++++++++++++++++++++++++++");
  console.log(`Guest name: ${guestName}`);
  console.log("Attending:", attending);

  const response = await fetch("/api/post/guest-rsvp", {
    method: "PATCH",
    body: JSON.stringify({ guestName, attending }),
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

  // document.location.replace("/");
};

//! ::::: LANDING PAGE BUTTONS EVENT LISTENERS :::::
// ::::: Landing page login button :::::
$("#login-btn").click(loginNavBtnHandler);

// ::::: LogIn form button on login page :::::
$("#login-form-btn").click(loginFormHandler);

// ::::: Signup form button on signup page :::::
$("#signup-form-btn").click(signupFormHandler);

// ::::: RSVP form submit :::::
const rsvpForm = document.querySelector("#rsvp-response");
rsvpForm.addEventListener("submit", rsvpResponse);
