const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
};

const showInputError = (inputEl, config) => {
  const errorMsgEl = document.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.classList.add(config.inputErrorClass);
  errorMsgEl.textContent = inputEl.validationMessage;
};

const hideInputError = (inputEl, config) => {
  const errorMsgEl = document.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(config.inputErrorClass);
  errorMsgEl.textContent = "";
};

const checkInputValidity = (inputEl, config) => {
  if (!inputEl.validity.valid) {
    showInputError(inputEl, config);
  } else {
    hideInputError(inputEl, config);
  }
};

const hasInvalidInput = (inputList, config) => {
  return inputList.some((input, config) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonEl, config) => {
  if (hasInvalidInput(inputList)) {
    disabledButton(buttonEl, config);
  } else {
    buttonEl.classList.remove(config.inactiveButtonClass);
    buttonEl.disabled = false;
  }
};

const disabledButton = (buttonEl, config) => {
  buttonEl.classList.add(config.inactiveButtonClass);
  buttonEl.disabled = true;
};

const setEventListeners = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonEl = formEl.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonEl, config);

  inputList.forEach((inputEl, congif) => {
    inputEl.addEventListener("input", function () {
      checkInputValidity(inputEl,  config);
      toggleButtonState(inputList, buttonEl, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(formEl, config);
  });
};

enableValidation(settings);

