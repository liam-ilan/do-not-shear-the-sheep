let gameRun = false;
let scoreNum = 0;
let time = 0.9;
let storyOn = false;
let controlOn = false;
//setup
let stage = new blockLike.Stage({
  backdrop: new blockLike.Backdrop({
    image: "./img/background/background.svg"
  })
});

//story page
let storyPage = new blockLike.Sprite({
  costume: new blockLike.Costume({
    width: stage.height * 1.3,
    height: stage.height,
    image: "./img/story.png"
  })
});

storyPage.hide();
storyPage.addClass("menuStyle");

//story page button
let storyPageButton = new blockLike.Sprite({
  costume: new blockLike.Costume({
    image: "./img/buttons/story/story-book.png",
    width: 70,
    height: 80
  })
});

let backToMenuCostume = new blockLike.Costume({
  image: "./img/buttons/story/back.png",
  width: 80,
  height: 80
});
storyPageButton.addCostume(backToMenuCostume);
storyPageButton.goTo(stage.width / 2 - 50, stage.height / 2 - 50);
storyPageButton.show();

//control page
let controlPage = new blockLike.Sprite({
  costume: new blockLike.Costume({
    width: stage.width,
    height: stage.height,
  })
});
controlPage.inner("<h1>Controls</h1></br>Use SPACE to change direction.</br>Move up or down by pressing the ARROW KEYS.</br>The higher you are, the faster your score rises.</br>DO NOT GET SHEARED!!!!")
controlPage.addClass("menuStyle");
controlPage.hide()
//control page button
let controlPageButton = new blockLike.Sprite({
  costume: new blockLike.Costume({
    image: "./img/buttons/story/control.png",
    width: 100,
    height: 80,
  })
});
controlPageButton.setSize(75)
controlPageButton.addCostume(backToMenuCostume);
controlPageButton.goTo(stage.width / 2 - 50, stage.height / 2 - 125);
controlPageButton.show();

//title
let title = new blockLike.Sprite();
title.removeCostumeNum(0);
titleCostume1 = new blockLike.Costume({
  image: "./img/title.svg",
  width: 300,
  height: 300
});
titleCostume1.addTo(title);
title.switchCostumeToNum(0);
title.goTo(0, stage.height / 2 - 150);

//play button
let playButton = new blockLike.Sprite();
playButton.removeCostumeNum(0);
playButton.addCostume(
  new blockLike.Costume({
    image: "./img/buttons/play/play.png",
    width: 512 / 2,
    height: 161 / 2,
  })
);
playButton.goTo(0, -100);

//score board
let score = new blockLike.Sprite({
  costume: new blockLike.Costume({
    width: 50,
    height: 50
  })
});
score.addClass("menuStyle");
score.inner(scoreNum.toString());
score.hide();
stage.sendSpriteToFront(score);
score.goTo(-(stage.width / 2) + 50, stage.height / 2 - 50);

//game players
//sprite
let sprite = new blockLike.Sprite();

sprite.level = 1;
sprite.positionMe = function() {
  this.goTo(this.x, -(stage.height / 2) + this.level * (stage.height / 4.5));
};

sprite.bounce = function() {
  if (sprite.touchingEdge() == "left") {
    sprite.pointInDirection(90);
    sprite.move(10);
  }
  if (sprite.touchingEdge() == "right") {
    sprite.pointInDirection(270);
    sprite.move(10);
  }
};
sprite.removeCostumeNum(0);
let spriteCostume1 = new blockLike.Costume({
  image: "./img/sheep/sheep_1.png",
  width: 70,
  height: 56
});
let spriteCostume2 = new blockLike.Costume({
  image: "./img/sheep/sheep_2.png",
  width: 70,
  height: 56
});

spriteCostume1.addTo(sprite);
spriteCostume2.addTo(sprite);
sprite.switchCostumeToNum(0);

sprite.setRotationStyle(1);
sprite.hide();

//enemy
let enemy = new blockLike.Sprite();

enemy.removeCostumeNum(0);
let enemyCostume1 = new blockLike.Costume({
  image: "./img/shear/shear_1.png",
  width: 100,
  height: 100
});
let enemyCostume2 = new blockLike.Costume({
  image: "./img/shear/shear_2.png",
  width: 80,
  height: 120
});
enemyCostume1.addTo(enemy);
enemyCostume2.addTo(enemy);
enemy.switchCostumeToNum(0);

enemy.hide();
enemy.setSize(50);

