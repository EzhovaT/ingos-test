const regEmail = /^((([0-9A-Za-z]{1}[-0-9A-z\.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я\.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$/;
const regName = /^(?=.{1,35}$)[А-Яа-яё][А-Яа-яё]*(?: [А-Яа-яё]+)*$/;

const userName = document.querySelector("#user-name"),
  userPhone = document.querySelector("#user-phone"),
  userEmail = document.querySelector("#user-email"),
  formBtn = document.querySelector(".form__button"),
  form = document.querySelector("#form");

  function validInput(input) {
    parent = input.closest(".form-field");
    blockError = parent.querySelector(".form-field__error-mess");

    input.classList.add("valid");
    input.classList.remove("invalid");
    blockError.textContent = "";
  }

  function inValidInput(input, mess) {
    parent = input.closest(".form-field");
    blockError = parent.querySelector(".form-field__error-mess");

    input.classList.remove("valid");
    input.classList.add("invalid");
    blockError.textContent = mess;
  }

function regexValidite(input, regex) {
  return regex.test(input);
}

function verification(input, regex, message) {
  if (!regexValidite(input.value, regex)) {
    inValidInput(input, message)
    if (input.value === "") {
      blockError.textContent = "Заполните поле.";
    }
  } else {
    if (input.value.length <= 5) {
    inValidInput(input, "Заполните поле.")
    } else {
      validInput(input)
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

function getInputNumbersValue (input) {
  return input.value.replace(/\D/g, "")
}

function onPhoneInput (e) {
  let input = e.target,
    inputNumbValue = getInputNumbersValue(input),
    formatInputValue = "",
    selectionStart = input.selectionStart;

    if(input.value.length <= 17) {
      inValidInput(input, "Номеер не найден.")
    } else {
      validInput(input);
    }

    if(!inputNumbValue) {
      return input.value = "";
    }

    //удаление символа из середины
    if(input.value.length != selectionStart) {
      if(e.data && /\D/g.test(e.data)) {
        input.value = inputNumbValue;
      }
      return;
    }

    if(['7', '8', '9'].indexOf(inputNumbValue[0])>-1) {
      if(inputNumbValue[0] == '9') inputNumbValue = "7" + inputNumbValue;
      let firstSymbols = (inputNumbValue[0] == '8') ? '8 ' : '+7';
      formatInputValue = firstSymbols + " ";
      if(inputNumbValue.length > 1) {
        formatInputValue += "(" + inputNumbValue.substring(1, 4);
      }
      if(inputNumbValue.length >= 5) {
        formatInputValue += ") " + inputNumbValue.substring(4, 7);
      }
      if(inputNumbValue.length >= 8) {
        formatInputValue += "-" + inputNumbValue.substring(7, 9);
      }
      if(inputNumbValue.length >= 10) {
        formatInputValue += "-" + inputNumbValue.substring(9, 11);
      }

    } else {
      formatInputValue = "+" + inputNumbValue;
    }

    input.value = formatInputValue;
}

function onPhoneKeyDown(e) {
  let input = e.target;
  if(e.keyCode == 8 && getInputNumbersValue(input).length == 1) {
    input.value = '';
    parent = input.closest(".form-field");
  blockError = parent.querySelector(".form-field__error-mess");
  input.classList.remove("valid");
  input.classList.add("invalid");
  blockError.textContent = "Заполните поле.";
  }
}

//вставка текста в инпут
function onPhonePaste(e) {
  let pasted = e.clipboardData || window.clipboardData,
  input = e.target,
  inputNumbValue = getInputNumbersValue(input);

  if(pasted) {
    let pastedText = pasted.getData('Text');
    if(/\D/g.test(pastedText)) {
      input.value = inputNumbValue;
    }
  }
}

userPhone.addEventListener('input', onPhoneInput);
userPhone.addEventListener('keydown', onPhoneKeyDown);
userPhone.addEventListener('paste', onPhonePaste);

function verSub( ...inputs) {
  let res = inputs.every(input => input.classList.contains('valid'))
  if(res) {
    formBtn.classList.add('active');
  } else {
    formBtn.classList.remove('active');
  }
}

form.addEventListener("input", () => {verSub(userName, userEmail, userPhone)});

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

    formBtn.classList.remove('active');

    checkbox.checked = false;
  } else {
    alert("Проверьте все поля на правильность заполения.");
  }
});
