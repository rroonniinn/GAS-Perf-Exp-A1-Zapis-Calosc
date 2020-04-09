/* eslint-disable max-params */
/**
 * @typedef {import('./types').ExpSheet} ExpSheet
 * @typedef {import('./types').ExpTasks} ExpTasks
 */

import { randomIntegersArray2d } from '../../../GAS | Library/v02/arr/randomIntegersArray2d';
import { crusherCache } from '../../../GAS | Library/v02/cache/crusherCache';
import { pipe } from '../../../GAS | Library/v02/fp/pipe';
import { randomFromArray } from '../../../GAS | Library/v02/arr/randomFromArray';
import { paste } from '../../../GAS | Library/v02/gas/paste';

import { getProperSheet, buildTask, single, TARGETS } from './helpers';

/**
 * Tablica docelowych arkuszy (tylko zawierających dane)
 * @type {[string, ExpSheet][]} targets Tablica docelowych wielkości arkuszy
 */

// const targets = Object.entries(TARGET_SHEETS).filter(
// 	([, { status }]) => status
// );

/**
 * Helper
 * Wpisuje w konsoli status działania
 *
 * @param {string} geo Źródło np. external
 * @param {string} desc Opis z którego arkusza wzięte dane
 * @returns {(val: array[]) => void}
 */
const printInfo = (geo, ver, desc) => val =>
	console.log(
		`** Set to ${geo} '${desc}' | Ver: ${ver} | ${val.length} rows`
	);

/**
 * Zwraca specyficzny obiekt do paste
 * @param {'default'|'full'|'nothing'} ver
 * @returns
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
 * @param {'default'|'full'|'nothing'} ver Wersja opcji - default - domyślna, full - dodane sortowanie do domyślej, nothing - tylko wkleja
 * @return {(target: ExpSheet) => function} target Np. target1 czy target2
 */
const setToSheet = (geo, ver) => target => {
	const data = randomIntegersArray2d(target.size, 15);

	return pipe(
		() => getProperSheet(geo, target),
		sheet => paste(sheet, 'A1', data, getOptions(ver)),
		() => printInfo(geo, ver, target.printName)
	);
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
	);
};

/**
 * Obiekt z zadaniami / eksperymentami do wykonania. Pierwszy argument
 * musi się zgadzać z tabelą printTo w EXP_SETUP
 * @type {ExpTasks[]}
 */

// Sety funkcji do losowania
const randomFnLoc = [
	buildTask('loc', setToSheet, ['loc', 'nothing'], 'a'),
	buildTask('loc', setToSheet, ['loc', 'default'], 'b'),
	buildTask('loc', setToSheet, ['loc', 'full'], 'c'),
];

const randomFnHub = [
	buildTask('hub', setToSheet, ['hub', 'nothing'], 'a'),
	buildTask('hub', setToSheet, ['hub', 'default'], 'b'),
	buildTask('hub', setToSheet, ['hub', 'full'], 'c'),
];

const randomFnExt = [
	buildTask('ext', setToSheet, ['ext', 'nothing'], 'a'),
	buildTask('ext', setToSheet, ['ext', 'default'], 'b'),
	buildTask('ext', setToSheet, ['ext', 'full'], 'c'),
];

// Przygotowanie zadań dla casha odpytywanego co 1, 15 i 30 min
const randomFnCacheA = [buildTask('cache', setToCache, ['va'], 'a')];
const randomFnCacheB = [buildTask('cache', setToCache, ['vb'], 'b')];
const randomFnCacheC = [buildTask('cache', setToCache, ['vc'], 'c')];
const randomFnCacheD = [buildTask('cache', setToCache, ['vd'], 'd')];

/**
 * Template losowego wyboru funkcji do wykonania
 * @param {ExpTasks[]} functionsSet
 */

const runRandom = functionsSet => () => {
	const [[, target]] = randomFromArray(TARGETS, 1);
	const [task] = randomFromArray(functionsSet, 1);

	single(target, task);
};

const randomExternal = runRandom(randomFnExt);
const randomLocal = runRandom(randomFnLoc);
const randomHub = runRandom(randomFnHub);
const randomCacheA = runRandom(randomFnCacheA);
const randomCacheB = runRandom(randomFnCacheB);
const randomCacheC = runRandom(randomFnCacheC);
const randomCacheD = runRandom(randomFnCacheD);

export {
	randomExternal,
	randomLocal,
	randomHub,
	randomCacheA,
	randomCacheB,
	randomCacheC,
	randomCacheD,
};
