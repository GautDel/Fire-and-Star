// CANVAS
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

// DOM
const showerBtn = document.querySelector(".quote-gen_btn-star");
const cometBtn = document.querySelector(".quote-gen_btn-comet");
const quotesCont = document.querySelector(".quote-gen-multi");
const genQuote = document.querySelector(".quote-gen_gen");
const genTitle = document.querySelector(".quote-gen_title");
const genCursor = document.querySelector(".quote-gen_cursor");
const starContainer = document.querySelector(".starshower_container");
const starTitle = document.querySelector(".starshower_title");
const starSubtitle = document.querySelector(".starshower_subtitle");
const starOptions = document.querySelector(".starshower_options");
const starOpt = document.querySelectorAll(".starshower_opt");
const starOpt1 = document.querySelector(".opt-1");
const starOpt2 = document.querySelector(".opt-2");
const starOpt3 = document.querySelector(".opt-3");
const starOpt4 = document.querySelector(".opt-4");
const starOpt5 = document.querySelector(".opt-5");
const uniBtn = document.querySelector(".reset-container_uni");
const resetBtn = document.querySelector(".reset-container_strike");
const resetCont = document.querySelector(".reset-container");
let quotesEl;

// Classes
class Rand {
  int(min, max) {
    return Math.floor(Math.random() * max + min);
  }

  color() {
    this.col1 = "#EBEFF1";
    this.col2 = "#CFFBFF";
    this.col3 = "#BEEEEF";
    this.col4 = "#BCEAFD";
    this.col5 = "#C0FCE1";

    let colors = [this.col1, this.col2, this.col3, this.col4, this.col5];
    let randColors = colors[Math.floor(Math.random() * colors.length)];

    return randColors;
  }
}

class Typewriter {
  type() {
    if (i < quote.length) {
      genQuote.innerHTML += quote.charAt(i);
      i++;

      setTimeout(() => {
        this.type();
      }, 80);
    } else {
      cometBtn.disabled = false;
      cometBtn.classList.add("move-in-left");
      showerBtn.classList.add("move-in-right");
    }
  }
}

class QuoteGen {
  constructor() {
    this.startQuote = [
      '" The stars, ',
      '" Stars ',
      '" The Moon and stars, ',
      '" Shooting stars, ',
      '" Stars, like diamonds, '
    ];
    this.midQuote = [
      "light up ",
      "pierce through ",
      "shine in ",
      "shimmer in ",
      "illuminate "
    ];
    this.endQuote = [
      'the night sky... "',
      'the darkness... "',
      'the gloom... "',
      'the twilight...  "',
      'the gloom... "'
    ];
  }
  randQuote() {
    this.randStart = this.startQuote[
      Math.floor(Math.random() * this.startQuote.length)
    ];

    this.randMiddle = this.midQuote[
      Math.floor(Math.random() * this.midQuote.length)
    ];
    this.randEnd = this.endQuote[
      Math.floor(Math.random() * this.endQuote.length)
    ];

    this.generatedQuote = `${this.randStart} ${this.randMiddle} ${
      this.randEnd
    }`;

    return this.generatedQuote;
  }

  genQuotes() {
    this.selQuotes = [];
    this.selQuotes.push(this.randQuote(i));
    this.quotes = document.createTextNode(this.selQuotes);
    quotesEl = document.createElement("p");
    quotesEl.classList.add("generated-para", "strike1");
    quotesEl.appendChild(this.quotes);
    quotesCont.appendChild(quotesEl);
    quotesCont.classList.remove("fade");
  }

  randQuotes(choice) {
    let timer = 750;
    switch (choice) {
      case 1: {
        this.genQuotes();
        break;
      }
      case 2: {
        for (let i = 0; i < 2; i++) {
          setTimeout(() => {
            this.genQuotes();
          }, timer);
          timer += 750;
        }
        break;
      }
      case 3: {
        for (let i = 0; i < 3; i++) {
          setTimeout(() => {
            this.genQuotes();
          }, timer);
          timer += 750;
        }

        break;
      }
      case 4: {
        for (let i = 0; i < 4; i++) {
          setTimeout(() => {
            this.genQuotes();
          }, timer);
          timer += 750;
        }
        break;
      }
      case 5: {
        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            this.genQuotes();
          }, timer);
          timer += 750;
        }
        break;
      }
    }
  }
}

