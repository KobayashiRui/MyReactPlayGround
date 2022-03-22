import * as React from 'react';
import { MyLinkModel } from './LinkModel';
import { MyLinkWidget } from './LinkWidget';
import styled from '@emotion/styled';
import { AbstractReactFactory} from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { DefaultLinkFactory} from "@projectstorm/react-diagrams";
import { css, keyframes } from '@emotion/react';

namespace S {
	export const Keyframes = keyframes`
		from {
			stroke-dashoffset: 24;
		}
		to {
			stroke-dashoffset: 0;
		}
	`;

	const selected = css`
		stroke-dasharray: 10, 2;
		animation: ${Keyframes} 1s linear infinite;
	`;

	export const Path = styled.path<{ selected: boolean }>`
		${(p) => p.selected && selected};
		fill: none;
		pointer-events: auto;
	`;
}

export class MyLinkFactory extends DefaultLinkFactory {
	constructor() {
		super('advanced');
	}

	generateReactWidget(event:any): JSX.Element {
		return <MyLinkWidget link={event.model} diagramEngine={this.engine} />;
	}


	generateModel(): MyLinkModel {
		return new MyLinkModel();
	}

	generateLinkSegment(model: MyLinkModel, selected: boolean, path: string) {
		return (
			<S.Path
				selected={selected}
				stroke={selected ? model.getOptions().selectedColor : model.getOptions().color}
				strokeWidth={model.getOptions().width}
				d={path}
			/>
		);
	}
}