/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Game = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var Job = __webpack_require__(2);
var Junior = __webpack_require__(3);
var self;
//########################### Obiekt zarządzający grą
var Game = function() {
  //pobieranie divow
  this.board = document.querySelectorAll('#board div'),
  //właściwości obiektu
  this.junior = new Junior(),
  this.job = new Job(),
  this.score = 0,
  //Obliczanie pozycji
  this.index = function(x,y) {
    return x + (y * 10);
  },
  //########## METODY OBIEKTU
  //nadanie klasy Juniorowi
  this.showJunior = function() {
    self.hideVisibleJunior();
    this.board[ this.index(this.junior.x,this.junior.y) ].classList.add('junior');
  },
  //nadanie klasy job
  this.showJob = function() {
    this.board[ this.index(this.job.x,this.job.y) ].classList.add('job');
  },
  //zmianna zastępujaca this
  self = this,
  //Poruszanie Juniorem
  this.moveJunior = function() {
    self.gameOver();
    if (this.junior.direction === "right") {
        this.junior.x++;
    } else if (this.junior.direction === "left") {
        this.junior.x--;
    } else if (this.junior.direction === "up") {
        this.junior.y--;
    } else if (this.junior.direction === "down") {
        this.junior.y++;
    }
    self.showJunior();
    self.checkJobCollision();

  },
  //usowanie poprzedniej pozycji Juniora z planszy
  this.hideVisibleJunior = function() {
    if(document.querySelector('.junior') != null ) {
    document.querySelector('.junior').classList.remove('junior');
    }
  },
  //Sprawdzanie kolizji Juniora z pracą
  this.checkJobCollision = function() {
    if (this.junior.x === this.job.x && this.junior.y === this.job.y) {
      document.querySelector('.job').classList.remove('job');
      this.score += 1;
      document.querySelector('#score strong').innerText = this.score;
      this.job = new Job();
      self.showJob();
    }
  },
  this.gameOver = function() {
    if (this.junior.y < 0 || this.junior.y > 9 || this.junior.x < 0 || this.junior.x > 9) {
      clearInterval(self.idSetInterval);
      self.hideVisibleJunior();
      document.querySelector("#board").classList.add('invisible'); document.querySelector("#over").classList.remove('invisible');
      document.querySelector('#over span').innerText = self.score;
    }
  }
  //start gry
  this.startGame = function() {
    this.idSetInterval = setInterval(function(){ self.moveJunior() }, 250);
  },
  //Sterowanie klawiaturą
  this.turnJunior = function(event) {
    switch (event.which) {
      case 37:
        self.junior.direction = "left";
        break;
      case 38:
        self.junior.direction = "up";
        break;
      case 39:
        self.junior.direction = "right";
        break;
      case 40:
        self.junior.direction = "down"
    }
  }
}
//Wywołanie metod na obiekcie
var game = new Game();
game.showJunior();
game.showJob();
game.startGame();

//Nasłuchiwanie keydown na klawiaturze
document.addEventListener('keydown', function(event){
    self.turnJunior(event);
});

module.exports = Game;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var Job = function() {
  this.x = Math.floor(Math.random() * 10),
  this.y = Math.floor(Math.random() * 10)
}
module.exports = Job;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

var Junior = function() {
  this.x = 0,
  this.y = 0,
  this.direction = 'right'
}
module.exports = Junior;


/***/ })
/******/ ]);