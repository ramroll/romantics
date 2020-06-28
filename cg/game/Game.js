import GameField from "./model/GameField"

export default class Game {

  constructor(){
    this.handlers = []
    this.field = new GameField(this)
    this.startAt = new Date().getTime()
    this.loop()
    this.lastTick = -1
  }

  timing = (handler) => {
    this.handlers.push(handler)
  }

  loop = () => {
    const t = new Date().getTime()
    const diff = t - this.startAt
    const tick = Math.floor( diff / 60 )
    if(tick > this.lastTick) {
      this.handlers.forEach(handler => {
        handler(tick)
      })
    }
    this.lastTick = tick
    requestAnimationFrame(this.loop)
  }

  addUnit(isPlayer, x, y) {
    return this.field.addUnit(isPlayer, x, y)
  }

  draw(){
    this.field.draw()
  }
}
