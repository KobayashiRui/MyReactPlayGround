import * as React from "react";
import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import {NumberSliderNodeWidget} from "./Widget";
import NumberSliderNodeModel from "./Model";

class NumberSliderNodeFactory extends AbstractReactFactory<
NumberSliderNodeModel,
  DiagramEngine
> {
  constructor() {
    super("number-slider-node");
  }

  generateReactWidget(event: any) {
    return <NumberSliderNodeWidget engine={this.engine} node={event.model} />;
  }

  generateModel(event: any) {
    return new NumberSliderNodeModel(this.engine, 0);
  }
}

export default NumberSliderNodeFactory;