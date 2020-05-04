import _ from 'lodash'
export default class StateManager {

  constructor(data, state = {}){
    this.data = data
    this.updators = []
    this.state = state 
    this.parse(this.data)
  }

  setState(obj) {
    this.state = _.merge(this.state, obj)
  }

  getState(){
    return this.state
  }

  getData(){
    return this.data
  }

  parse(obj, parent, path=[]){
    if(typeof obj === 'function') {
      this.updators.push({
        path,
        value : obj 
      })
      // 计算初始值
      parent[path[path.length - 1]] = obj(this.state)
      return
    }

    if(typeof obj === 'object') {
      for (let key in obj) {
        this.parse(obj[key], obj, path.concat(key))
      }
    }
  }

  /**
   * 计算变更
   */
  eval() {

    const updates = []

    for(let updator of this.updators) {
      const {path, value} = updator
      const oldValue = _.get(this.data, path)
      const newValue = value(this.state)
      if(oldValue !== newValue) {
        _.set(this.data, path, newValue)
        updates.push({
          path, 
          value : newValue
        })
      }
    }
    return updates
  }
}