// START CANVAS //
class Star {
  constructor(x, y, velx, vely, size, color) {
    this.x = x;
    this.y = y;
    this.velx = velx;
    this.vely = vely;
    this.size = size;
    this.color = color;
  }

  draw(c) {
    c.beginPath();
    c.shadowColor = this.color;
    c.shadowBlur = 10;
    c.fillStyle = this.color;
    c.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    c.fill();
  }

  update() {
    this.x += this.velx;
    this.y += this.vely;
  }
}

class App {
  constructor(canvas) {
    this._canvas = canvas;
    this._c = canvas.getContext("2d");
    this.starsTop = [];
    this.starsBot = [];
    this.starsLeft = [];
    this.starsRight = [];
    this.rand = new Rand();
    this.ticker = 0;
    this.randSpawn = 30;
    this.starSpawn;

    // Loops
    let lastTime;
    const callback = millis => {
      if (lastTime) {
        this.starSpawn = this.rand.int(1, 4);
        this.update((millis - lastTime) / 1000);
      }
      lastTime = millis;
      requestAnimationFrame(callback);
    };
    callback();
  }

  update() {
    this.draw();
    if (this.ticker % this.randSpawn == 0) {
      this.createStar();
    }
    this.updateStars();
    this.ticker++;
  }

  draw() {
    this._c.clearRect(0, 0, this._canvas.width, this._canvas.height);
    this.drawStars();
  }

  // Stars

  drawStars() {
    this.starsTop.forEach(star => star.draw(this._c));
    this.starsTop.forEach(star => {
      if (star.x > this._canvas.height) {
        this.starsTop.splice(star);
      }
    });

    this.starsBot.forEach(star => star.draw(this._c));
    this.starsBot.forEach(star => {
      if (star.x < 0) {
        this.starsBot.splice(star);
      }
    });
    this.starsLeft.forEach(star => star.draw(this._c));
    this.starsLeft.forEach(star => {
      if (star.y > this._canvas.width) {
        this.starsLeft.splice(star);
      }
    });
    this.starsRight.forEach(star => star.draw(this._c));
    this.starsRight.forEach(star => {
      if (star.y < 0) {
        this.starsRight.splice(star);
      }
    });
  }

  updateStars() {
    this.starsTop.forEach(star => star.update(this.dt));
    this.starsBot.forEach(star => star.update(this.dt));
    this.starsLeft.forEach(star => star.update(this.dt));
    this.starsRight.forEach(star => star.update(this.dt));
  }

  createStar() {
    switch (this.starSpawn) {
      case 1: {
        this.starsTop.push(
          new Star(
            this.rand.int(-1, this._canvas.width),
            -1,
            this.rand.int(-20, 10),
            this.rand.int(15, 25),
            this.rand.int(1, 5),
            this.rand.color()
          )
        );

        break;
      }

      case 2: {
        this.starsBot.push(
          new Star(
            this.rand.int(-1, this._canvas.width),
            this._canvas.height,
            this.rand.int(-10, 20),
            this.rand.int(-10, -15),
            this.rand.int(1, 5),
            this.rand.color()
          )
        );
        break;
      }

      case 3: {
        this.starsLeft.push(
          new Star(
            5,
            this.rand.int(-1, this._canvas.height),
            this.rand.int(10, 20),
            this.rand.int(-10, 10),
            this.rand.int(1, 5),
            this.rand.color()
          )
        );
        break;
      }

      case 4: {
        this.starsRight.push(
          new Star(
            this._canvas.width,
            this.rand.int(-1, this._canvas.height),
            this.rand.int(-10, -20),
            this.rand.int(-10, 10),
            this.rand.int(1, 5),
            this.rand.color()
          )
        );
        break;
      }
    }
  }
}

class QuoteGenerator {
  constructor() {}

  init() {
    setTimeout(() => {
      resetCont.classList.add("hide");
      cometBtn.classList.add("move-in-left");
      cometBtn.classList.remove("move-left");
      showerBtn.classList.add("move-in-right");
      showerBtn.classList.remove("move-right");
      genQuote.classList.remove("fade");
      genCursor.classList.remove("fade");
      starContainer.classList.add("hide");
      starTitle.classList.remove("move-down-star", "move-up-star-title");
      starSubtitle.classList.remove("move-down-options", "move-up-star");
      starOptions.classList.remove("move-up-star", "move-down-options");

      while (quotesCont.hasChildNodes()) {
        quotesCont.removeChild(quotesCont.firstChild);
      }
    }, 1700);
    quotesCont.classList.add("fade");
    genTitle.classList.remove("move-up");
    genTitle.classList.add("move-down-star");
  }

