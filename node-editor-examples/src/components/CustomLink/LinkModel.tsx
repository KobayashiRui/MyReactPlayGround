import {
	DiagramEngine,
	LabelModel,
	LinkModel,
	LinkModelGenerics,
	LinkModelListener,
	PortModel,
	PortModelAlignment
    
} from '@projectstorm/react-diagrams-core';
import { DefaultLabelModel, DefaultLinkModel} from "@projectstorm/react-diagrams";
import { BezierCurve } from '@projectstorm/geometry';
import { BaseEntityEvent, BaseModelOptions, DeserializeEvent } from '@projectstorm/react-canvas-core';

export class MyLinkModel extends DefaultLinkModel {
	constructor() {
		super({
			type: 'advanced',
			width: 5
		});
	}
}
