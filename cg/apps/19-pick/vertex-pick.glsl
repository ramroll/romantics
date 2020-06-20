attribute vec3 a_position;
attribute vec3 a_color;
uniform mat4 u_world;
uniform mat4 u_unit;
uniform mat4 u_worldview;

varying vec3 v_color;

void main() {
  gl_Position = u_worldview * u_world * u_unit * vec4(a_position, 1);
  v_color= a_color;
}