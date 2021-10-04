const regEmail = /^((([0-9A-Za-z]{1}[-0-9A-z\.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я\.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$/;
const regName = /^(?=.{1,15}$)[А-Яа-яё][А-Яа-яё]*(?: [А-Яа-яё]+)*$/;
const regPhone = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;

const userName = document.querySelector("#user-name"),
  userPhone = document.querySelector("#user-phone"),
  userEmail = document.querySelector("#user-email"),
  formBtn = document.querySelector(".form__button"),
  form = document.querySelector("#form");

function regexValidite(input, regex) {
  return regex.test(input);
}

function verification(input, regex, message) {
  parent = input.closest(".form-field");
  blockError = parent.querySelector(".form-field__error-mess");

  if (!regexValidite(input.value, regex)) {
    input.classList.remove("valid");
    input.classList.add("invalid");
    blockError.textContent = message;
    if (input.value === "") {
      blockError.textContent = "Заполните поле.";
    }
  } else {
    if (input.value.length <= 5) {
      input.classList.remove("valid");
      input.classList.add("invalid");
      blockError.textContent = "Заполните поле.";
    } else {
      input.classList.remove("invalid");
      input.classList.add("valid");
      return true;
    }
  }
}

let valueName = "";
let valuePhone = "";
let valueMail = "";

userName.addEventListener("input", () => {
  valueName = verification(
    userName,
    regName,
    "Проверьте поле на правильность заполения."
  );
});
userEmail.addEventListener("input", () => {
  valueMail = verification(userEmail, regEmail, "Почта не найдена.");
});
userPhone.addEventListener("input", () => {
  valuePhone = verification(userPhone, regPhone, "Номеер не найден.");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (valueName && valueMail && valuePhone) {
    const popup = document.querySelector(".popup"),
      popupBtn = document.querySelector(".popup__close-btn"),
      checkbox = document.querySelector("#contract"),
      inputs = document.querySelectorAll("input");

    popup.classList.add("popup_open");
    popupBtn.addEventListener("click", () => {
      popup.classList.remove("popup_open");
    });

    inputs.forEach((input) => {
      input.value = "";
      input.classList.remove("valid");
    });

    checkbox.checked = false;
  } else {
    alert("Проверьте все поля на правильность заполения.");
  }
});
