/* eslint-disable max-params */
import { looper } from '../../../GAS | Library/v01/utils/looper';
import { performanceCheckerObj } from '../../../GAS | Library/v01/utils/performanceCheckerObj';
import { paste } from '../../../GAS | Library/v02/gas/paste';
import { getSheet } from '../../../GAS | Library/v02/gas/getSheet';
import { pipe } from '../../../GAS | Library/v02/fp/pipe';
import { goLocal, goExternal, goCache, getRandomData } from './tasks';

import { SHEETS } from './config';

/* ***************** Helpers ******************* */

/**
 * @type {array[]} Docelowa tablica na dane z czasami wykonywania funkcji
 */
const loggerRes = [];

/**
 * Template rodzaju testu
 * @param {string} jobType
 * @returns {(callback: function, identifier: string, task: string) => any}
 */
const run = jobType => (callback, identifier, task) => () =>
	performanceCheckerObj(loggerRes, callback, identifier, task, jobType);

const runJbJ = run('Job By Job');
const runTbT = run('Task By Task');

/**
 * Wkleja tablicę z czasami do wskazanego arkusza
 * @param {string} sheet
 */

const printTimes = sheet => () =>
	paste(getSheet(sheet), 'A', loggerRes, {
		notRemoveFilers: true,
		restrictCleanup: 'preserve',
	});

/* ***************** Strukrura testów ******************* */

/**
 * Odpalenie 'times' razy każdego zadania i przejście do następnego
 * @param {number} times
 * @param {function} callback Którą funkcję mam zastosowac
 * @param {string} task Opis np. Wklejenie danych (external)
 */

const runJobByJob = (times, callback, task) => () => {
	looper(times, runJbJ(callback('l100'), 'Arr 1: 100', task));
	looper(times, runJbJ(callback('l200'), 'Arr 2: 200', task));
	looper(times, runJbJ(callback('l500'), 'Arr 3: 500', task));
	looper(times, runJbJ(callback('l1000'), 'Arr 4: 1000', task));
	looper(times, runJbJ(callback('l2000'), 'Arr 5: 2000', task));
	looper(times, runJbJ(callback('l4000'), 'Arr 6: 4000', task));
	looper(times, runJbJ(callback('l8000'), 'Arr 7: 8000', task));
	looper(times, runJbJ(callback('l16000'), 'Arr 8: 16000', task));
};

/**
 * Odpalenie 'times' razy sekwencji składającej się ze wszystkich zadań
 * @param {number} times
 * @param {function} callback
 * @param {string} task Opis np. Wklejenie danych (external)
 */

const runTaskByTask = (times, callback, task) => () => {
	looper(times, () => {
		runTbT(callback('l100'), 'Arr 1: 100', task)();
		runTbT(callback('l200'), 'Arr 2: 200', task)();
		runTbT(callback('l500'), 'Arr 3: 500', task)();
		runTbT(callback('l1000'), 'Arr 4: 1000', task)();
		runTbT(callback('l2000'), 'Arr 5: 2000', task)();
		runTbT(callback('l4000'), 'Arr 6: 4000', task)();
		runTbT(callback('l8000'), 'Arr 7: 8000', task)();
		runTbT(callback('l16000'), 'Arr 8: 16000', task)();
	});
};

/**
 * Odpala wskazaną liczbę razy przekazaną funkcję (callback) wklejając
 * wyniki (czasy wykonania) do wskazanego arkusza
 *
 * @param {number} quant Liczba wykonań testu
 * @param {function} callback Funkcja do wykonania
 * @param {string} testType Rodzaj eksperymentu (jbj|tbt)
 * @param {string} desc Opis co robi funkcja (np. 'Wklejenie danych (cache)') pojawi się w tabeli jako opis zadania
 * @param {string} resSheet Nazwa arkusza do którego mają być wklejone wyniki (czasy)
 * @returns {function} Zwraca funkcję gotową do odpalenia
 */

const fire = (quant, callback, testType, desc, resSheet) => {
	if (testType !== 'jbj' && testType !== 'tbt')
		throw new Error(
			'fireExperiment accepts only "jbj" or "tbt" as testType'
		);

	const testTypeFn = testType === 'jbj' ? runJobByJob : runTaskByTask;
	return pipe(testTypeFn(quant, callback, desc), printTimes(resSheet));
};

const DESC = 'Wklejenie danych ';
const DESC_RAND = 'Wygenerowanie losowej tablicy';

/**
 * Obiekt ze wszystkimi callbackami do eksperymetów
 */
const exps = {
	/* WYGENEROWANIE LOSOWEJ TABLICY */
	randomJbJ: fire(50, getRandomData, 'jbj', DESC_RAND, SHEETS.RAND),
	randomTbT: fire(50, getRandomData, 'tbt', DESC_RAND, SHEETS.RAND),

	/* LOCAL */
	localJbJ: fire(10, goLocal, 'jbj', `${DESC}(local)`, SHEETS.LOCAL),
	localTbT: fire(10, goLocal, 'tbt', `${DESC}(local)`, SHEETS.LOCAL),

	/* EXTERNAL */
	extJbJ: fire(10, goExternal, 'jbj', `${DESC}(external)`, SHEETS.EXTER),
	extTbT: fire(10, goExternal, 'tbt', `${DESC}(external)`, SHEETS.EXTER),

	/* CACHE */
	cacheJbJ: fire(30, goCache, 'jbj', `${DESC}(cache)`, SHEETS.CACHE),
	cacheTbT: fire(30, goCache, 'tbt', `${DESC}(cache)`, SHEETS.CACHE),
};

export { exps };
