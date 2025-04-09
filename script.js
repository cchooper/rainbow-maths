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
    ceiling: 12,
    inverses: true
  },
  "violet": {
    name: "Vuiolet",
    tables: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    colour: "violet",
    ceiling: 12,
    inverses: true
  },
  "bronze": {
    name: "Bronze",
    tables: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    colour: "#cd7f32",
    ceiling: 12,
    inverses: true
  },
  "silver": {
    name: "Silver",
    tables: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    colour: "silver",
    ceiling: 10,
    inverses: true,
    squares: true,
    fractions: true
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

title.textContent = "Rainbow Maths "+ level.name;
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
  cell.innerHTML = text;
  row.appendChild(cell);
}

function questionDetails(num) {
  const question = questions[num];

  switch (question.questionType) {
    case "multiple":
      return `${question.timesTable} x ${question.multiplier}`;
    case "square":
      return `${question.timesTable} <sup>2</sup>`;
    case "inverse":
      return `${question.dividend} ÷ ${question.divisor}`;
  }
}

function coinFlip() {
  return Math.random() > 0.5;
}

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
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
  const questionTypes = ["multiple"];
  if (level.squares) questionTypes.push("square");
  //if (level.fractions) questionTypes.push("fraction");
  if (level.inverses) questionTypes.push("inverse");

  const questionType = randomChoice(questionTypes);

  const timesTable = randomChoice(level.tables);
  const multiplier = Math.floor(Math.random() * level.ceiling) + 1;
  const total = timesTable * multiplier;

  if (questionType === "inverse") {
    const divisor = coinFlip() ? timesTable : multiplier;
    const total = timesTable * multiplier;
    return { questionType, dividend: total, divisor, answer: divisor === timesTable ? multiplier : timesTable };
  } else if (questionType === "square") {
    return { questionType, timesTable };
  } else if (coinFlip()) {
    return { questionType, timesTable, multiplier, answer: total };
  } else {
    return {questionType, timesTable: multiplier, multiplier: timesTable, answer: total };
  }
}
