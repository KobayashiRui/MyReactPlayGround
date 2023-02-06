import { CanvasEngine } from "@projectstorm/react-canvas-core";
import { NodeModel, NodeModelGenerics, DefaultPortModel } from "@projectstorm/react-diagrams";
import {MyPortModel} from "../../CustomPort/MyPort"
import {_range} from "../../../util/util"

import TestNodeModel from "../TestNode/Model";
import NumberSliderNodeModel from "../NumberSliderNode/Model";

class LinearArrayNodeModel extends NodeModel<NodeModelGenerics> {
  initValue = 0
  StepValue = 1;
  StopValue = 10;
  outPort = new MyPortModel({
    in: false,
    name: 'out'
    })

  inStartPort = new MyPortModel({
    in: true,
    name: 'inStart'
    })

  inStepPort = new MyPortModel({
    in: true,
    name: 'inStep'
    })

  inStopPort = new MyPortModel({
    in: true,
    name: 'inStop'
    })


  constructor(readonly engine: CanvasEngine) {
    super({ type: "linear-array-node" });
    this.addPort(this.inStartPort);
    this.addPort(this.inStepPort);
    this.addPort(this.inStopPort);
    this.addPort(this.outPort);

    //this.value = value;
  }


  getNumber(port: DefaultPortModel): number {
    const link = Object.values(port.getLinks())[0];
    const node = link?.getSourcePort()?.getNode();
    if (node instanceof TestNodeModel || node instanceof NumberSliderNodeModel){
      return node.value;
    }

    return 0;
  }

  get value(){
    const _startValue = this.getNumber(this.inStartPort);
    const _stepValue = this.getNumber(this.inStepPort)
    const _stopValue = this.getNumber(this.inStopPort)
    if( (_stopValue - _startValue) > 0 && _stepValue > 0){
      return _range(_startValue,  _stopValue, _stepValue);
    }else{
      return []
    }
  }

  serialize() {
    return {
      ...super.serialize(),
      value: this.value
    };
  }
}

export default LinearArrayNodeModel;