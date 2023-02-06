import { CanvasEngine } from "@projectstorm/react-canvas-core";
import { NodeModel, NodeModelGenerics, DefaultPortModel } from "@projectstorm/react-diagrams";
import {MyPortModel} from "../../CustomPort/MyPort"
import TestNodeModel from "../TestNode/Model";
import NumberSliderNodeModel from "../NumberSliderNode/Model";
import LinearArrayNodeModel from "../LinearArrayNode/Model";

class OutputNodeModel extends NodeModel<NodeModelGenerics> {
  inPort = new MyPortModel({
    in: true,
    name: 'in'
    })

  constructor(readonly engine: CanvasEngine, value: number) {
    super({ type: "output-numeric-node" });
    this.addPort(this.inPort);
  }

  getNumber(port: DefaultPortModel): number | string {
    const link = Object.values(port.getLinks())[0];
    const node = link?.getSourcePort()?.getNode();
    if (node instanceof TestNodeModel || node instanceof NumberSliderNodeModel){
      return node.value;
    }else if(node instanceof LinearArrayNodeModel){
      return node.value.toString();
    }

    return 0;
  }

  get value() {
    const input_value = this.getNumber(this.inPort);
    return input_value
  }

  serialize() {
    return {
      ...super.serialize(),
      value: this.value
    };
  }
}

export default OutputNodeModel;