import * as React from 'react';
import TestNodeModel  from './Model';
import { BaseEntityEvent, BaseModel, ListenerHandle, PeformanceWidget} from '@projectstorm/react-canvas-core';
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams";
import styled from '@emotion/styled';
import ResizeObserver from 'resize-observer-polyfill';

export interface TestNodeProps {
	node: TestNodeModel;
    engine: DiagramEngine;
}

namespace S {
    export const Widget = styled.div`
      box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.2);
      width: 180px;
      background: #fff;
      border-radius: 12px;
      position: relative;
      padding: 8px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
    `;

    export const Port = styled(PortWidget)`
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 2px solid #000;
      position: absolute;
      margin: -7px;
    `;

    export const Input = styled.input`
      border: none;
      font-size: 2em;
      width: 100%;
    `;

    export const Result = styled.p`
      margin: 0;
      font-size: 2em;
    `;
}

export class TestNodeWidget extends React.Component<TestNodeProps> {
    constructor(props: TestNodeProps) {
        super(props);
        this.state = {};
      }

	render() {
        
		return (
            <S.Widget>
              <S.Port
                style={{ right: -4, top: "50%" }}
                port={this.props.node.outPort}
                engine={this.props.engine}
              />
              <S.Input
                value={this.props.node.value}
                onChange={(e) => this.props.node.setValue(+e.target.value)}
              />
            </S.Widget>
		);
	}
}