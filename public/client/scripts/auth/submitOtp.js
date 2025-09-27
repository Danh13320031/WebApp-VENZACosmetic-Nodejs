const otpForm = document.getElementById('otp-form');

if (otpForm) {
  const otpInputList = otpForm.querySelectorAll('.otp-input');
  let otpString = [];

  otpInputList.forEach((otpInput, index) => {
    otpInput.addEventListener('input', (e) => {
      let otpInputValue = e.target.value;
      otpInputValue = otpInputValue.replace(/[^0-9]/g, '');

      if (otpInputValue.length > 1) {
        otpInputValue = otpInputValue.charAt(0);
      }

      e.target.value = otpInputValue;

      if (otpInputValue && index < otpInputList.length - 1) {
        otpInputList[index + 1].focus();
      }

      if (otpInputValue && otpString.length < otpInputList.length) {
        otpString.push(otpInputValue);
      }

      if (otpInputValue === '' && index > 0) {
        otpInputList[index - 1].focus();
      }

      if (otpInputValue === '' && otpString.length > 0) {
        otpString = otpString.filter((otp, idx) => idx !== index);
      }

      if (otpString.length === otpInputList.length) {
        otpForm.submit();
      }
    });
  });
}
