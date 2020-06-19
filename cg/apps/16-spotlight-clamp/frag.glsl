precision mediump float;
varying vec4 v_color;
varying vec3 v_norm;
varying vec3 v_surfaceToCamera;
varying vec3 v_surfaceToLight;
uniform vec3 u_lightDirection;
uniform float u_shininess;
uniform float u_innerLimit;
uniform float u_outterLimit;


void main() {
  vec3 normal = normalize(v_norm);
  vec3 halfVector = normalize(v_surfaceToCamera + v_surfaceToLight);
  vec3 surfaceToLight = normalize(v_surfaceToLight);
  vec3 lightDir = normalize(u_lightDirection);
  float specular = 0.0;
  float dotFromDirection = dot(surfaceToLight, -lightDir);
  float limitRange = u_innerLimit - u_outterLimit;

  float light = clamp((dotFromDirection - u_outterLimit)/limitRange, 0.0, 1.0);
  if(light > 0.0) {
    specular = pow( dot(normal, halfVector), u_shininess );
  }
  gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
  gl_FragColor.rgb *= light;
  gl_FragColor.rgb += specular;
}