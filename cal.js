// Get references to the display and calculator keys
const display = document.getElementById('display');
const keys = document.querySelector('.calculator-keys');

// Handle button clicks
keys.addEventListener('click', (event) => {
  const { target } = event; // Destructuring assignment to get the target from event
  const { value } = target; // Destructuring assignment to get the value from target

  if (!target.matches('button')) return; // Only process if a button is clicked

  switch (target.textContent) {
    case 'C':
      clearDisplay();
      break;
    case '%':
      calculatePercentage();
      break;
    case '<=':
      backspace();
      break;
    case '=':
      calculateResult();
      break;
    case '+/-':
      toggleSign();
      break;
    case '.':
      addDecimal();
      break;
    default:
      if (isOperator(target.textContent)) {
        if (display.value === '' || isOperator2(display.value.slice(-1))) {
          return; // Prevent two operators from being entered simultaneously
        }
      }
      inputToDisplay(target.textContent);
      break;
  }
});

// Clear the display
function clearDisplay() {
  display.value = '';
}

// Backspace function to remove last character
function backspace() {
  display.value = display.value.slice(0, -1);
}

// Add input to the display
function inputToDisplay(input) {
  if ( display.value === 'Infinity') {
    display.value = input;
  } else {
    display.value += input;
  }
}

// Calculate percentage
function calculatePercentage() {
  display.value = String(eval(display.value ) + '%');
}



// Calculate and display the result
function calculateResult() {
  try {
    // Remove last operator if present
    if (isOperator(display.value.slice(-1))) {
      display.value = display.value.slice(0, -1);
    }
    // Evaluate the expression
    const result = eval(display.value);
    // Set the result to the display
    display.value = String(result);
  } catch (error) {
    // Show error message on invalid input
    display.value = 'Error';
  }
}

// Toggle sign of the number
// function toggleSign() {
//   if (display.value.startsWith('-')) {
//     display.value = display.value.slice(1);
//   } else {
//     display.value = '-' + display.value;
//   }
// }

// Add decimal point to the number
function addDecimal() {
  if (!display.value.includes('.')) {
    
    display.value += '.';
  }

}

// Check if a character is an operator
function isOperator(char) {
  return ['+', '-', '*', '/', '%'].includes(char);
}
// This is only for power function 
function isOperator2(char) {
  return ['+', '-', '/', '%'].includes(char);
}

// Add keyboard support
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'Enter':
      calculateResult();
      break;
    case 'Backspace':
      backspace();
      break;
    case 'Escape':
      clearDisplay();
      break;
    case '.':
      addDecimal();
      break;
    default:
      if (event.key.match(/^\d+$/)) {
        inputToDisplay(event.key);
      } else if (isOperator(event.key)) {
        if (display.value === '' || isOperator(display.value.slice(-1))) {
          return; // Prevent two operators from being entered simultaneously
        }
        inputToDisplay(event.key);
      }
      break;
  }
});