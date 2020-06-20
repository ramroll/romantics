attribute vec3 a_position;
uniform mat4 u_world;
uniform mat4 u_unit;
uniform mat4 u_worldview;
attribute vec3 a_norm;
attribute vec2 a_texcoord;

attribute vec4 a_color;
varying vec3 v_norm;
varying vec2 v_texcoord;

void main() {
  gl_Position = u_worldview * u_world * u_unit * vec4(a_position, 1);
  v_texcoord = a_texcoord;
  v_norm = mat3(u_world * u_unit) * a_norm;
}