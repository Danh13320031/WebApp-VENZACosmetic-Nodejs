const registerVerifyDuration = document.querySelector('.register-verify-duration');

if (registerVerifyDuration) {
  const duration = registerVerifyDuration.textContent;
  let totalSeconds = Number.parseInt(duration) * 60;

  const updateTimeDisplay = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    registerVerifyDuration.textContent = `${m}:${s.toString().padStart(2, '0')}`;
  };

  const interval = setInterval(() => {
    totalSeconds -= 1;
    updateTimeDisplay(totalSeconds);
    if (totalSeconds === 0) {
      clearInterval(interval);
      window.location.href = `http://127.0.0.1:5000/register`;
      alert('Token đã hết hạn');
    }
  }, 1000);
}
