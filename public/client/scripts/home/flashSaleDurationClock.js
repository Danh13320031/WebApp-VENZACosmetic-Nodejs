const flashSaleDuration = document.querySelector('div[card-flash-sale-time]');

if (flashSaleDuration) {
  const time = flashSaleDuration.getAttribute('data-time');
  const timeArr = time.split(':');

  let dayNumber = timeArr[0];
  let hourNumber = timeArr[1];
  let minuteNumber = timeArr[2];
  let secondNumber = timeArr[3];

  let totalSeconds = Number.parseInt(dayNumber) * 24 * 60 * 60;
  totalSeconds += Number.parseInt(hourNumber) * 60 * 60;
  totalSeconds += Number.parseInt(minuteNumber) * 60;
  totalSeconds += Number.parseInt(secondNumber);

  const updateTimeDisplay = (totalSeconds) => {
    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    flashSaleDuration.textContent = `${days} days : ${hours} hours : ${minutes} minutes : ${seconds} seconds`;
  };

  const flashSaleDurationClock = setInterval(() => {
    if (totalSeconds === 0) {
      clearInterval(flashSaleDurationClock);
      return;
    }
    totalSeconds -= 1;
    updateTimeDisplay(totalSeconds);
  }, 1000);
}
