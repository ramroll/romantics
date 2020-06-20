import { Model } from "../../lib";
import { Mat4, inverse, multiply } from "../../lib/matrix";
import Robot from "../../apps/11-model/Robot";
import RobotUnit from "../units/RobotUnit";
import Tiles from "./Tiles";
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
    ];

    super(null);
    this.width = map[0].length;
    this.height = map.length;
    console.log(this.width, this.height);
    this.tileSize = 0.5;
    this.tileModel = new Tiles(map, this.tileSize);
    this.game = game;
    this.addChild(this.tileModel);

    this.setUnitMatrix(
      new Mat4()
        .translate(
          (-map[0].length * this.tileSize) / 2,
          0,
          (-map.length * this.tileSize) / 2
        )
        .getMatrix()
    );

    this.addTextureImage("/texture08.jpg");

    // 存储所有的单位
    this.units = [];

    this.initPick();

    const aspect = RenderContext.getAspect();

    this.lookAtParams = [0, 1, 2, -Math.PI * 0.33, 0, 0];
    this.fov = Math.PI * 0.6;
    this.near = 1;
    this.far = 2000;
    this.projectViewMatrix = new Mat4()
      .lookAt(...this.lookAtParams)
      .perspective(this.fov, aspect, this.near, this.far)
      .getMatrix();
  }

  addUnit(isPlayer, x, y, agent) {
    const unit = new RobotUnit(this.game, {
      isPlayer,
      x,
      y,
      tileSize: this.tileSize,
      agent,
    });
    this.units.push(unit);
    this.addChild(unit.getModel());
    return unit;
  }

  draw() {
    const gl = this.gl;
    RenderContext.switchProgram("tile")
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    gl.useProgram(RenderContext.getProgram());
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clearDepth(1.0);
    gl.viewport(0.0, 0.0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    this.setMatrixUniform("u_worldview", this.projectViewMatrix);
    this.updateMatrix();
    super.draw()

    this.pick();
    
  }

  initPick() {
    this.setFloatUniform('u_id', -1)
    const gl = this.gl;
    // Create a texture to render to
    const targetTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, targetTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    // create a depth renderbuffer
    const depthBuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);

    function setFramebufferAttachmentSizes(width, height) {
      gl.bindTexture(gl.TEXTURE_2D, targetTexture);
      // define size and format of level 0
      const level = 0;
      const internalFormat = gl.RGBA;
      const border = 0;
      const format = gl.RGBA;
      const type = gl.UNSIGNED_BYTE;
      const data = null;
      gl.texImage2D(
        gl.TEXTURE_2D,
        level,
        internalFormat,
        width,
        height,
        border,
        format,
        type,
        data
      );

      gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
      gl.renderbufferStorage(
        gl.RENDERBUFFER,
        gl.DEPTH_COMPONENT16,
        width,
        height
      );
    }
    setFramebufferAttachmentSizes(1, 1);

    // Create and bind the framebuffer
    const fb = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    this.fb = fb

    // attach the texture as the first color attachment
    const attachmentPoint = gl.COLOR_ATTACHMENT0;
    const level = 0;
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      attachmentPoint,
      gl.TEXTURE_2D,
      targetTexture,
      level
    );

    // make a depth buffer and the same size as the targetTexture
    gl.framebufferRenderbuffer(
      gl.FRAMEBUFFER,
      gl.DEPTH_ATTACHMENT,
      gl.RENDERBUFFER,
      depthBuffer
    );

    window.addEventListener("mousemove", (e) => {
      const rect = gl.canvas.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    });
  }

  pick() {
    const gl = this.gl;
    if (!this.mouseX) {
      return;
    }

    const pixelX = (this.mouseX * gl.canvas.width) / gl.canvas.clientWidth;
    const pixelY =
      gl.canvas.height -
      (this.mouseY * gl.canvas.height) / gl.canvas.clientHeight -
      1;

    // 计算near平面的值
    const aspect = RenderContext.getAspect();
    const top = Math.tan(this.fov * 0.5) * this.near;
    const bottom = -top;
    const left = aspect * bottom;
    const right = aspect * top;
    const width = Math.abs(right - left);
    const height = Math.abs(top - bottom);

    // 将鼠标坐标映射到near平面
    const fLeft = left + (pixelX * width) / this.gl.canvas.width;
    const fBottom = bottom + (pixelY * height) / this.gl.canvas.height;
    const fWidth = 1 / gl.canvas.width;
    const fHeight = 1 / gl.canvas.height;

    RenderContext.switchProgram("pick");

    gl.useProgram(RenderContext.getProgram());

    this.setMatrixUniform(
      "u_worldview",
      new Mat4()
        .lookAt(...this.lookAtParams)
        .frustum(fLeft, fLeft + fWidth, fBottom, fBottom + fHeight, this.near, this.far)
        .getMatrix()
    );

    gl.bindFramebuffer(gl.FRAMEBUFFER, this.fb);
    gl.viewport(0, 0, 1, 1);

    // gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);

    // Clear the canvas AND the depth buffer.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    this.children[0].draw();

    const data = new Uint8Array(4);
    gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, data);
    const id = data[0] + (data[1] << 8) + (data[2] << 16)
    const x = id % 1000
    const y = Math.floor(id / 1000)
    console.log(x, y, id)
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

  }
}
