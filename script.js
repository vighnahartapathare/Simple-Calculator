let current = '0';
const result = document.getElementById('result');
const buttons = document.querySelectorAll('#buttons button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    calculate(button.innerText);
  });
});

function calculate(value) {
  if (!isNaN(value)) {
    current = current === '0' ? value : current + value;
  } else {
    switch (value) {
      case 'C':
        current = '0';
        break;

      case 'DEL':
        current = current.slice(0, -1);
        if (current === '' || current === '-') current = '0';
        break;

      case '.':
        if (!current.includes('.')) current += '.';
        break;

      case '+':
      case '-':
      case '/':
        current = current.replace(/[\/\*\-\+\s]+$/, '') + ' ' + value + ' ';
        break;

      case 'x':
        current = current.replace(/[\/\*\-\+\s]+$/, '') + ' * ';
        break;

      case '%':
        current = current.replace(/[\/\*\-\+\s]+$/, '') + ' % ';
        break;

      case '=':
        try {
          const value = eval(current.replace(/X/g, '*'));
          current = Number.isInteger(value)
            ? value.toString()
            : value.toFixed(3);
        } catch {
          current = 'Error';
        }
        break;
    }
  }

  result.style.fontSize =
    Math.min(Math.ceil(580 / current.length), 32) + 'px';
  result.innerText = current;
}

window.addEventListener('keydown', e => {
  if (e.key === 'Backspace') calculate('DEL');
  else if (e.key === 'Enter') calculate('=');
  else if (e.key === '*') calculate('X');
  else calculate(e.key);
});