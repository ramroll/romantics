/**
 * 随机触发移动行为
 */
export default class WanderAgent {
  constructor(game, unit){
    this.game = game
    game.timing(this.onTiming)
    this.unit = unit
    this.tick = 0
  }


  changeDir(){
    const dir = Math.random() * Math.PI * 2
    this.unit.changeDirection(dir)
  }

  onTiming = () => {
    if(this.tick % 100 === 0) {
      this.changeDir()
    }
    this.tick ++
  }
}