import { Model } from "../../lib";

import {d3_cube} from '../../lib/shape/d3_cube'
import { Mat4, multiply4d, multiply3d } from "../../lib/matrix";
import { d3_cylinder, d3_sphere } from "../../lib/shape";
import RenderContext from "../../lib/RenderContext";

export default class Robot extends Model{
  constructor() {
    super(null)
    
    this.head = new Head()
    this.body = new Body()
    this.leftArm = new Arm({
      isLeft : true,
      length : .5,
      size : .1,
      x : -.45,
      y : .22,
      ax :0,
      az :-Math.PI * 0.2
    })

    this.rightArm = new Arm({
      isLeft : false,
      length : .5,
      size : .1,
      x : .45,
      y : .22,
      ax :0,
      az :Math.PI * 0.2
    }) 


    this.leftLeg = new Leg({
      isLeft : true,
      length : .8,
      size : .15,
      x : -.2,
      y : -.5,
      ax :0,
      az :-Math.PI * 0.1
    })

    this.rightLeg = new Leg({
      isLeft : false,
      length : .8,
      size : .15,
      x : .2,
      y : -.5,
      ax :0,
      az :Math.PI * 0.1
    })
    
    this.addChild(this.body)
    this.addChild(this.head)
    this.addChild(this.leftArm)
    this.addChild(this.rightArm)
    this.addChild(this.leftLeg)
    this.addChild(this.rightLeg)

    this.walk()
  }



  walk() {
    const timing = RenderContext.getTiming()
    
    let A = 200
    let MaxAngle = Math.PI * 0.25
    timing.listen(({diff}) => {
      // 产生一个挥手的动画
      const stage = Math.floor(diff / A) % 4
      let ax = null
      
      // 0 ->  | [0, A]
      // 1 <-, 2 <- [A, -A] 
      // 3 -> [-A, 0]

      switch(stage) {
        case 0: {
          const t = diff % A
          ax = (t / A) * MaxAngle
          break
        }
        case 1:
        case 2: {
          const t = (diff - A) % (2*A)
          ax = MaxAngle - 2*MaxAngle*(t / (2*A))
          break
        }
        case 3: {
          const t = (diff - 3*A)  % A
          ax = -MaxAngle + MaxAngle*(t/A)
          break
        }
      }

      this.head.look(ax*0.3)
      this.leftArm.rotate(ax, -Math.PI * 0.1)
      this.leftArm.children[0].rotate(ax*0.1, 0)
      this.rightArm.rotate(-ax, Math.PI * 0.1)
      this.rightArm.children[0].rotate(-ax*0.1, 0)
      this.leftLeg.rotate(-ax, -Math.PI * 0.1)
      this.rightLeg.rotate(ax, Math.PI * 0.1)
    })

  }
}

class Body extends Model{

  constructor(level){
    const mesh = d3_cube(false,true)
    super(mesh)
    this.name = 'body'
    const mat4 = new Mat4()
    this.setUnitMatrix(mat4.scale(.3, .5, .25).getMatrix())
    this.addTextureImage("/texture06.jpg")
  }
}


class Head extends Model{

  constructor(){
    const mesh = d3_sphere(.3)
    super(mesh)

    const mat4 = new Mat4()
    this.setUnitMatrix(
      mat4
        .translate(0, 0.8, 0)
        .rotate(0, Math.PI/2, 0)
        .getMatrix()
    );
    this.addTextureImage('/texture05.jpg')
  }

  look(ax) {
    const mat4 = new Mat4()
    this.setUnitMatrix(
      mat4
        .translate(0, 0.8, 0)
        .rotate(0, Math.PI/2 + ax, 0)
        .getMatrix()
    )

  }
}



class Arm extends Model{
  constructor({ 
    isLeft, length, 
    size, x, y, ax, az, 
    level = 0 }) {
    const mesh = d3_cylinder(size, length)
    super(mesh)

    this.level = level
    this.x = x
    this.y = y
    this.length = length 
    this.setUnitMatrix(this.__matrix(ax, az))
    this.addTextureImage("/texture07.jpg")

    if(this.level !== 1) {
      const sign = isLeft ? 1 : -1
      this.addChild(new Arm({
        isLeft : true,
        x : 0,
        y : -length,
        ax : 0,
        az : sign * 0.3,
        length : length,
        size : .08,
        level : this.level + 1 
      }))
    }
  }

  __matrix(ax, az){
    const mat4 = new Mat4()
    return mat4
      .translate(0, -this.length / 2, 0)
      .rotate(ax, 0, az)
      .translate(0, this.length / 2, 0)
      .translate(this.x, this.y, 0)
      .getMatrix()
  }

  rotate(ax, az){
    this.setUnitMatrix(this.__matrix(ax, az))
  }
  
}

class Leg extends Arm {
  constructor(options) {
    super(options)
  }
}

