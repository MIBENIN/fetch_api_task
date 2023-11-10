document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (validateForm()) {
      alert("Login successful!");
      window.location.href = "index.html";
    }
  });
  form.querySelectorAll(".form-control").forEach(function (input) {
    input.addEventListener("input", function () {
      validateInput(input);
    });
  });

  function validateInput(input) {
    if (!input.value.trim()) {
      setInvalid(input, "This field is required.");
    } else {
      setValid(input);
    }
  }

  function validateForm() {
    let isValid = true;

    form.querySelectorAll(".form-control").forEach(function (input) {
      validateInput(input);

      if (input.classList.contains("is-invalid")) {
        isValid = false;
      }
    });

    const emailInput = form.querySelector("#validationCustomEmail");
    const passwordInput = form.querySelector("#validationCustomPassword");

    if (!emailInput.value.trim()) {
      setInvalid(emailInput, "This field is required.");
      isValid = false;
    } else if (!isEmailValid(emailInput.value.trim())) {
      setInvalid(emailInput, "Please provide a valid email address.");
      isValid = false;
    } else {
      setValid(emailInput);
    }

    if (!passwordInput.value.trim()) {
      setInvalid(passwordInput, "This field is required.");
      isValid = false;
    } else {
      setValid(passwordInput);
    }

    if (
      isValid &&
      !isAccountValid(emailInput.value.trim(), passwordInput.value.trim())
    ) {
      setInvalid(emailInput, "Account not found or invalid credentials.");
      setInvalid(passwordInput, "");
      isValid = false;
    }

    return isValid;
  }

  function setInvalid(field, message) {
    const feedback = field.parentElement.querySelector(".invalid-feedback");
    feedback.textContent = message;
    field.classList.remove("is-valid");
    field.classList.add("is-invalid");
  }

  function setValid(field) {
    const feedback = field.parentElement.querySelector(".valid-feedback");
    feedback.textContent = "Looks good!";
    field.classList.remove("is-invalid");
    field.classList.add("is-valid");
  }

  function isEmailValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isAccountValid(email, password) {
    const userData = JSON.parse(localStorage.getItem("userData")) || [];
    return userData.some(
      (user) => user.email === email && user.password === password
    );
  }
});
