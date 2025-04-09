const levels = {
  "pink": {
    name: "Pink",
    tables: [2],
    colour: "pink",
    ceiling: 10
  },
  "red": {
    name: "Red",
    tables: [2, 5],
    colour: "red",
    ceiling: 10

  },
  "orange": {
    name: "Orange",
    tables: [2, 5, 10],
    colour: "orange",
    ceiling: 10
  },
  "yellow": {
    name: "Yellow",
    tables: [2, 3, 4, 5, 10],
    colour: "yellow",
    ceiling: 10
  },
 "green": {
    name: "Green",
    tables: [2, 3, 4, 5, 8, 10],
    colour: "green",
    ceiling: 10
  },
  "blue": {
    name: "Blue",
    tables: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    colour: "blue",
    ceiling: 12
  },
  "indigo": {
    name: "Indigo",
    tables: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    colour: "indigo",
    ceiling: 10,
    inverses: true
  }
};

const shallowEqual = (obj1, obj2) =>
  Object.keys(obj1).length === Object.keys(obj2).length &&
  Object.keys(obj1).every(key => 
    obj2.hasOwnProperty(key) && obj1[key] === obj2[key]
  );

const table = document.getElementById("table");
const title = document.getElementById("title");

const urlParams = new URLSearchParams(window.location.search);
const level = levels[urlParams.get('level').toLowerCase()];

const questions = generateQuestions(40);

title.textContent = "Rainbox Maths "+ level.name + " Level 1";
title.style.backgroundColor = level.colour;

for (j = 0; j < 20; ++j) {
  const row = document.createElement("tr");

  let question = questionDetails(j * 2);
  addCell(row, question);
  addCell(row, "");
  question = questionDetails(j * 2 + 1);
  addCell(row, question);
  addCell(row, "");

  table.appendChild(row);
}

function addCell(row, text) {
  const cell = document.createElement("td");
  cell.textContent = text;
  row.appendChild(cell);
}

function questionDetails(num) {
  const question = questions[num];

  if (question.inverse) {
    return `${question.dividend} ÷ ${question.divisor}`;
  } else {
    return `${question.timesTable} x ${question.multiplier}`;
  }
}

function coinFlip() {
  return Math.random() > 0.5;
}

function generateQuestions(num) {
  let questions = [], question;
  
  for (let i = 0; i < num; ++i) {
    for (question = generateQuestion(); questions.some(q => shallowEqual(q, question)); question = generateQuestion()) {
    }
    questions.push(question);
  }
  
  return questions;
}

function generateQuestion() {
  const timesTable = level.tables[Math.floor(Math.random() * level.tables.length)];
  const multiplier = Math.floor(Math.random() * level.ceiling) + 1;
  const total = timesTable * multiplier;
  const inverse = level.inverses && coinFlip();
  if (inverse) {
    const divisor = coinFlip() ? timesTable : multiplier;
    const total = timesTable * multiplier;
    return { inverse, dividend: total, divisor, answer: divisor === timesTable ? multiplier : timesTable };
  } else if (coinFlip()) {
    return { timesTable, multiplier, answer: total };
  } else {
    return { timesTable: multiplier, multiplier: timesTable, answer: total };
  }
}
