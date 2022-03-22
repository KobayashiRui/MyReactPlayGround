import * as React from "react";
import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import {TestNodeWidget} from "./Widget2";
import TestNodeModel from "./Model";

class TestNodeFactory extends AbstractReactFactory<
TestNodeModel,
  DiagramEngine
> {
  constructor() {
    super("numeric-node");
  }

  generateReactWidget(event: any) {
    return <TestNodeWidget engine={this.engine} node={event.model} />;
  }

  generateModel(event: any) {
    return new TestNodeModel(this.engine, 0);
  }
}

export default TestNodeFactory;