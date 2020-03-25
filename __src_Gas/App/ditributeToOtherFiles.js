/**
 * Rozdzielenie danych z jednego pliku na niezależne
 */

import { getSheet } from '../../../GAS | Library/v02/gas/getSheet';
import { getIdFromUrl } from '../../../GAS | Library/v02/gas/getIdFromUrl';
import { copySheetsToOther } from '../../../GAS | Library/v02/gas/copySheetsToOther';
import { paste } from '../../../GAS | Library/v02/gas/paste';

const TEMPLATE = {
	url:
		'https://docs.google.com/spreadsheets/d/1Z2bqYpy2UA4QLhs5GXZNbxA2ZXOOk_pmyRbkufbfbI4/edit#gid=1817049872',
	sheet: 'Template',
};

const EXTERNALS = {
	genTabJbJ: {
		url:
			'https://docs.google.com/spreadsheets/d/1iyoYG3s8X-oRuJcMhlBRKg6gxwrVfaGug32hEKdqgpo/edit#gid=0',
		sheetScheme: 'Generowanie tablic (JbJ)',
		header: 'Generowanie tablic randomowych (Job by Job)',
		// types: 'Job By Job',
	},
	genTabSingle: {
		url:
			'https://docs.google.com/spreadsheets/d/1CA3SzJijI_kdgPV0FZ0-29AcdtA96RNNyWjLCfPEM5I/edit#gid=0',
		sheetScheme: 'Generowanie tablic (Single)',
		header: 'Generowanie tablic randomowych (Single Random)',
		// types: 'Job By Job',
	},
	genTabTbT: {
		url:
			'https://docs.google.com/spreadsheets/d/1f6Pa0zUcUItVRSV9IOI7K62oWFgXLdNXb2b2x-Ryw7w/edit#gid=0',
		sheetScheme: 'Generowanie tablic (TbT)',
		header: 'Generowanie tablic randomowych (Task by Task)',
		// types: 'Job By Job',
	},
	jbj: {
		url:
			'https://docs.google.com/spreadsheets/d/1ZjrluJdnJ4qvXmjzU-laAASDjgl-pswSYPwPkgZ2QgU/edit#gid=0',
		sheetScheme: '(JbJ)',
		header: 'Zapis - Cały arkusz (Job by Job)',
		// types: 'Job By Job',
	},
	single: {
		url:
			'https://docs.google.com/spreadsheets/d/14BsVRIj2zvwI88ZP5ejsoHJtxgXZoFP2JlxvPc1n-0s/edit#gid=0',
		sheetScheme: '(Single)',
		header: 'Zapis - Cały arkusz (Single Random)',
		// types: 'Job By Job',
	},
	tbt: {
		url:
			'https://docs.google.com/spreadsheets/d/11UhBMYVqRPIqCwrbwJiyp6IuNEe0VQvg59ZoGTRpqEY/edit#gid=0',
		sheetScheme: '(TbT)',
		header: 'Zapis - Cały arkusz (Task by Task)',
		// types: 'Job By Job',
	},
};

/**
 *
 *
 * @param {string} taskCode - np. sortedJbJ
 */
const ditribute = taskCode => {
	// Pobierz plik docelowy
	const targetId = getIdFromUrl(EXTERNALS[taskCode].url);

	// pobierz istniejace
	const sources = SpreadsheetApp.getActive()
		.getSheets()
		.filter(sheet =>
			sheet.getName().includes(EXTERNALS[taskCode].sheetScheme)
		);

	// dla każdego sheeta powyższego wyknaj:
	sources.forEach(srcSheet => {
		// skopiuj arkusz z templatem
		copySheetsToOther(getIdFromUrl(TEMPLATE.url), targetId, sheet =>
			sheet.getName().includes('Template')
		);

		// pobierz skopiowany arkusz
		const sheetToPaste = getSheet('Template', targetId);

		// pobierz dane i pozostaw tylk pasujące do wzoru
		const data = srcSheet.getRange('A3:E').getValues();
		// .filter(
		// 	([, , , , type]) => type === EXTERNALS[taskCode].types
		// );

		const srcSheetName = srcSheet.getName();

		// wklej i zmień nazwę i nagłówek
		paste(sheetToPaste, 'A', data, {
			restrictCleanup: 'down',
		})
			.setName(srcSheetName)
			.collapseAllRowGroups()
			.getRange('AT1')
			.setValue(EXTERNALS[taskCode].header);
		// .setValue(
		// 	`External - modyfikacja ${
		// 		/[0-9]+/.exec(srcSheetName)[0]
		// 	} niezależnych wierszy (Single Random)`
		// );
	});
};

const ditributeToOtherFiles = () => {
	Object.keys(EXTERNALS).forEach(code => ditribute(code));
};

export { ditributeToOtherFiles };
