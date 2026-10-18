// 問題データ（answer は正解の選択肢の番号。0 から数える）
const quizData = [
  {
    question: "日本で一番高い山はどれでしょう？",
    choices: ["北岳", "富士山", "槍ヶ岳", "奥穂高岳"],
    answer: 1,
  },
  {
    question: "1週間は全部で何時間でしょう？",
    choices: ["120時間", "144時間", "168時間", "192時間"],
    answer: 2,
  },
  {
    question: "太陽系で一番大きい惑星はどれでしょう？",
    choices: ["土星", "地球", "海王星", "木星"],
    answer: 3,
  },
  {
    question: "北半球で、1年のうち昼の時間が最も長い日を何というでしょう？",
    choices: ["夏至", "冬至", "春分", "秋分"],
    answer: 0,
  },
  {
    question: "水が凍り始める温度（1気圧のとき）は何℃でしょう？",
    choices: ["-10℃", "0℃", "4℃", "100℃"],
    answer: 1,
  },
];

const progressEl = document.getElementById("progress");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const feedbackEl = document.getElementById("feedback");
const nextButton = document.getElementById("next-button");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const scoreEl = document.getElementById("score");
const messageEl = document.getElementById("message");
const retryButton = document.getElementById("retry-button");

let currentIndex = 0;
let score = 0;

// 問題を表示する
function showQuestion() {
  const quiz = quizData[currentIndex];

  progressEl.textContent = `第${currentIndex + 1}問 / 全${quizData.length}問`;
  questionEl.textContent = quiz.question;
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";
  nextButton.hidden = true;
  choicesEl.innerHTML = "";

  quiz.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.className = "choice";
    button.textContent = choice;
    button.addEventListener("click", () => checkAnswer(index));
    choicesEl.appendChild(button);
  });
}

// 回答を判定してフィードバックを表示する
function checkAnswer(selectedIndex) {
  const quiz = quizData[currentIndex];
  const buttons = choicesEl.querySelectorAll(".choice");

  buttons.forEach((button) => {
    button.disabled = true;
  });
  buttons[quiz.answer].classList.add("correct");

  if (selectedIndex === quiz.answer) {
    score++;
    feedbackEl.textContent = "⭕ 正解！";
    feedbackEl.classList.add("correct");
  } else {
    buttons[selectedIndex].classList.add("wrong");
    feedbackEl.textContent = `❌ 不正解… 正解は「${quiz.choices[quiz.answer]}」です。`;
    feedbackEl.classList.add("wrong");
  }

  const isLast = currentIndex === quizData.length - 1;
  nextButton.textContent = isLast ? "結果を見る" : "次の問題へ";
  nextButton.hidden = false;
}

// 結果を表示する
function showResult() {
  quizScreen.hidden = true;
  resultScreen.hidden = false;
  scoreEl.textContent = `${quizData.length}問中${score}問正解`;

  messageEl.textContent = resultMessages[score];
}

// 正解数ごとのコメント（添え字が正解数）
const resultMessages = [
  "0問…？逆にすごい。全部外すほうが難しいんですけど？",
  "1問だけ？まぐれ当たりって言われても反論できませんね。",
  "2問かぁ。「一般常識」って書いてあったの、見えてました？",
  "3問。まあ、ギリギリ常識人ってことにしておいてあげます。",
  "4問！惜しい…けど、その1問が一番大事だったんですよ？",
  "全問正解！…どうせ答え見たんでしょ？もう一回やってみます？",
];

nextButton.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < quizData.length) {
    showQuestion();
  } else {
    showResult();
  }
});

retryButton.addEventListener("click", () => {
  currentIndex = 0;
  score = 0;
  resultScreen.hidden = true;
  quizScreen.hidden = false;
  showQuestion();
});

showQuestion();
