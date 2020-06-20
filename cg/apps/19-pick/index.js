import { Model, shape, matrix } from '../../lib'
import RenderContext from '../../lib/RenderContext'
import { Mat4, multiply4d } from '../../lib/matrix'
import { d3_cube, d3_sphere } from '../../lib/shape'
import GameField from '../../game/model/GameField'
import Game from '../../game/Game'

function main() {
  const gl = RenderContext.getGL()

  const game = new Game()

  // 存储所有的单位
  let c = 0
  for(let i = 0; i < game.field.width ; i++) {
    for(let j = 0; j < game.field.height; j++) {
      if(c % 200 === 0) {
        const unit = game.addUnit(false, i, j)
        unit.setAgent("wander")
      }
      c ++
    }
  }


  function draw(){


    game.draw()
    requestAnimationFrame(draw)
  }
  draw()
}

main()