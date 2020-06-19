precision mediump float;
uniform vec3 u_light;
varying vec2 v_texcoord;
varying vec3 v_norm;
uniform sampler2D u_texture;
void main() {
  gl_FragColor = texture2D(u_texture, v_texcoord);
  vec3 normal = normalize(v_norm);
  vec3 light = normalize(-u_light);
  gl_FragColor.rgb *= dot(normal, light);
}