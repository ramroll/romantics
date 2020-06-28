import Robot from "../model/Robot";
import WanderAgent from "../agent/WanderAgent";

const S_STOP = 0;
const S_WALK = 1;
const S_TURN = 2;

function clamp(v, min, max) {
  if(v < min) {
    return min
  }
  if(v > max) {
    return max
  }

  return v
}

export default class RobotUnit {
  constructor(
    game,
    {
      isPlayer,
      x,
      y,
      tileSize,
      agent,
      turnSpeed = 0.25,
      speed = 0.03,
    }
  ) {
    this.pX =
      x * tileSize + tileSize / 2;
    this.pY =
      y * tileSize + tileSize / 2;
    this.model = new Robot(
      this.pX,
      this.pY,
      tileSize
    );
    this.speed = speed

    this.turnSpeed = turnSpeed;
    this.dir = 0;
    this.agent = agent;
    if (isPlayer) {
      // this.agent = new (this)
    }
    this.state = S_STOP;
    game.timing(this.onTiming);
    this.game = game;
  }

  setAgent(type) {
    switch (type) {
      case "wander":
        this.agent = new WanderAgent(
          this.game,
          this
        );
        break;
    }
  }

  onTiming = () => {
    switch (this.state) {
      case S_STOP:
        break;
      case S_WALK:
        this.handleWalk();
        break;
      case S_TURN:
        this.handleTurn();
        break;
    }
  };

  handleWalk() {
    const xDir =
      this.speed * Math.cos(this.dir);
    const zDir =
      this.speed * Math.sin(this.dir);
    this.pX = this.pX + xDir;
    this.pY = this.pY - zDir;

    const fieldWidth =
      this.game.field.width * this.tileSize;
    const fieldHeight = this.game.field.height * this.tileSize

    this.pX = clamp(
      this.pX,
      this.tileSize,
      fieldWidth - this.tileSize / 2
    ); 
    this.pY = clamp(
      this.pY,
      this.tileSize,
      fieldHeight - this.tileSize / 2
    ); 
    if(this.pX < 0) {
      this.pX = 0
    }
    if(this.pY < 0) {
      this.pY = 0
    }


    this.model.move(this.pX, this.pY);
  }

  getX() {
    return Math.floor( this.pX / this.tileSize ) 
  }

  getY(){
    return Math.floor(this.pY / this.tileSize)
  }

  handleTurn() {
    const sign =
      this.toDir - this.fromDir > 0
        ? 1
        : -1;
    const diff = sign * this.turnSpeed;
    this.dir = this.dir + diff;
    if (
      Math.abs(this.dir - this.toDir) <= this.turnSpeed 
    ) {
      this.dir = this.toDir;
      this.state = S_WALK;
    }
    this.model.turn(this.dir);
  }

  changeDirection(dir) {
    this.state = S_TURN;
    this.fromDir = this.dir;
    this.toDir = dir;
  }

  getModel() {
    return this.model;
  }
}
