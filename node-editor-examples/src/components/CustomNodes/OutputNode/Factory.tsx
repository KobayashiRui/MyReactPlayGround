import * as React from "react";
import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import {OutputNodeWidget} from "./Widget";
import OutputNodeModel from "./Model";

class OutputNodeFactory extends AbstractReactFactory<
OutputNodeModel,
  DiagramEngine
> {
  constructor() {
    super("output-numeric-node");
  }

  generateReactWidget(event: any) {
    return <OutputNodeWidget engine={this.engine} node={event.model} />;
  }

  generateModel(event: any) {
    return new OutputNodeModel(this.engine, 0);
  }
}

export default OutputNodeFactory;