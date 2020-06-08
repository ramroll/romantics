import React from 'react'
import ReactDOM from 'react-dom'
import Slider from './slider'
import "./widget.css"

const Panel = ({widgets}) => {

  return <div className="control-panel">
    {widgets.map( (widget, i) => {
      const {type, label, ...others} = widget
      switch(type) {
        case 'slider' : 
          return (
            <div key={i} className="panel-item">
              <label>{label}:</label>
              <Slider {...others} />
            </div>
          );
        default:
          return null
      }
    })}

  </div>
}

export default class WidgetPanel {

  constructor(widgets){
    this.widgets = widgets
  }

  render(){
    ReactDOM.render(
      <Panel widgets={this.widgets} />,
      document.getElementById("widget-panel")
    );
  }
}
