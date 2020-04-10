/* eslint-disable complexity */
/* eslint-disable max-lines-per-function */

import { getIdFromUrl } from '../../../GAS | Library/v02/gas/getIdFromUrl';
import { applyMassChangesToSheet } from '../../../GAS | Library/v02/gas/applyMassChangesToSheet';
import { applyMassChangesToSpreadsheet } from '../../../GAS | Library/v02/gas/applyMassChangesToSpreadsheet';

/**
 * @typedef {import('../../../GAS | Library/v02/gas/applyMassChangesToSpreadsheet').SheetMassChangesOptions} SheetMassChangesOptions
 */

const test = () => {
	const url =
		'https://docs.google.com/spreadsheets/d/138usMqswIw8Ki3PQc5qPmJLxL1MyqJt2dE1jG1C4j68/edit#gid=0';
	const ss = SpreadsheetApp.openById(getIdFromUrl(url));

	/**
	 * @type {SheetMassChangesOptions} newFormats
	 */

	const newFormats = {
		Arkusz1: [
			[
				'A1:H',
				{
					background: 'green',
					values: 'YOOOO',
					fontColor: 'white',
				},
			],
		],
		Arkusz2: [
			[
				'A1:H',
				{
					background: 'orange',
				},
			],
		],
	};
	applyMassChangesToSpreadsheet(ss, newFormats);

	// applyMassChangesToSheet(
	// 	newFormats.Arkusz1,
	// 	ss.getSheetByName('Arkusz1')
	// );
};

export { test };
const fileData = {};
const title = '';
const meanings = Object.values(fileData.sheetsMeaning).map(val => [val]);

/**
 * @type {SheetMassChangesOptions} wyniki
 */

const changes = {
	wyniki: [
		['A1:E4', { background: fileData.colorDark }],
		['A5:E', { background: fileData.colorLight }],
	],
	helper: [
		['B1', { values: title }],
		['B2', { values: fileData.name }],
		['E4:E9', { values: meanings }],
	],
	results: [['A1:BK2', { background: fileData.colorLight }]],
};

// {wyniki : [
// 	['A1:E4', { background: fileData.colorDark }],
// 	['A5:E', { background: fileData.colorLight }],
// ],

// const helper : [
// 	['B1', { values: ],
// 	['A5:E', { background: fileData.colorLight }],
// ]}
