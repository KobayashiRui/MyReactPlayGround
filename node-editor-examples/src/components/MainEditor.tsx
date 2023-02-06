import createEngine, { DiagramModel, DefaultNodeModel, DefaultLinkModel } from '@projectstorm/react-diagrams';
import * as React from 'react';
import { CanvasWidget, DeleteItemsAction} from '@projectstorm/react-canvas-core';
import { DemoCanvasWidget } from './CanvasWidget';

import TestNodeModel from './CustomNodes/TestNode/Model';
import TesNodeFactory from './CustomNodes/TestNode/Factory'

import OutputNodeModel from './CustomNodes/OutputNode/Model';
import OutputNodeFactory from './CustomNodes/OutputNode/Factory'

import NumberSliderNodeModel from './CustomNodes/NumberSliderNode/Model';
import NumberSliderNodeFactory from './CustomNodes/NumberSliderNode/Factory'

import LinearArrayNodeModel from './CustomNodes/LinearArrayNode/Model';
import LinearArrayNodeFactory from './CustomNodes/LinearArrayNode/Factory'

import { MyLinkFactory } from './CustomLink/LinkFactory';

const MainEditor = () => {
	//1) setup the diagram engine
	var engine = createEngine({ registerDefaultDeleteItemsAction: false });
  engine.getLinkFactories().registerFactory(new MyLinkFactory());
  engine.getNodeFactories().registerFactory(new TesNodeFactory());
  engine.getNodeFactories().registerFactory(new OutputNodeFactory());
  engine.getNodeFactories().registerFactory(new NumberSliderNodeFactory());
  engine.getNodeFactories().registerFactory(new LinearArrayNodeFactory());

	//2) setup the diagram model
	var model = new DiagramModel();

	//3-A) create a default node
	var node1 = new DefaultNodeModel({
		name: 'Node 1',
		color: 'rgb(0,192,255)'
	});
	node1.setPosition(100, 100);
	let port1 = node1.addOutPort('Out');

	//3-B) create another default node
	var node2 = new DefaultNodeModel('Node 2', 'rgb(192,255,0)');
	let port2 = node2.addInPort('In');
	node2.setPosition(400, 100);


  //TestNode
  var node3 = new TestNodeModel(engine, 4);
  node3.setPosition(100, 300);

  //OutputNode
  var node4 = new OutputNodeModel(engine, 0);
  node4.setPosition(300, 300);

  var node5 = new NumberSliderNodeModel(engine, 1);
  node5.setPosition(500, 300);

  //Crate Array
  var node6 = new LinearArrayNodeModel(engine);
  node6.setPosition(100, 500)

	// link the ports
	let link1 = port1.link<DefaultLinkModel>(port2);

	//4) add the models to the root graph
	//model.addAll(node1, node2, node3, node4, link1);
	//model.addAll(node1, node2, node3, node4, node5, link1);
	model.addAll(node1, node2, node3, node4, node5, node6, link1);

	//5) load model into engine
	engine.setModel(model);

  engine.getActionEventBus().registerAction(new DeleteItemsAction({ keyCodes: [46] }));
	//6) render the diagram!
	return (
		<DemoCanvasWidget>
			<CanvasWidget engine={engine} />
		</DemoCanvasWidget>
	);
};

export default MainEditor