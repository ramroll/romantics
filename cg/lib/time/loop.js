export function loop(callback){
  callback()
  requestAnimationFrame(loop.bind(null, callback))
}

