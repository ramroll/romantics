import { Model } from "../../lib";
import { Mat4 } from "../../lib/matrix";
import Robot from "../../apps/11-model/Robot";
import RobotUnit from "../units/RobotUnit";
import Tiles from './Tiles'
import RenderContext from "../../lib/RenderContext";

export default class GameField extends Model {
  constructor(game) {
    const map = [
      ".....................................................",
      ".....................................................",
      ".....................................................",
      ".....................................................",
      ".....................................................",
      ".....................................................",
      ".....................................................",
      ".....................................................",
      ".....................................................",
      ".....................................................",
      ".....................................................",
      ".....................................................",
      ".....................................................",
      ".....................................................",
      ".....................................................",
      ".....................................................",
      ".....................................................",
      ".....................................................",
      ".....................................................",
      ".....................................................",
      ".....................................................",
    ]

    super(null)
    this.width = map[0].length
    this.height = map.length
    this.tileSize = 0.5
    this.tileModel = new Tiles(map, this.tileSize)
    this.game = game
    this.addChild(this.tileModel)


    this.setUnitMatrix(
      new Mat4().translate(
        -map[0].length * this.tileSize / 2,
        0,
        -map.length*this.tileSize /2,
      ).getMatrix()
    );

    this.addTextureImage(
      "/texture08.jpg"
    );

    // 存储所有的单位
    this.units = []

    this.initPick()

    const aspect = RenderContext.getAspect() 

    this.fov = Math.PI * .6
    this.projectViewMatrix = new Mat4()
      .lookAt(0, 1, 2, -Math.PI * 0.33, 0, 0)
      .perspective(
        Math.PI * .6,
        aspect,
        0.1,
        100
      ).getMatrix()
  }

  addUnit(isPlayer, x, y, agent) {
    const unit = new RobotUnit(this.game, {
      isPlayer,
      x,
      y,
      tileSize : this.tileSize,
      agent
    })
    this.units.push(unit)
    this.addChild(unit.getModel())
    return unit
  }

  draw(){
    this.drawPick()
    this.gl.useProgram(this.program)
    this.setMatrixUniform('u_worldview', this.projectViewMatrix)
    this.updateMatrix()
    super.draw()
  }


  initPick(){
    window.addEventListener('mousemove', e => {
      const rect = this.gl.canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      const top = Math.tan(this.fov*0.5)*near
      const bottom = -top
      const left = aspect * bottom
      const right = aspect * top
      const width = Math.abs(right-left)
      const height = Math.abs(top-bottom)


      this.mouseProjectViewMatrix = new Mat4()
        .frustum(
        )
    })
  }

  drawPick() {
    const pickProgram = RenderContext.getProgram('pick')

    this.gl.useProgram(pickProgram)
    super.draw()
  }
}
