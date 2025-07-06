const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
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

const toggleButtonState = (inputList,  modalSubmitButtonEl, config) => {
  if (hasInvalidInput(inputList)) {
    disabledButton( modalSubmitButtonEl, config);
  } else {
     modalSubmitButtonEl.classList.remove(config.inactiveButtonClass);
     modalSubmitButtonEl.disabled = false;
  }
};

const disabledButton = ( modalSubmitButtonEl, config) => {
   modalSubmitButtonEl.classList.add(config.inactiveButtonClass);
   modalSubmitButtonEl.disabled = true;
};

const setEventListeners = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const  modalSubmitButtonEl = formEl.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList,  modalSubmitButtonEl, config);

  inputList.forEach((inputEl, congif) => {
    inputEl.addEventListener("input", function () {
      checkInputValidity(inputEl, config);
      toggleButtonState(inputList,  modalSubmitButtonEl, config);
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
