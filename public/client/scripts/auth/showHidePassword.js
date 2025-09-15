const registerShowPassword = document.querySelectorAll('.register-show-password');

if (registerShowPassword) {
  registerShowPassword.forEach((item) => {
    item.addEventListener('click', () => {
      const inputPassword = document.getElementById('password');
      const inputConfirmPassword = document.getElementById('confirmPassword');
      const buttonShowPassword = document.querySelectorAll('.register-show-password i');

      buttonShowPassword.forEach((icon) => {
        icon.classList.toggle('bi-eye');
      });

      if (inputPassword.type === 'password' && inputConfirmPassword.type === 'password') {
        inputPassword.type = 'text';
        inputConfirmPassword.type = 'text';
      } else {
        inputPassword.type = 'password';
        inputConfirmPassword.type = 'password';
      }
    });
  });
}
