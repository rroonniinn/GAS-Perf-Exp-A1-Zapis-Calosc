/* eslint-disable max-lines-per-function */
// @ts-nocheck

import { disp } from '../../../GAS | Library/v01/gas/disp';

import {
	generateArraysJbJ,
	generateArraysTbT,
	generateArraysJbJAndTbT,
} from './taskGenerateRandomArrs';

import {
	pasteLocalJbJ,
	pasteLocalTbT,
	pasteExterJbJ,
	pasteExterTbT,
	pasteCacheJbJ,
	pasteCacheTbT,
} from './taskPasteData';

global.menu = {
	test: () => disp('hello'),
	generateArraysJbJ,
	generateArraysTbT,
	generateArraysJbJAndTbT,
	pasteLocalJbJ,
	pasteLocalTbT,
	pasteExterJbJ,
	pasteExterTbT,
	pasteCacheJbJ,
	pasteCacheTbT,
};

const menu = () => {
	const ui = SpreadsheetApp.getUi();
	ui.createMenu('ICON')
		.addSubMenu(
			ui
				.createMenu('Test generowania losowych tablic')
				.addItem(
					'Generuj tablicę Job by Job',
					'menu.generateArraysJbJ'
				)
				.addItem(
					'Generuj tablicę Task by Task',
					'menu.generateArraysTbT'
				)
				.addItem(
					'Generuj tablicę Oba systemy',
					'menu.generateArraysJbJAndTbT'
				)
		)
		.addSeparator()
		.addSubMenu(
			ui
				.createMenu('Test wklejania lokalnie')
				.addItem(
					'Wklejka lokalnie Job by Job',
					'menu.pasteLocalJbJ'
				)
				.addItem(
					'Wklejka lokalnie Task by Task',
					'menu.pasteLocalTbT'
				)
		)
		.addSeparator()
		.addSubMenu(
			ui
				.createMenu('Test wklejania external')
				.addItem(
					'Wklejka external Job by Job',
					'menu.pasteExterJbJ'
				)
				.addItem(
					'Wklejka external Task by Task',
					'menu.pasteExterTbT'
				)
		)
		.addSeparator()
		.addSubMenu(
			ui
				.createMenu('Test Cacha')
				.addItem(
					'Wklejka do cacha Job by Job',
					'menu.pasteCacheJbJ'
				)
				.addItem(
					'Wklejka do cacha Task by Task',
					'menu.pasteCacheTbT'
				)
		)
		.addSeparator()
		.addItem('Test', 'menu.test')
		.addSeparator()
		.addItem('Update menu', 'onOpen')
		.addToUi();
};

export { menu };
