/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
/* eslint-disable max-params */
/**
 * @typedef {import('./../../../A.001 - My Library/v02/experiments/types').ExpSheet} ExpSheet
 * @typedef {import('./../../../A.001 - My Library/v02/experiments/types').ExpTasks} ExpTasks
 * @typedef {import('./../../../A.001 - My Library/v02/gas/styleSheet').RangeOptions} RangeOptions
 */

import { setMenu } from '../../../A.001 - My Library/v02/gas/setMenu';
import { randomIntegersArray2d } from '../../../A.001 - My Library/v02/arr/randomIntegersArray2d';
import { crusherCache } from '../../../A.001 - My Library/v02/cache/crusherCache';
import { pipe } from '../../../A.001 - My Library/v02/fp/pipe';
import { paste } from '../../../A.001 - My Library/v02/gas/paste';
import { getProperSheet } from '../../../A.001 - My Library/v02/experiments/getProperSheet';
import { runRandom } from '../../../A.001 - My Library/v02/experiments/runRandom';
import { buildStructure } from '../../../A.001 - My Library/v02/experiments/buildStructure';
import {
	setEveryMin,
	stopTimeTriggers,
} from '../../../A.001 - My Library/v01/gas/timeTriggers';

import { EXP_SETUP } from './config';

/**
 * * Helper
 * Funkcja oczekująca tablicy funkcji z których będzie losowała te, które
 * mają właśnie się odpalić. Załadowany jest już do niej plik configu
 * @type {(arr: [string, function, string][]) => void}
 */

const go = runRandom(EXP_SETUP);

/* ******************************* ZADANIA ******************************** */

/**
 * Helper
 * Wpisuje w konsoli status działania
 *
 * @param {string} geo Źródło np. external
 * @param {string} ver Wersja eksperymentu
 * @param {string} desc Opis z którego arkusza wzięte dane
 */
const printInfo = (geo, ver, desc) =>
	console.log(`** Set to ${geo.toUpperCase()} '${desc}' | Ver: ${ver}`);

/**
 * Helper
 * Zapisz dane używając natywnego mechanizmu - A1:O
 * @param {array[]} data Dane do wklejenia
 * @return {(sheet: GoogleAppsScript.Spreadsheet.Sheet) => void}
 */

const pasteNativeShort = (data, sheet) =>
	sheet.getRange('A1:O').setValues(data);

/**
 * Helper
 * Zapisz dane używając natywnego mechanizmu - A1:Oxxx
 * @param {array[]} data Dane do wklejenia
 * @return {(sheet: GoogleAppsScript.Spreadsheet.Sheet) => void}
 */

const pasteNativeFull = (data, sheet) =>
	sheet.getRange(`A1:O${data.length}`).setValues(data);

/**
 * Zwraca specyficzny obiekt do paste. Dla 'native' nie jest wywoływana
 * @param {'default'|'full'|'nothing'|'nativeS'|'nativeF'} ver
 */

const getOptions = ver => {
	if (ver === 'default')
		return {
			notRemoveFilers: false,
			sort: null,
			sortOrder: null,
			restrictCleanup: null,
			notRemoveEmptys: false,
		};
	if (ver === 'nothing')
		return {
			notRemoveFilers: true,
			restrictCleanup: 'preserve',
			notRemoveEmptys: true,
		};
	if (ver === 'full') {
		return {
			sort: 1,
			sortOrder: 'az',
		};
	}
};

/**
 * Zapisz losowe dane dane do wskazanego źródła i wskazanego arkusza
 * @param {'ext'|'loc'|'hub'} geo Strukura danych do pobrania
 * @param {'default'|'full'|'nothing'|'nativeS'|'nativeF'} ver Wersja opcji
 * - default - domyślna, full - dodane sortowanie do domyślnej,
 * nothing - tylko wkleja dane, nativeS - krótka wersja natywna, nativeF
 * - dłuższa wersja natywna
 * @return {(target: ExpSheet) => any} target Np. target1 czy target2
 */

