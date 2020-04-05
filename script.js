const addUser = document.getElementById('add-user');
const double = document.getElementById('double');
const showMillionaires = document.getElementById('show-millionaires');
const sort = document.getElementById('sort');
const calculateWealth = document.getElementById('calculate-wealth');
const main = document.getElementById('main');

let data = [];

getUser();
getUser();
getUser();

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

// Add new obj to data arr
function addData(obj) {
  data.push(obj);
}

// Event listeners
addUser.addEventListener('click', () => {});
