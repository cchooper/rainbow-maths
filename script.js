const levels = {
  "pink": {
    name: "Pink",
    tables: [2],
    colour: "pink"
  },
  "red": {
    name: "Red",
    tables: [2, 5],
    colour: "red"
  },
  "orange": {
    name: "Orange",
    tables: [2, 5, 10],
    colour: "orange"
  },
  "yellow": {
    name: "Yellow",
    tables: [2, 3, 4, 5, 10],
    colour: "yellow"
  },
 "green": {
    name: "Green",
    tables: [2, 3, 4, 5, 8, 10],
    colour: "green"
  },
  "blue": {
    name: "Blue",
    tables: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    colour: "blue"
  }
};

const table = document.getElementById("table");
const title = document.getElementById("title");

const urlParams = new URLSearchParams(window.location.search);
const level = levels[urlParams.get('level').toLowerCase()];

title.textContent = "Rainbox Maths "+ level.name + " Level 1";
title.style.backgroundColor = level.colour;

for (j = 0; j < 20; ++j) {
  const row = document.createElement("tr");

  let question = generateQuestion();
  addCell(row, question);
  addCell(row, "");
  question = generateQuestion();
  addCell(row, question);
  addCell(row, "");

  table.appendChild(row);
}

function addCell(row, text) {
  const cell = document.createElement("td");
  cell.textContent = text;
  row.appendChild(cell);
}

function generateQuestion() {
  const timesTable = level.tables[Math.floor(Math.random() * level.tables.length)];
  const multiplier = Math.floor(Math.random() * 10) + 1;
  const question = Math.random() > 0.5 ?  `${timesTable} x ${multiplier}` : `${multiplier} x ${timesTable}`;
  return question;
}
