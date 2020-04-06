const addUser = document.getElementById('add-user');
const double = document.getElementById('double');
const showMillionaires = document.getElementById('show-millionaires');
const sort = document.getElementById('sort');
const calculateWealth = document.getElementById('calculate-wealth');
const main = document.getElementById('main');

let data = [];

// Get 3 users for start
getUser();
getUser();
getUser();

// Fetch user
async function getUser() {
  let response = await fetch('https://randomuser.me/api/');
  let data = await response.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

// Double everyones money
// map() returns new array
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM(); // data is passed in by default
}

// Sort users by richest
function sortByRichest() {
  data.sort((a, b) => {
    return b.money - a.money;
  });

  updateDOM(); // data is passed in by default
}

// Filter only millionaires
function showOnlyMillionaires() {
  data = data.filter((user) => {
    return user.money > 1000000;
  });

  updateDOM(); // data is passed in by default
}

// Calculate the total wealth
function calculateAllWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;

  main.appendChild(wealthEl);
}

// Add new obj to data arr
function addData(obj) {
  data.push(obj);

  updateDOM(); // data is passed in by default
}

// Update DOM (If nothing is passed in, use data array as default)
function updateDOM(providedData = data) {
  // Clear main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  // Loop through data and display users on DOM
  providedData.forEach((user) => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${user.name}</strong> ${formatMoney(
      user.money
    )}$`;
    main.appendChild(element);
  });
}

// Format number as money
function formatMoney(number) {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event Listeners
addUser.addEventListener('click', getUser);
double.addEventListener('click', doubleMoney);
showMillionaires.addEventListener('click', showOnlyMillionaires);
sort.addEventListener('click', sortByRichest);
calculateWealth.addEventListener('click', calculateAllWealth);
