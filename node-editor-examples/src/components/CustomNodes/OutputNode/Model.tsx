import { CanvasEngine } from "@projectstorm/react-canvas-core";
import { NodeModel, NodeModelGenerics, DefaultPortModel } from "@projectstorm/react-diagrams";
import TestNodeModel from "../TestNode/Model";
import {MyPortModel} from "../../CustomPort/MyPort"

class OutputNodeModel extends NodeModel<NodeModelGenerics> {
  inPort = new MyPortModel({
    in: true,
    name: 'in'
    })

  constructor(readonly engine: CanvasEngine, value: number) {
    super({ type: "output-numeric-node" });
    this.addPort(this.inPort);
  }

  getNumber(port: DefaultPortModel): number {
    const link = Object.values(port.getLinks())[0];
    const node = link?.getSourcePort()?.getNode();
    //if (node instanceof NumericNodeModel || node instanceof OperatorNodeModel) {
    //  return node.value;
    //}
    if (node instanceof TestNodeModel){
      return node.value;
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