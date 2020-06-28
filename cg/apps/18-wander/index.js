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
      if(c % 20 === 0) {
        const unit = game.addUnit(false, i, j)
        unit.setAgent("wander")
      }
      c ++
    }
  }
  const aspect = gl.canvas.width / gl.canvas.height

  const projectViewMatrix = new Mat4()
    .lookAt(0, 1, 2, -Math.PI * 0.33, 0, 0)
    .perspective(
      Math.PI * .6,
      aspect,
      0.1,
      100
    )
    .getMatrix();
  function draw(){
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.clearDepth(1.0)
    gl.viewport(0.0, 0.0, canvas.width, canvas.height)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    game.field.setMatrixUniform(
      "u_worldview",
      projectViewMatrix
    );
    game.field.updateMatrix()
    game.draw()
    requestAnimationFrame(draw)
  }
  draw()
}

main()