const setToSheet = (geo, ver) => target => {
	const data = randomIntegersArray2d(target.size, 15);
	const sheet = getProperSheet(geo, target, EXP_SETUP);

	printInfo(geo, ver, target.printName);

	if (!ver.includes('native')) {
		return paste(sheet, 'A1', data, getOptions(ver));
	}
	if (ver === 'nativeS') {
		return pasteNativeShort(data, sheet);
	}
	if (ver === 'nativeF') {
		return pasteNativeFull(data, sheet);
	}

	// return pipe(
	// 	() => getProperSheet(geo, target, EXP_SETUP),
	// 	sheet =>
	// 		ver !== 'native'
	// 			? paste(sheet, 'A1', data, getOptions(ver))
	// 			: pasteNativeShort(data),
	// 	() => printInfo(geo, ver, target.printName)
	// );
};

/**
 * Wklej dane do cacha
 * @param {string} prefix Przedrostek odróżniający cache od siebie
 * do testów 1, 15, 30 min i 1h
 * @returns {(target: ExpSheet) => function} target Np. target1 czy target2
 */
const setToCache = prefix => target => {
	const data = randomIntegersArray2d(target.size, 15);

	return pipe(
		() => crusherCache.put(`${prefix}${target.size}`, data, 360),
		() => printInfo('cache', prefix, target.printName)
	)();
};

/* **************************** SETUP EXPERYMENTU ************************ */

// @ts-ignore
global.exp = {
	// Sety funkcji do losowania
	loc: go([
		['loc', setToSheet('loc', 'nothing'), 'a'],
		['loc', setToSheet('loc', 'default'), 'b'],
		['loc', setToSheet('loc', 'full'), 'c'],
		['loc', setToSheet('loc', 'nativeS'), 'd'],
		['loc', setToSheet('loc', 'nativeF'), 'e'],
	]),
	hub: go([
		['hub', setToSheet('hub', 'nothing'), 'a'],
		['hub', setToSheet('hub', 'default'), 'b'],
		['hub', setToSheet('hub', 'full'), 'c'],
		['hub', setToSheet('hub', 'nativeS'), 'd'],
		['hub', setToSheet('hub', 'nativeF'), 'e'],
	]),
	ext: go([
		['ext', setToSheet('ext', 'nothing'), 'a'],
		['ext', setToSheet('ext', 'default'), 'b'],
		['ext', setToSheet('ext', 'full'), 'c'],
		['ext', setToSheet('ext', 'nativeS'), 'd'],
		['ext', setToSheet('ext', 'nativeF'), 'e'],
	]),
	// Zadania dla casha odpytywanego co 1, 15 i 30 min
	cache: go([['cache', setToCache('va'), 'a']]),
};

// @ts-ignore
global.utils = {
	buildStructure: () => buildStructure(EXP_SETUP),
	triggersFire: () => {
		setEveryMin('exp.loc', 1);
		setEveryMin('exp.hub', 1);
		setEveryMin('exp.ext', 1);
		setEveryMin('exp.cache', 1);
	},
	triggersStop: stopTimeTriggers,
};

const menuElements = [
	['Zbuduj / zresetuj strukturę plików', 'utils.buildStructure'],
	[
		'Przetestuj funkcje',
		['Test : randomLocal', 'exp.loc'],
		['Test : randomHub', 'exp.hub'],
		['Test : randomExternal', 'exp.ext'],
		['Test : randomCache 1 min', 'exp.cache'],
	],
	'-------------------',
	['Uruchom eksperyment', 'utils.triggersFire'],
	['Zatrzymaj eksperyment', 'utils.triggersStop'],
	'-------------------',
	['Update menu', 'onOpen'],
];

// @ts-ignore
global.onOpen = () => {
	setMenu(menuElements, 'ICON', true);
};

export { setToSheet, setToCache };
