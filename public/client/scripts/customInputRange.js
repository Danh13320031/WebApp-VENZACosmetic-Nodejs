const inputRangeList = document.querySelectorAll('input[type="range"]');

if (inputRangeList.length > 0) {
  const fillColor = 'rgb(245, 182, 7)';
  const emptyColor = 'rgb(240, 240, 240)';

  inputRangeList.forEach((inputRange) => {
    if (inputRange) {
      const percent =
        (100 * (inputRange.value - inputRange.min)) / (inputRange.max - inputRange.min) + '%';
      inputRange.style.background = `linear-gradient( to right, ${fillColor}, 
        ${fillColor} ${percent}, ${emptyColor} ${percent})`;

      inputRange.addEventListener('input', () => {
        const percent =
          (100 * (inputRange.value - inputRange.min)) / (inputRange.max - inputRange.min) + '%';
        inputRange.style.background = `linear-gradient( to right, ${fillColor}, 
        ${fillColor} ${percent}, ${emptyColor} ${percent})`;
      });
    }
  });
}
