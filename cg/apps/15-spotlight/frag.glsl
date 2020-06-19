precision mediump float;
varying vec4 v_color;
varying vec3 v_norm;
varying vec3 v_surfaceToCamera;
varying vec3 v_surfaceToLight;
uniform vec3 u_lightDirection;
uniform float u_shininess;
uniform float u_limit;


void main() {
  vec3 normal = normalize(v_norm);
  vec3 halfVector = normalize(v_surfaceToCamera + v_surfaceToLight);
  vec3 surfaceToLight = normalize(v_surfaceToLight);
  vec3 lightDir = normalize(u_lightDirection);
  float light = 0.0;
  float specular = 0.0;
  float dotFromDirection = dot(surfaceToLight, -lightDir);
  if(dotFromDirection >= u_limit) {
    light = dot(normal, surfaceToLight);
    if(light > 0.0) {
      specular = pow( dot(normal, halfVector), u_shininess );
    }
  }
  gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
  gl_FragColor.rgb *= light;
  gl_FragColor.rgb += specular;
}