//add everyting
sprite.addTo(stage);
score.addTo(stage);
title.addTo(stage);
enemy.addTo(stage);
playButton.addTo(stage);
storyPage.addTo(stage);
storyPageButton.addTo(stage);
controlPage.addTo(stage);
controlPageButton.addTo(stage);
//game play
//game controls

storyPageButton.whenClicked(function() {
  if (storyOn) {
    storyOn = false;
    storyPage.hide();
    this.switchCostumeToNum(0);
  } else {
    storyOn = true;
    storyPage.show();
    this.switchCostumeToNum(1);
  }
});

controlPageButton.whenClicked(function() {
  if (controlOn) {
    controlOn = false;
    controlPage.hide();
    this.switchCostumeToNum(0);
  } else {
    controlOn = true;
    controlPage.show();
    this.switchCostumeToNum(1);
  }
});

playButton.whenClicked(function() {
  gameRun = true;
  this.broadcastMessage("go");
  title.hide();
  scoreNum = 0;
  score.inner(scoreNum.toString());
  this.hide();
});

sprite.whenKeyPressed(" ", function() {
  if (gameRun) {
    if (sprite.direction == 90) {
      sprite.pointInDirection(270);
      sprite.move(10);
    } else {
      sprite.pointInDirection(90);
      sprite.move(10);
    }
  }
});

sprite.whenKeyPressed("ArrowUp", function() {
  if (this.level < 3) {
    this.level += 1;
  }
  this.positionMe();
});

sprite.whenKeyPressed("ArrowDown", function() {
  if (this.level > 1) {
    this.level -= 1;
  }
  this.positionMe();
});

//messages

//title
title.whenReceiveMessage("end", function() {
  title.show();
});

//playbutton
playButton.whenReceiveMessage("end", function() {
  playButton.removeCostumeNum(0);
  playButton.addCostume(
    new blockLike.Costume({
      image: "./img/buttons/play/reload.png",
      width: 80,
      height: 80,
    })
  );
  this.show();
});

//story button
storyPageButton.whenReceiveMessage("go", function() {
  this.hide();
});

storyPageButton.whenReceiveMessage("end", function() {
  this.show();
});

//control button
controlPageButton.whenReceiveMessage("go", function() {
  this.hide();
});

controlPageButton.whenReceiveMessage("end", function() {
  this.show();
});


//sprite
sprite.whenReceiveMessage("go", function() {
  this.show();
  this.level = 1;
  this.positionMe();
  while (gameRun) {
    this.move(10);
    this.bounce();
  }
});

sprite.whenReceiveMessage("end", function() {
  this.hide();
});

//sprite animations
sprite.whenReceiveMessage("go", function() {
  while (gameRun) {
    this.wait(0.5);
    this.changeY(15);
    this.nextCostume();
    this.wait(0.5);
    this.changeY(-15);
    this.nextCostume();
  }
});

//enemy
enemy.whenReceiveMessage("go", function() {
  this.stopSounds();
  this.playSoundLoop("./sounds/music.wav");
  time = 0.5;
  while (gameRun) {
    if (time > 0.2) {
      time = time * 0.995;
    }
    scoreNum += sprite.level;
    score.inner(scoreNum.toString());
    this.wait(time);
    for(let i = 0; i < Math.floor((Math.random() * 3) + 1); i++){
      this.clone();
      this.wait(0.1)
    }
  }
});

//score
score.whenReceiveMessage("go", function() {
  score.goTo(-(stage.width / 2) + 50, stage.height / 2 - 50);
  this.show();
});

score.whenReceiveMessage("end", function() {
  if (stage.height > 550) {
    this.goTo(0, -20);
  }
});
//enemy loop
enemy.whenCloned(function() {
  this.alive = true;
  this.goTo((-(stage.width / 2)+ 50) + (Math.random() * (stage.width - 50)), stage.height / 2);
  this.addTo(stage);
  this.show();
  stage.sendSpriteToBack(this);

  while (gameRun && this.alive) {
    if (this.touchingEdge() === "bottom" && this.alive) {
      //clear this enemy
      this.alive = false;
      this.removeFrom(stage);
    }
    if (this.isTouching(sprite)) {
      gameRun = false;
      this.stopSounds();
      this.playSoundUntilDone("./sounds/snip.wav");
      this.broadcastMessage("end");
    }
    this.changeY(-10);
  }
  //end game clear all enemies
  this.removeFrom(stage);
});

//enemy animation
enemy.whenCloned(function() {
  while (gameRun) {
    this.wait(0.25);
    this.nextCostume();
  }
});
