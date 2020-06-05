const fs = require('fs')
const path = require('path')
const OBJ = require('webgl-obj-loader')

const meshPath = path.resolve(__dirname, "1.obj")
const opt = { encoding: 'utf8' }

fs.readFile(meshPath, opt, function (err, data){
  if (err) return console.error(err)
  const mesh = new OBJ.Mesh(data);
  console.log(mesh)
})