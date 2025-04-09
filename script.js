const levels = {
  "pink": {
    name: "Pink",
    tables: [2],
    colour: "pink",
    ceiling: 10,
    questions: 10
  },
  "red": {
    name: "Red",
    tables: [2, 5],
    colour: "red",
    ceiling: 10,
    questions: 10
  },
  "orange": {
    name: "Orange",
    tables: [2, 5, 10],
    colour: "orange",
    ceiling: 10,
    questions: 20
  },
  "yellow": {
    name: "Yellow",
    tables: [2, 3, 4, 5, 10],
    colour: "yellow",
    ceiling: 10,
    questions: 40
  },
 "green": {
    name: "Green",
    tables: [2, 3, 4, 5, 8, 10],
    colour: "green",
    ceiling: 10,
    questions: 40
  },
  "blue": {
    name: "Blue",
    tables: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    colour: "blue",
    ceiling: 12,
    questions: 40
  },
  "indigo": {
    name: "Indigo",
    tables: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    colour: "indigo",
    ceiling: 12,
    inverses: true,
    questions: 40
  },
  "violet": {
    name: "Violet",
    tables: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    colour: "violet",
    ceiling: 12,
    inverses: true,
    questions: 40
  },
  "bronze": {
    name: "Bronze",
    tables: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    colour: "#cd7f32",
    ceiling: 12,
    inverses: true,
    questions: 40
  },
  "silver": {
    name: "Silver",
    tables: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    colour: "silver",
    ceiling: 10,
    inverses: true,
    squares: true,
    fractions: true,
    questions: 40
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

if (!level) {
  level = levels["yellow"];
}

const questions = generateQuestions(level.questions);

title.textContent = "Rainbow Maths "+ level.name;
title.style.backgroundColor = level.colour;

for (j = 0; j < questions.length / 2; ++j) {
  const row = document.createElement("tr");

  let question = questionDetails(j * 2);
  addCell(row, question, "question");
  addCell(row, "", "answer", {questionNumber: j * 2, editable: true});
  addCell(row, question.answer, "correct-answer hidden");
  question = questionDetails(j * 2 + 1);
  addCell(row, question, "question");
  addCell(row, "", "answer", {questionNumber: j * 2 + 1, editable: true});

  table.appendChild(row);
}

function addCell(row, text, classNames, { questionNumber, editable = false } = {}) {
  const cell = document.createElement("td");
  cell.innerHTML = text;
  cell.contentEditable = editable;
  classNames.split(" ").forEach(name => cell.classList.add(name));
  cell.id = "q" + questionNumber;
  cell.addEventListener("keydown", e => {
    if (e.key == "Enter") {
      e.preventDefault();
      let next = table.querySelector("#q" + (questionNumber + 1));
      if (!next) {
        next = table.querySelector("#q0");
      }
      next.focus();
    }
  });
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
