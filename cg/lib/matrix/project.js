// export function perspective(angle, a, zMin, zMax) {
//   var ang = Math.tan(angle*0.5)
//   return [
//      0.5/ang, 0 , 0, 0,
//      0, 0.5*a/ang, 0, 0,
//      0, 0, -(zMax+zMin)/(zMax-zMin), -1,
//      0, 0, (-2*zMax*zMin)/(zMax-zMin), 0
//   ];
// }

export function perspective(fov, aspect, zNear, zFar) {
  // const f = 1/Math.tan(fov*0.5)
  // const inv = 1 / (zNear - zFar)
  // const m = [
  //   f/aspect, 0, 0, 0 ,
  //   0, f, 0, 0,
  //   0, 0, (zNear + zFar) * inv, 1,
  //   0, 0, 2*zNear*zFar * inv, 0
  // ]
  // return m

  var f = Math.tan(Math.PI * 0.5 - 0.5 * fov);
  var rangeInv = 1.0 / (zNear- zFar);

  return [
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (zNear + zFar) * rangeInv, -1,
    0, 0, zNear * zFar * rangeInv * 2, 0
  ];

}


export function frustum(left, right, bottom, top, near, far){

  const dx = right - left
  const dy = top - bottom
  const dz = far - near
  return [
    2*near/dx, 0, 0, 0,
    0, 2*near/dy, 0, 0,
    (left+right)/dx, (top+bottom)/dx, -(far+near)/dz, -1,
    0, 0, -2*near*far/dz, 0
  ]
}
