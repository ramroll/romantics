precision mediump float;
varying vec3 v_color;

void main() {
  gl_FragColor = vec4(v_color, 1.0);
  // gl_FragColor = vec4(1.0, .1, .2, 1.0);
  //gl_FragColor = texture2D(u_texture, v_texcoord);
}