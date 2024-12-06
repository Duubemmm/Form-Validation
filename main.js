const nameError = document.getElementById("name-error");
const numberError = document.getElementById("phone-number-error");
const emailError = document.getElementById("email-error");
const messageError = document.getElementById("message-error");
const submitError = document.getElementById("submit-error");
const inputElement = document.querySelectorAll(
  "input[type='text'], input[type='tel'], input[type='email']"
);
const messageArea = document.getElementById("message-area");

//Adding Event Listeners
inputElement.forEach((input) => {
  input.addEventListener("keyup", validateForm);
});

messageArea.addEventListener("keyup", validateMessage);

//Function for validating the contact form
function validateForm(e) {
  const input = e.target;
  const nameValue = document.getElementById("full-name").value.trim();
  const numberValue = document.getElementById("phone-number").value.trim();
  const emailValue = document.getElementById("email-address").value.trim();
  const checkMark = document.getElementById(`${input.id}-checkmark`);
  console.log(checkMark);
  switch (input.id) {
    case "full-name":
      if (!nameValue) {
        showError(nameError, checkMark, "Name is required");
        return false;
      }

      if (!nameValue.match(/^[A-Za-z]+(?:\s[A-Za-z]+)+$/)) {
        showError(nameError, checkMark, "Please write your full name");
        return false;
      }

      clearError(nameError, checkMark);
      return true;

    case "phone-number":
      if (!numberValue) {
        showError(numberError, checkMark, "Phone number is required");
        return false;
      }

      if (!numberValue.match(/^\d{11}$/)) {
        showError(numberError, checkMark, "Please enter a valid phone number");
        return false;
      }
      clearError(numberError, checkMark);
      return true;

    case "email-address":
      if (!emailValue) {
        showError(emailError, checkMark, "Email is required");
        return false;
      }

      if (!emailValue.match(/^\S+@\S+\.\S+$/)) {
        showError(emailError, checkMark, "Please enter a valid email");
        return false;
      }

      clearError(emailError, checkMark);
      return true;

    default:
      break;
  }
}

//Function for validating the textarea
function validateMessage() {
  const messageValue = document.getElementById("message-area").value;
  const messageError = document.getElementById("message-error");
  const checkMarkMessage = document.getElementById("message-area-checkmark");

  if (!messageValue) {
    showError(messageError, checkMarkMessage, "Message is required");
    return false;
  }
  if (messageValue.length < 30) {
    showError(
      messageError,
      checkMarkMessage,
      "Message should be at least 30 characters"
    );
    return false;
  }

  clearError(messageError, checkMarkMessage);
}

//Function for showing the Error Message
function showError(element, checkMark, message) {
  element.style.display = "block";
  element.innerHTML = message;

  if (checkMark) checkMark.style.display = "none";
}

//Function for clearing the Error Message
function clearError(element, checkMark) {
  element.style.display = "none";
  if (checkMark) checkMark.style.display = "inline";
}

// Form submission handling
document.getElementById("form-validation").addEventListener("submit", (e) => {
  e.preventDefault();
  const isValid =
    [...inputElement].every((input) => validateForm({ target: input })) &&
    validateMessage();

  if (isValid) {
    submitError.style.display = "none";
    console.log("Form submitted successfully!");
  } else {
    submitError.style.display = "block";
    submitError.innerHTML = "Please fix the errors before submitting.";
  }
});