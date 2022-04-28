function init() {
  // Select the buttons
  var printButton = document.getElementById('print');
  var toggleButton = document.getElementById('toggle');
  var printa1Button = document.getElementById('printa1');
  var printa2Button = document.getElementById('printa2');
  // Attach the keypress and click handlers to the print buttons
  printButton.addEventListener('click', printButtonEventHandler);
  printButton.addEventListener('keydown', printButtonEventHandler);
  printa1Button.addEventListener('click', printButtonEventHandler);
printa1Button.addEventListener('keydown', printButtonEventHandler);
  printa2Button.addEventListener('click', printButtonEventHandler);
printa2Button.addEventListener('keydown', printButtonEventHandler);
  // Attach the keypress and click handlers to the toggle button
  toggleButton.addEventListener('click', toggleButtonEventHandler);
  toggleButton.addEventListener('keydown', toggleButtonEventHandler);
}
function toggleButtonEventHandler(event) {
  var type = event.type;
  // Check the event type
  if (type === 'keydown') {
    // If the user pressed Enter (13) or Space (32), call toggle function
    if (event.keyCode === 13 || event.keyCode === 32) {
      toggleButtonState(event);
      event.preventDefault();
    }
  }
  // If the user clicked their left mouse button, call toggle function
  else if (type === 'click') {
    toggleButtonState(event);
  }
}
function toggleButtonState(event) {
  // Select the button
  var button = event.target;
  // Get the button’s current state
  var currentState = button.getAttribute('aria-pressed');
  // The state that the button will be set to
  var newState = 'true';
  // If aria-pressed is currently true, switch newState to false
  if (currentState === 'true') {
    newState = 'false';
  }
  // Apply the new aria-pressed state to the button
  button.setAttribute('aria-pressed', newState);
}

function printButtonEventHandler(event) {
  var type = event.type;
  // Check the event type
  if (type === 'keydown') {
    // If the user pressed Enter (13) or Space (32), call print function
    if (event.keyCode === 13 || event.keyCode === 32) {
      window.print();
      event.preventDefault();
    }
  }
  // If the user clicked their left mouse button, call print function
  else if (type === 'click') {
    window.print();
  }
}
// Call the initialisation function when the page has loaded
window.onload = init;