const authShowPassword = document.querySelectorAll('.auth-show-password');

if (authShowPassword) {
  authShowPassword.forEach((item) => {
    item.addEventListener('click', () => {
      const inputPassword = document.getElementById('password');
      const inputConfirmPassword = document.getElementById('confirmPassword');
      const buttonShowPassword = document.querySelectorAll('.auth-show-password i');

      buttonShowPassword.forEach((icon) => {
        icon.classList.toggle('bi-eye');
      });

      if (inputPassword) {
        inputPassword.type = 'password'
          ? (inputPassword.type = 'text')
          : (inputPassword.type = 'password');
      }

      if (inputConfirmPassword) {
        inputConfirmPassword.type = 'password'
          ? (inputConfirmPassword.type = 'text')
          : (inputConfirmPassword.type = 'password');
      }
    });
  });
}
