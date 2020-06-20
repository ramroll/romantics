 attribute vec3 a_position;
attribute vec3 a_norm;

uniform mat4 u_world;
uniform mat4 u_unit;
uniform mat4 u_worldview;
uniform vec3 u_light;
uniform vec3 u_camera;

varying vec3 v_norm;
varying vec3 v_surfaceToCamera;
varying vec3 v_surfaceToLight;

void main() {
  vec3 surface = (u_world * vec4(a_position, 1)).xyz;
  gl_Position = u_worldview * u_world * u_unit * vec4(a_position, 1);
  v_norm = mat3(u_world * u_unit) * a_norm;
  v_surfaceToLight = u_light - surface;
  v_surfaceToCamera = u_camera - surface;
}