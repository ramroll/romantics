export class Timing {

  constructor(){
    this.listeners = []
    this.start()
  }

  listen(handler){
    this.listeners.push({handler, listenAt : new Date().getTime()})
    return () => {
      this.listeners = this.listeners.filter(x => x !== handler)
    }
  }

  start() {
    this.startAt = new Date().getTime()
    this.run()
  }

  run = () => {
    const current = new Date().getTime() 
    this.listeners.forEach( ({handler, listenAt}) => {
      handler({
        diff : current - listenAt 
      })
    })
    requestAnimationFrame(this.run)
  }
}