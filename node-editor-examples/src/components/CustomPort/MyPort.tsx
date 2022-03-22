import {
	DefaultPortModel,
} from '@projectstorm/react-diagrams';

import { MyLinkModel } from '../CustomLink/LinkModel';

export class MyPortModel extends DefaultPortModel {
	createLinkModel(): any{
		return new MyLinkModel();
	}
}