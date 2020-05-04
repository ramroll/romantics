import Unit from './Unit'
import { Model, primitives, matrix } from '../../lib'
export class RollingRect extends Unit{
  constructor(x, y, agent){
    super(x, y, agent)

    this.model = new Model({
      data : () => {
        return {
          buffers: {
            a_position : {
              size: 2,
              data: primitives.d2_f(0, 0, 100, 150, 30),
              type: "VERTEX"
            }
          },
          uniforms: {
            u_matrix : {
              type : "MATRIX",
              value : matrix.identity3d()
            }
          }
        }
      }
    })
  }
}