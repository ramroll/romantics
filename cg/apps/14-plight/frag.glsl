precision mediump float;
varying vec4 v_color;
varying vec3 v_norm;
varying vec3 v_surfaceToCamera;
varying vec3 v_surfaceToLight;



void main() {
  vec3 normal = normalize(v_norm);
  vec3 halfVector = normalize(v_surfaceToCamera + v_surfaceToLight);
  vec3 surfaceToLight = normalize(v_surfaceToLight);
  float light = dot(normal, surfaceToLight);
  float specular = dot(normal, halfVector);
  gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
  gl_FragColor.rgb *= light;
  //gl_FragColor.rgb += specular;
  gl_FragColor += pow(specular, 100.0);

}