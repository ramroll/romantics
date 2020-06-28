attribute vec3 a_position;
uniform mat4 u_world;
uniform mat4 u_unit;
uniform mat4 u_worldview;

attribute vec2 a_texcoord;
varying vec2 v_texcoord;

void main() {
  gl_Position = u_worldview * u_world * u_unit * vec4(a_position, 1);
  v_texcoord = a_texcoord;


}