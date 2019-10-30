const canvas = document.querySelector("#canvas");
const c = canvas.getContext("2d");

const generatedQuote = document.querySelector(".generated-quote");
const genBtn = document.querySelector(".gen-btn");

// setting size
canvas.height = window.innerHeight - 5;
canvas.width = window.innerWidth - 5;

window.addEventListener("resize", e => {
  canvas.height = window.innerHeight - 5;
  canvas.width = window.innerWidth - 5;
});

// setting size variables
const APP_HEIGHT = canvas.height;
const APP_WIDTH = canvas.width;

class Random {
  randInt(minNum, maxNum) {
    this.minNum = minNum;
    this.maxNum = maxNum;

    let randInt = Math.random() * maxNum + minNum;

    return randInt;
  }

  randColor(col1, col2, col3, col4, col5) {
    this.col1 = col1;
    this.col2 = col2;
    this.col3 = col3;
    this.col4 = col4;
    this.col5 = col5;

    let colors = [this.col1, this.col2, this.col3, this.col4, this.col5];
    let randCol = colors[Math.floor(Math.random() * colors.length)];

    return randCol;
  }
}

class QuoteGenerator {
  genQuote() {
    this.startQuote = [
      '" A fire, ',
      '" The fire, ',
      '" The firey warmth, ',
      '" The glowing flames, ',
      '" The heat of the embers, '
    ];
    this.midQuote = [
      "where the soul ",
      "where the tired soul ",
      "where the pensive mind ",
      "where the lost ",
      "where bonds "
    ];
    this.endQuote = [
      ' will be tried... "',
      ' will surely be refined... "',
      ' will surely be devoured... "',
      ' will be truly found... "',
      ' will surely find allayment... "'
    ];
    let randStart = this.startQuote[
      Math.floor(Math.random() * this.startQuote.length)
    ];
    let randMid = this.midQuote[
      Math.floor(Math.random() * this.midQuote.length)
    ];
    let randEnd = this.endQuote[
      Math.floor(Math.random() * this.endQuote.length)
    ];
    let randQuote = `${randStart} ${randMid} ${randEnd}`;
    return randQuote;
  }

  showQuote() {
    genBtn.addEventListener("click", () => {
      generatedQuote.innerHTML = "";
      genBtn.classList.add("disabled");
      genBtn.classList.remove("enabled");
      genBtn.disabled = true;
      typewriter();
    });
  }
}

class Animate {
  hoverPrimary(element, fBgColor, sBgColor, fColor, sColor) {
    this.element = element;
    this.fColor = fColor;
    this.sColor = sColor;
    this.fBgColor = fBgColor;
    this.sBgColor = sBgColor;
    this.element.addEventListener("mouseenter", e => {
      this.element.style.color = this.fColor;
      this.element.style.backgroundColor = this.fBgColor;
    });

    this.element.addEventListener("mouseout", e => {
      this.element.style.color = this.sColor;
      this.element.style.backgroundColor = this.sBgColor;
    });
  }
}

class Particle {
  constructor(appHeight, appWidth, size, x, y, dx, dy, color) {
    this.appHeight = appHeight;
    this.appWidth = appWidth;
    this.size = size;
    this.color = color;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
  }

  draw(c) {
    c.beginPath();
    c.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.shadowColor = this.color;
    c.shadowBlur = 10;
    c.fill();
    c.closePath();
  }

  update(dt) {
    this.y += this.dy;
    this.x += this.dx;
  }
}

// Objects
let particles = [];
let random = new Random();
const quoteGen = new QuoteGenerator();
const animate = new Animate();

// App loop
let lastTime = 0;
let ticker = 0;
let randomSpawnRate = 10;

function appLoop(timeStamp) {
  let dt = timeStamp - lastTime;
  lastTime = timeStamp;
  c.clearRect(0, 0, APP_WIDTH, APP_HEIGHT);

  particles.forEach(object => object.draw(c));
  particles.forEach(object => object.update(dt));

  ticker++;

  if (ticker % randomSpawnRate == 0) {
    const x = random.randInt(0, APP_WIDTH);
    particles.push(
      new Particle(
        APP_HEIGHT,
        APP_WIDTH,
        random.randInt(1, 4),
        x,
        APP_HEIGHT + 10,
        random.randInt(-0.5, 1),
        random.randInt(-0.5, -2),
        random.randColor("#F7C97C", "#DD6F6F", "#BA1F33", "#9E2A2B", "#FA9958")
      )
    );
  }

  requestAnimationFrame(appLoop);
}

requestAnimationFrame(appLoop);

// Typewriter effect

let i = 0;
let quote = quoteGen.genQuote();
function typewriter() {
  if (i < quote.length) {
    generatedQuote.innerHTML += quote.charAt(i);
    i++;
    setTimeout(() => {
      typewriter();
    }, 80);
  } else {
    i = -1;
    genBtn.classList.remove("disabled");
    genBtn.classList.add("enabled");
    genBtn.disabled = false;
    quote = quoteGen.genQuote();
  }
}

quoteGen.showQuote();
console.log(quoteGen.genQuote());

// function calls

animate.hoverPrimary(
  genBtn,
  "#f4bc8c",
  "rgba(0, 0, 0, 0)",
  "#d65050",
  "#f4bc8c"
);
animate.clickPrimary(genBtn);