  comet() {
    genQuote.innerHTML = "";
    i = -1;
    quote = quoteGen.randQuote();
    typewriter.type();

    cometBtn.classList.add("move-left");
    showerBtn.classList.add("move-right");
    cometBtn.classList.remove("move-in-left");
    showerBtn.classList.remove("move-in-right");
    cometBtn.disabled = "true";
  }

  starshower() {
    cometBtn.classList.add("move-left");
    showerBtn.classList.add("move-right");
    cometBtn.classList.remove("move-in-left");
    showerBtn.classList.remove("move-in-right");
    genTitle.classList.add("move-up");
    genTitle.classList.remove("move-down-star");
    genQuote.classList.add("fade");
    genCursor.classList.add("fade");

    starContainer.classList.remove("hide");
    starTitle.classList.add("move-down-star");
    starSubtitle.classList.add("move-up-star");
    starOptions.classList.add("move-up-star");

    starOpt.forEach(option => {
      option.addEventListener("click", () => {
        starTitle.classList.add("move-up-star-title");
        starSubtitle.classList.add("move-down-options");
        starOptions.classList.add("move-down-options");
        genQuote.classList.remove("fade");
        genQuote.innerHTML = "";
      });
    });
  }

  options() {
    uniBtn.classList.remove("fade");
    resetBtn.classList.remove("fade");
    resetCont.classList.remove("hide");
    uniBtn.classList.add("move-in-right");
    resetBtn.classList.add("move-in-left");
  }

  reset() {
    quotesCont.classList.add("fade");

    starTitle.classList.remove("move-down-star", "move-up-star-title");
    starSubtitle.classList.remove("move-down-options", "move-up-star");
    starOptions.classList.remove("move-up-star", "move-down-options");
    starTitle.classList.add("move-down-star");
    starSubtitle.classList.add("move-up-star");
    starOptions.classList.add("move-up-star");
    setTimeout(() => {
      resetCont.classList.add("hide");
      while (quotesCont.hasChildNodes()) {
        quotesCont.removeChild(quotesCont.firstChild);
      }
    }, 1000);
  }
}
////////////////////
// generate Quote //
////////////////////
let quoteGen = new QuoteGen();
let i = -1;
let quote = quoteGen.randQuote();
let typewriter = new Typewriter();
let quoteGenerator = new QuoteGenerator();

cometBtn.addEventListener("click", () => {
  quoteGenerator.comet();
});

showerBtn.addEventListener("click", () => {
  quoteGenerator.starshower();
});

starOpt1.addEventListener("click", () => {
  setTimeout(() => {
    quoteGenerator.options();
  }, 1500);
  quotes = quoteGen.randQuotes(1);
});

starOpt2.addEventListener("click", () => {
  setTimeout(() => {
    quoteGenerator.options();
  }, 3000);
  quotes = quoteGen.randQuotes(2);
});

starOpt3.addEventListener("click", () => {
  setTimeout(() => {
    quoteGenerator.options();
  }, 3500);
  quotes = quoteGen.randQuotes(3);
});

starOpt4.addEventListener("click", () => {
  setTimeout(() => {
    quoteGenerator.options();
  }, 4500);
  quotes = quoteGen.randQuotes(4);
});

starOpt5.addEventListener("click", () => {
  setTimeout(() => {
    quoteGenerator.options();
  }, 5000);
  quotes = quoteGen.randQuotes(5);
});

uniBtn.addEventListener("click", () => {
  uniBtn.classList.add("move-left");
  uniBtn.classList.remove("move-in-left");
  uniBtn.classList.add("move-in-right");
  resetBtn.classList.add("move-in-left");
  uniBtn.classList.add("fade");
  resetBtn.classList.add("fade");
  quoteGenerator.init();
});

resetBtn.addEventListener("click", () => {
  uniBtn.classList.add("move-left");
  uniBtn.classList.remove("move-in-right");
  resetBtn.classList.add("move-right");
  resetBtn.classList.remove("move-in-left");
  quoteGenerator.reset();
});

let genPara = document.querySelectorAll("p");

//////////////////
// Canvas Sizing//
//////////////////
canvas.height = window.innerHeight - 5;
canvas.width = window.innerWidth - 5;

window.addEventListener("resize", e => {
  canvas.height = window.innerHeight - 5;
  canvas.width = window.innerWidth - 5;
});

const app = new App(canvas);
