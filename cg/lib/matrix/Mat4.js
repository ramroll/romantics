import {identity4d} from './identity'
import { multiply4d } from './multiply'
import { rotateX, rotateY, rotateZ } from './rotate'
import { translate3d } from './translate'
import { scale3d } from './scale'
import { perspective } from './project'

//Facade设计模式
export class Mat4{

  constructor() {
    this.mat = identity4d()
  }

  rotate(ax, ay, az) {

    if(ax !== 0) {
      this.mat = multiply4d(this.mat, rotateX(ax))
    }
    if(ay !== 0) {
      this.mat = multiply4d(this.mat, rotateY(ay))
    }
    if(az !== 0) {
      this.mat = multiply4d(this.mat, rotateZ(az))
    }
    return this
  }

  translate(x, y, z) {
    this.mat = multiply4d(this.mat, translate3d(x, y, z))
    return this
  }

  perspective(fov, aspect, zNear, zFar) {
    this.mat = multiply4d(this.mat, perspective(fov, aspect, zNear, zFar))
    return this
  }

  scale(sx, sy, sz) {
    this.mat = multiply4d(this.mat, scale3d(sz, sy, sz))
    return this
  }

  getMatrix(){
    return this.mat
  }

  lookAt(x, y, z, ax, ay, az) {
    this.mat = multiply4d(this.mat, translate(-x, -y, -z))
    this.mat = this.rotate(-ax, -ay, -az)
    return this
  }
}


