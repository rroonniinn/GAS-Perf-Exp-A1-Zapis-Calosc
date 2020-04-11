/* eslint-disable complexity */
/* eslint-disable max-lines-per-function */

import { modifySheet } from '../../../GAS | Library/v02/gas/modifySheet';
import { modifySheets } from '../../../GAS | Library/v02/gas/modifySheets';

/**
 * @typedef {import('../../../GAS | Library/v02/gas/modifySheets').SheetMassChangesOptions} SheetMassChangesOptions
 * @typedef {import('../../../GAS | Library/v02/gas/modifySheet').RangeOptions} RangeOptions
 */

/**
 * @type {RangeOptions} wyniki
 */

const changes = [
	'C2:C5',
	{
		values: [
			['18mM6G0g0HCxc22EPi4kRN-VZM8CcuycbKGUGooW8m-Q'],
			['1qRmFHwdzFaxt9ojeVT3uoDreVwYu468IEuTPaOvIMoQ'],
			['1ANTyE8njV4O54MztLSP-yshF7VsUVvzKO1YvHiRQUaA'],
			['1K7ruwoS97b_Ex9kgJwlgsEFz50_sBBEagV8dL5784PI'],
		],
	},
];

const test = () => {
	// const id = '1cXQ4W0Tvwojh5q7h3HczE0W4lJi2Oiuqli1t2N0Nm40';
	// const ss = SpreadsheetApp.openById(id);

	// modifySheets(ss, changes)
	// 	.getSheets()
	// 	.filter(sheet => /[A-Z]$/.test(sheet.getName()))
	// 	.forEach(sheet =>
	// 		modifySheet(
	// 			[['A1:BK2', { background: fileData.colorLight }]],
	// 			sheet
	// 		)
	// 	);
	modifySheet(
		[changes],
		'Setup',
		'1vGfYPKg6oAYtRc4JEhvMLruFhlddL1_QK4v_jN_k-sI'
	);
};

export { test };
