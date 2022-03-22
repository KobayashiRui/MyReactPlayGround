import { CanvasEngine } from "@projectstorm/react-canvas-core";
import { NodeModel, NodeModelGenerics, DefaultPortModel } from "@projectstorm/react-diagrams";
import {MyPortModel} from "../../CustomPort/MyPort"

class TestNodeModel extends NodeModel<NodeModelGenerics> {
  value = 0;
  outPort = new MyPortModel({
    in: false,
    name: 'out'
    })

  constructor(readonly engine: CanvasEngine, value: number) {
    super({ type: "numeric-node" });
    this.addPort(this.outPort);

    this.value = value;
  }

  setValue(value: number | string) {
    this.value = isNaN(+value) ? 0 : +value;
    this.engine.repaintCanvas();
  }

  serialize() {
    return {
      ...super.serialize(),
      value: this.value
    };
  }
}

export default TestNodeModel;