// ::::: Redirect to the login page :::::
const loginHandler = async (event) => {
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

  // ::::: Redirect to the signup route to create a new user :::::
  if (user && email && password) {
    const response = await fetch("api/user", {
      method: "POST",
      body: JSON.stringify({ user, email, password }), // deconstructing
      headers: { "Content-Type": "application/json" },
    });
    if (username && email && password) {
      const response = await fetch("api/user", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert(response.statusText);
      }
    }
  }
};

const loginFormHandler = async (event) => {
  event.preventDefault();
  //collect values from login form
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  console.log(`Email:${email}\nPassword: ${password}`);

  if (email && password) {
    console.log("About to fetch!");
    const response = await fetch("api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
};

// ::::: Landing pare login button
$("#login-btn").click(loginHandler);

// ::::: LogIn form button on login page
$("#login-form-btn").click(loginFormHandler);

// ::::: Signup form button on signup page
$("#signup-form-btn").click(signupFormHandler);

$("#contact-us-link").click(document.location.replace("contacts"));