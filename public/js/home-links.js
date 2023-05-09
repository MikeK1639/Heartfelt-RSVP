const loginHandler = async (event) => {
  // Redirect to the login page
  // console.log("Login clicked!");
  // const response = await fetch("/login", {
  //   method: "GET",
  // });
  // console.log("Response:", response);
  document.location.replace("/login");
};

const signupHandler = async (event) => {
  // Redirect to the signup page
  const response = await fetch("/signup", {
    method: "GET",
  });
};

const loginFormHandler = async (event) => {
  event.preventDefault();
  console.log("Login button clicked!");
  //collect values from login form
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();
  console.log(`User: ${user}\nEmail:${email}\nPassword: ${password}`);

  if (user && email && password) {
    const response = await fetch("api/user/login", {
      method: "POST",
      body: JSON.stringify({ user, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    // if (response.ok) {
    //   document.location.replace("/");
    // } else {
    //   alert(response.statusText);
    // }
  }
};

$("#login-btn").click(loginHandler);
$("#login-form-btn").click(loginFormHandler);
$("#signup-form-btn").click(signupHandler);
