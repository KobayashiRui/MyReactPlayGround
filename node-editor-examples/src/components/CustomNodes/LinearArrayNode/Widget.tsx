import * as React from 'react';
//@ts-ignore
import { DiagramEngine} from '@projectstorm/react-diagrams-core';

import { DefaultPortLabel} from "@projectstorm/react-diagrams";
import LinearArrayNodeModel  from './Model';
import styled from '@emotion/styled';
//import {NumberSliderPortLabel} from '../../CustomPorts/NumberSliderPortLabelWidget'

namespace S {
	export const Node = styled.div<{ background: string; selected: boolean }>`
		background-color: ${(p) => p.background};
		border-radius: 5px;
		font-family: sans-serif;
		color: white;
		border: solid 2px black;
		overflow: visible;
		font-size: 11px;
		border: solid 2px ${(p) => (p.selected ? 'rgb(0,192,255)' : 'black')};
	`;

	export const Title = styled.div`
		background: rgba(0, 0, 0, 0.3);
		display: flex;
		white-space: nowrap;
		justify-items: center;
	`;

	export const TitleName = styled.div`
		flex-grow: 1;
		padding: 5px 5px;
	`;

	export const Ports = styled.div`
		display: flex;
		background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2));
	`;

	export const PortsContainer = styled.div`
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		&:first-of-type {
			margin-right: 10px;
		}
		&:only-child {
			margin-right: 0px;
		}
	`;

    export const Input = styled.input`
      border: none;
      font-size: 2em;
      width: 100%;
    `;

	export const InputPortsContainer = styled.input`
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		&:first-of-type {
			margin-right: 10px;
		}
		&:only-child {
			margin-right: 0px;
		}
	`;
}

export interface LinearArrayNodeProps {
	node: LinearArrayNodeModel;
	engine: DiagramEngine;
}

/**
 * Default node that models the DefaultNodeModel. It creates two columns
 * for both all the input ports on the left, and the output ports on the right.
 */
export class LinearArrayNodeWidget extends React.Component<LinearArrayNodeProps> {
	generatePort = (port:any) => {
        if(port){
		return <DefaultPortLabel engine={this.props.engine} port={port} key={port.getID()} />;
        }else{
            return <></>
        }
	};

	render() {
		return (
			<S.Node
				data-default-node-name={"CrateArray"}
				selected={this.props.node.isSelected()}
				background={"rgba(0, 0, 0, 0.1)"}>
				<S.Title>
					<S.TitleName>{"CrateArray"}</S.TitleName>
				</S.Title>
				<S.Ports>

                    <S.PortsContainer>
						{this.generatePort(this.props.node.inStartPort)}
						{this.generatePort(this.props.node.inStepPort)}
						{this.generatePort(this.props.node.inStopPort)}
					</S.PortsContainer>

                    <S.PortsContainer>{this.generatePort(this.props.node.outPort)}</S.PortsContainer>
                    {
                    /*
					<S.PortsContainer>{_.map(this.props.node.getInPorts(), this.generatePort)}</S.PortsContainer>
					<S.PortsContainer>{_.map(this.props.node.getOutPorts(), this.generatePort)}</S.PortsContainer>
                    */
                    }
				</S.Ports>
			</S.Node>
		);
	}
}