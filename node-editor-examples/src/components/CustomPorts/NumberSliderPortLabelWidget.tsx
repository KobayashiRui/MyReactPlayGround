import * as React from 'react';
import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams-core';
import {  DefaultPortModel } from "@projectstorm/react-diagrams";
import styled from '@emotion/styled';

export interface NumberSliderLabelProps {
	port: DefaultPortModel;
	engine: DiagramEngine;
	node: any;
}

namespace S {
	export const PortLabel = styled.div`
		display: flex;
		margin-top: 1px;
		align-items: center;
	`;

	export const Label = styled.div`
		padding: 0 5px;
		flex-grow: 1;
	`;

	export const Port = styled.div`
		width: 15px;
		height: 15px;
		background: rgba(255, 255, 255, 0.1);
		&:hover {
			background: rgb(192, 255, 0);
		}
	`;

	export const SliderInput = styled.input`
		padding: 0 5px;
		flex-grow: 1;
	`;
    
}

export class NumberSliderPortLabel extends React.Component<NumberSliderLabelProps> {
	render() {
		const port = (
			<PortWidget engine={this.props.engine} port={this.props.port}>
				<S.Port />
			</PortWidget>
		);
		const label = <S.SliderInput 
					type = 'range'
					min = {0}
					max = {10}
					value={this.props.node.value}
        			onChange={(e) => this.props.node.setValue(+e.target.value)}/>;
		return (
			<S.PortLabel>
                {label}
				{port}
			</S.PortLabel>
		);
	}
}