precision mediump float;
uniform vec3 u_light;
varying vec3 v_norm;


void main() {
  vec3 normal = normalize(v_norm);
  // vec3 lightDir = normalize(u_light);
  float light = dot(normal, -u_light);
  gl_FragColor = vec4(0.0, 1.0, .0, 1.0);
  gl_FragColor.rgb *= light;
}