document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (validateForm()) {
      storeUserData();
      alert("Account Created successfully!");
      window.location.href = "login.html";
    }
  });

  form.querySelectorAll(".form-control").forEach(function (input) {
    input.addEventListener("input", function () {
      validateInput(input);
    });
  });

  function validateInput(input) {
    const emailInput = form.querySelector("#validationCustomEmail");

    if (input === emailInput) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value.trim())) {
        setInvalid(input, "Please provide a valid email address.");
      } else if (isDuplicateEmail(input.value.trim())) {
        setInvalid(input, "This email is already registered.");
      } else {
        setValid(input);
      }
    } else {
      if (!input.value.trim()) {
        setInvalid(input, "This field is required.");
      } else {
        setValid(input);
      }
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

    const passwordInput = form.querySelector("#validationCustomPassword");
    const confirmPasswordInput = form.querySelector(
      "#validationCustomConfirmPassword"
    );
    if (!confirmPasswordInput.value.trim()) {
      setInvalid(confirmPasswordInput, "This field is required.");
      isValid = false;
    } else if (passwordInput.value !== confirmPasswordInput.value) {
      setInvalid(confirmPasswordInput, "Passwords do not match.");
      isValid = false;
    } else {
      setValid(confirmPasswordInput);
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

  function isDuplicateEmail(email) {
    const userData = JSON.parse(localStorage.getItem("userData")) || [];
    return userData.some((user) => user.email === email);
  }

  function storeUserData() {
    const userData = JSON.parse(localStorage.getItem("userData")) || [];
    const username = form
      .querySelector("#validationCustomUsername")
      .value.trim();
    const email = form.querySelector("#validationCustomEmail").value.trim();
    const password = form
      .querySelector("#validationCustomPassword")
      .value.trim();
    userData.push({ username, email, password });
    localStorage.setItem("userData", JSON.stringify(userData));
  }
});
