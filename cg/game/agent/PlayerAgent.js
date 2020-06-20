

class PlayerAgent {


  constructor(unit){
    this.unit = unit
    this.dir = 0
    document.addEventListener('keydown', (e) => {
      console.log(e)
    })
  }
}