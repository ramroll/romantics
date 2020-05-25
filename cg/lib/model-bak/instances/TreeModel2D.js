import { Model } from "../Model";
import { primitives, matrix } from "../..";

export default class TreeModel2D extends Model{
  constructor(options) {

    this.children = []
    const {size} = options 

    this.height = options.height
    const data = () => {
      return {
        buffers: {
          a_position: {
            type : "VERTEX",
            size : 2,
            data : primitives.d2_rect(0, 0, size, size * 8)
          }
        },
        uniforms : {
          u_model : ({x, y, angle, level}) => {
            return {
              type : "MATRIX",
              shape : [3,3],
              value : matrix.translate2d(x, y)
            }
          }
        }
      }
    }
    super(state, data)
  }


  render(level = 0, angle = 0, parent = 0){
    this.setState({
      angle,
      level
    })
    super.render()
    if (level !== this.height) {
      this.render(level + 1, angle - Math.PI * 0.05)
      this.render(level + 1, angle + Math.PI * 0.05)
    }
  }

}