/* eslint-disable complexity */
/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */

import { addToProps } from '../../../GAS | Library/v01/gas/properties';
import { adjustColumns } from '../../../GAS | Library/v01/gas/adjustColumns';
import { adjustRows } from '../../../GAS | Library/v01/gas/adjustRows';
import { randomIntegersArray2d } from '../../../GAS | Library/v02/arr/randomIntegersArray2d';
import { paste } from '../../../GAS | Library/v02/gas/paste';
import { deleteSheets } from '../../../GAS | Library/v01/gas/deleteSheets';
import { createFolder } from '../../../GAS | Library/v02/gas/createFolder';
import { getContainingFolder } from '../../../GAS | Library/v01/gas/getContainingFolder';
import { createSpreadsheetIn } from '../../../GAS | Library/v02/gas/createSpreadsheetIn';
import { pipe } from '../../../GAS | Library/v02/fp/pipe';
import { seq } from '../../../GAS | Library/v01/fp/seq';
import { buildResultsFiles } from '../../../GAS | Library/v02/experiments/buildResultsFiles';
import { buildLocalFile } from '../../../GAS | Library/v02/experiments/buildLocalFile';

import { EXP_SETUP } from './config';

const { structure, samples, misc } = EXP_SETUP;
const { fixedSize, fixed, randomData } = structure;
const { externalsSheetName, dataFolder, hubName, externalsPrefix } = misc;

/**
 * Tablica rozmiarów arkuszy które mają się znależć w plikach
 * @type {{code: string, size: number}[]} betterSamples
 */

const samplesArr = Object.entries(samples).map(([code, size]) => ({
	code,
	size,
}));

/**
 * Skoroszyt do którego dopięty jest skrypt (bound)
 * @type {GoogleAppsScript.Spreadsheet.Spreadsheet} ssLocal
 */

const localSpreadsheet = SpreadsheetApp.getActive();

/**
 * Folder, w którym znajduje się plik ze skryptem (bouund) eksperymentu
 * @returns {GoogleAppsScript.Drive.Folder}
 *
 */
const experimentRoot = () => getContainingFolder(localSpreadsheet);

/**
 * Wstawia odpowiedni arkusz z właściwą nazwą, rozmiarem i danymi
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} spreadsheet
 * @returns {(quant: number) => GoogleAppsScript.Spreadsheet.Sheet} Wstawiony sheet
 */

const insertProperSheet = spreadsheet => quant => {
	// Wstaw arkusz
	const sheet = spreadsheet.insertSheet(`${quant}`);

	// Dopasuje zafiksowany wymiar
	if (fixed === 'col') {
		adjustColumns(sheet, fixedSize);
		adjustRows(sheet, quant);
	} else if (fixed === 'row') {
		adjustRows(sheet, fixedSize);
		adjustColumns(sheet, quant);
	}

	// Wypełnij danymi
	if (randomData) {
		if (fixed === 'col') {
			paste(sheet, 'A', randomIntegersArray2d(quant, fixedSize));
		} else if (fixed === 'row') {
			paste(sheet, 'A', randomIntegersArray2d(fixedSize, quant));
		}
	}
	return sheet;
};

/**
 * Buduje plik Huba
 * @param {GoogleAppsScript.Drive.Folder} parent Folder katalogu w którym ma być utworzony plik
 */

const buildHub = parent => {
	const hubSpreadsheet = createSpreadsheetIn(parent, hubName);
	samplesArr
		.map(({ size }) => size)
		.forEach(insertProperSheet(hubSpreadsheet));

	deleteSheets(
		hubSpreadsheet,
		sheet =>
			!samplesArr
				.map(({ size }) => String(size))
				.includes(sheet.getName())
	);

	addToProps('script', 'HUB', hubSpreadsheet.getId());
};

/**
 * Tworzy pliki z danymi do eksperymentów external
 * @param {GoogleAppsScript.Drive.Folder} parent Folder katalogu w którym ma być utworzony plik
 */

const buildExternals = parent => {
	const urls = {};

	samplesArr.forEach(({ code, size }) => {
		const externalSpreadsheet = createSpreadsheetIn(
			parent,
			`${externalsPrefix}${size}`
		);
		insertProperSheet(externalSpreadsheet)(size).setName(
			externalsSheetName
		);
		deleteSheets(
			externalSpreadsheet,
			sheet => sheet.getName() !== externalsSheetName
		);

		urls[code] = externalSpreadsheet.getId();
	});

	addToProps('script', 'EXTERNALS', urls);
};

/**
 * Buduje strukruę danych niezbędnych dla eksperymentów.
 * 1. Dla każdego obiektu w EXP_SETUP.printTo tworzy plik z wynikami eksperymentów
 */

const buildStructure = () => {
	// 1. Pliki z wynikami
	buildResultsFiles(EXP_SETUP, experimentRoot());

	// 2.1. Arkusze lokalne - należy uzależnić od tego czy w configu są ustawiania dla lokalnych eksperymentów
	buildLocalFile(EXP_SETUP);

	// 2. Pliki z danymi
	pipe(
		() => createFolder(experimentRoot(), dataFolder),
		seq(buildHub, buildExternals)
	)();
};

export { buildStructure };
