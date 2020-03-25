// @ts-nocheck

import { ditributeToOtherFiles } from './ditributeToOtherFiles';
import { exps, runRandomSingle } from './experiments';

// global.runRandomSingle = () => {
// 	runRandomSingle();
// };

global.menu = {
	test: () => console.log('hello'),
	exps,
	ditributeToOtherFiles,
};

const menu = () => {
	const ui = SpreadsheetApp.getUi();
	ui.createMenu('ICON')
		.addSubMenu(
			ui
				.createMenu('Exp: Generuj losowe dane')
				.addItem('Job by Job', 'menu.exps.randomJbJ')
				.addItem('Task by Task', 'menu.exps.randomTbT')
		)
		.addSeparator()
		.addSubMenu(
			ui
				.createMenu('Exp: Wklejenie lokalnie')
				.addItem('Job by Job', 'menu.exps.localJbJ')
				.addItem('Task by Task', 'menu.exps.localTbT')
		)
		.addSeparator()
		.addSubMenu(
			ui
				.createMenu('Exp: Wklejenie external')
				.addItem('Job by Job', 'menu.exps.extJbJ')
				.addItem('Task by Task', 'menu.exps.extTbT')
		)
		.addSeparator()
		.addSubMenu(
			ui
				.createMenu('Exp: Wklejenie Cache')
				.addItem('Job by Job', 'menu.exps.cacheJbJ')
				.addItem('Task by Task', 'menu.exps.cacheTbT')
		)
		.addSeparator()
		.addItem('Distribute', 'menu.ditributeToOtherFiles')
		.addItem('Test', 'menu.test')
		.addSeparator()
		.addItem('Update menu', 'onOpen')
		.addToUi();
};

export { menu };
