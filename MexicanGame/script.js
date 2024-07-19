let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["palo"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: 'palo', power: 5 },
  { name: 'filero', power: 30 },
  { name: 'machete', power: 50 },
  { name: 'pistola', power: 100 }
];
const monsters = [
  {
    name: "chiriguillo",
    level: 2,
    health: 15
  },
  {
    name: "policia",
    level: 8,
    health: 60
  },
  {
    name: "gentrificador",
    level: 20,
    health: 300
  }
]
const locations = [
  {
    name: "town square",
    "button text": ["Entrar al oxxo", "Ir a Tepito", "Vencer al gentrificador"],
    "button functions": [goOxxo, goTepito, fightGentrificador],
    text: "Estás en el Zócalo. A lo lejos ves un letrero que dice \"Oxxo\", la cerveza está en descuento y hoy el metro es gratis. La vida es buena."
  },
  {
    name: "store",
    "button text": ["Comprar coronita (10 pesos)", "Comprar arma (30 pesos)", "Ir al Zócalo"],
    "button functions": [buyHealth, buyWeapon, goZocalo],
    text: "Has entrado al Oxxo, hay fila, pero una caja está abierta. ¿Qué quieres hacer?"
  },
  {
    name: "cave",
    "button text": ["Vencer al chiriguillo", "Vencer al policia", "Ir al Zócalo"],
    "button functions": [fightchiriguillo, fightBeast, goZocalo],
    text: "Entraste a Tepito. Te has encontrado con algunos masiosares con ganas de robarte la quincena. ¡Mucha suerte Vaquero! "
  },
  {
    name: "fight",
    "button text": ["Ataca", "Esquiva", "¡Corre perra, corre!"],
    "button functions": [attack, dodge, goZocalo],
    text: "Estas peleandote la vida."
  },
  {
    name: "kill monster",
    "button text": ["Ir al Zócalo", "Ir al Zócalo", "Ir al Zócalo"],
    "button functions": [goZocalo, goZocalo, easterEgg],
    text: 'El masiosare grito "¡No mames!" mientras moría. Ganaste experiencia y encontraste lana en su cartera.'
  },
  {
    name: "lose",
    "button text": ["Restaurar tu honor", "Enorgullecer a mamá", "Volver a jugar"],
    "button functions": [restart, restart, restart],
    text: "Tus padres tenían razón, fallas en todo y ahora estas muerto. &#x2620;"
  },
  { 
    name: "win", 
    "button text": ["Volver a jugar", "Volver a jugar", "Volver a jugar"], 
    "button functions": [restart, restart, restart], 
    text: "¡Has vencido al gentrificador! Este mes no te subirán la renta ¡FELICIDADES! &#x1F389;" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Ir al Zócalo?"],
    "button functions": [pickTwo, pickEight, goZocalo],
    text: "Encontraste un minigame. Escoge un número. 10 números serán elegidos aleatoriamente entre el 0 y el 10 . Si el número que escoges es igual al número aleatorio, tú ganas!"
  }
];

// initialize buttons
button1.onclick = goOxxo;
button2.onclick = goTepito;
button3.onclick = fightGentrificador;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
}

function goZocalo() {
  update(locations[0]);
}

function goOxxo() {
  update(locations[1]);
}

function goTepito() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "No tienes suficiente dinero para tu cervecita.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "Ahora tienes esta arma: " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " En tu inventario tienes: " + inventory;
    } else {
      text.innerText = "No tienes suficiente dinero para comprar un arma.";
    }
  } else {
    text.innerText = "¡Ya tienes el arma más mamalona!";
    button2.innerText = "Vende tu arma por 15 pesos";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "Vendiste tu " + currentWeapon + ".";
    text.innerText += " En tu inventario tienes: " + inventory;
  } else {
    text.innerText = "Alto ahí loca, ¡No vendas tu única arma!";
  }
}

function fightchiriguillo() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightGentrificador() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "El " + monsters[fighting].name + " te ataca.";
  text.innerText += " Tú atacas con tu " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " Fallaste.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Tu " + inventory.pop() + " se rompió.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "Esquivaste el ataque del " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["palo"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goZocalo();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "Escogiste " + guess + ". Aquí estan los números aleatorios:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "¡Bien! ¡Ganaste 20 pesos!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "¡Puuuuu! ¡Perdiste 10 de vida!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}