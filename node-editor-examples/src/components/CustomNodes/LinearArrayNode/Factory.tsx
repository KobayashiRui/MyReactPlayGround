import * as React from "react";
import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import {LinearArrayNodeWidget} from "./Widget";
import LinearArrayNodeModel from "./Model";

class LinearArrayNodeFactory extends AbstractReactFactory<
LinearArrayNodeModel,
  DiagramEngine
> {
  constructor() {
    super("linear-array-node");
  }

  generateReactWidget(event: any) {
    return <LinearArrayNodeWidget engine={this.engine} node={event.model} />;
  }

  generateModel(event: any) {
    return new LinearArrayNodeModel(this.engine);
  }
}

export default LinearArrayNodeFactory;