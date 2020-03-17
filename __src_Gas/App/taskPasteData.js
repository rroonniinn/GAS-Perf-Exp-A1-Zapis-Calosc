/* eslint-disable max-params */
/* eslint-disable max-lines */
import { performanceCheckerObj } from '../../../GAS | Library/v01/utils/performanceCheckerObj';
import { looper } from '../../../GAS | Library/v01/utils/looper';
import { pipe } from '../../../GAS | Library/v02/fp/pipe';
import { paste } from '../../../GAS | Library/v02/gas/paste';
import { getSheet } from '../../../GAS | Library/v02/gas/getSheet';
import { getIdFromUrl } from '../../../GAS | Library/v02/gas/getIdFromUrl';
import { generateRandomArrs } from './generateRandomArrs';
import { crusherCache } from './crusherCache';
// import { disp } from '../../../GAS | Library/v01/gas/disp';

// Gdzie wklejać wyniki
const TIMES_SHEET_LOCAL = 'T: Wklejenie lokalnie';
const TIMES_SHEET_EXTERNAL = 'T: Wklejenie external';
const TIMES_SHEET_CACHE = 'T: Wklejenie cache';

const LOCAL_SHEET = {
	l100: 'res100',
	l200: 'res200',
	l500: 'res500',
	l1000: 'res1000',
	l2000: 'res2000',
	l4000: 'res4000',
	l8000: 'res8000',
	l16000: 'res16000',
};

const EXT_SHEET_URL = {
	l100:
		'https://docs.google.com/spreadsheets/d/1DAsts1B-JuYZUNoQ5oNthmty6LsljPbik5zBZUOjkxg',
	l200:
		'https://docs.google.com/spreadsheets/d/1YxrLrGK-qRM67D6RgBb03Ozvd7ZtNuahwLXlV18QMsw',
	l500:
		'https://docs.google.com/spreadsheets/d/1XZEMpV-BX0X_vRoXwDQE2Fx3Lfug1_cCbssFAN7D-nM',
	l1000:
		'https://docs.google.com/spreadsheets/d/1weGq34nlv0Tto-pjnIFLPG6yX_XX5XS91hFxcyUU3Ak',
	l2000:
		'https://docs.google.com/spreadsheets/d/14lGCP6Fp3UBnJpTl87-S14neBaE3r3ppZddxN1uSQj8',
	l4000:
		'https://docs.google.com/spreadsheets/d/1GXWLCEPXQOIGYhzrdxpuYk9VfNLyFMQFxgHoGYJYqTQ',
	l8000:
		'https://docs.google.com/spreadsheets/d/1yWJPLliF0CDPpS5QqEQJgkjvoUDy784g3UuAfd-vNIo',
	l16000:
		'https://docs.google.com/spreadsheets/d/1_bjTKNKUP_AvAkxmi92peD2t9cdMrsRatprzVvUlIXg',
};

const EXT_SHEET_NAME = 'res';

const tasks = generateRandomArrs;

/* ***************** Zadania wklejające ******************* */

/**
 * Wygeneruj i wklej lokalnie zestaw danych
 * @param {string} taskCode - np. l100
 */
const generateAndPasteLocal = taskCode => () => {
	const randomData = tasks[taskCode]();
	paste(getSheet(LOCAL_SHEET[taskCode]), 'A1', randomData);
};

/**
 * Wygeneruj i wklej do zewnętrznego arkusza zestaw danych
 * @param {string} taskCode - np. l100
 */
const generateAndPasteExternal = taskCode => () => {
	const randomData = tasks[taskCode]();
	paste(
		getSheet(EXT_SHEET_NAME, getIdFromUrl(EXT_SHEET_URL[taskCode])),
		'A1',
		randomData
	);
};

/**
 * Wygeneruj i wklej do cacha zestaw danych
 * @param {string} taskCode - np. l100
 */
const generateAndPasteCache = taskCode => () => {
	const randomData = tasks[taskCode]();
	crusherCache.put(taskCode, randomData);
	// disp(`Dane wklejone do cacha: ${randomData[0][0]}`);
};
// Sprawdzanie zawartości
// const checkCache = taskCode => () => {
// 	const retrivedData = crusherCache.get(taskCode);
// 	disp(`Dane pozyskane z cacha: ${retrivedData[0][0]}`);
// };

/* ***************** Strukrura testów ******************* */

const loggerRes = [];

/**
 * @param {string} jobType
 * @returns {(callback: function, identifier: string, task: string) => any}
 */
const run = jobType => (callback, identifier, task) => () =>
	performanceCheckerObj(loggerRes, callback, identifier, task, jobType);

const runJbJ = run('Job By Job');
const runTbT = run('Task By Task');

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
 * Odpalenie 30 razy sekwencji składającej się ze wszystkich zadań
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
 * Wkleja tablicę z czasami do wskazanego arkusza
 *
 * @param {string} sheet
 */

const printTimes = sheet => () =>
	paste(getSheet(sheet), 'A', loggerRes, {
		notRemoveFilers: true,
		restrictCleanup: 'preserve',
	});

// Funkcje do uruchomienia masowych testów:

/* *************** LOCAL ****************** */
// JobByJob
const pasteLocalJbJ = pipe(
	runJobByJob(5, generateAndPasteLocal, 'Wklejenie danych (local)'),
	printTimes(TIMES_SHEET_LOCAL)
);

// TaskByTask
const pasteLocalTbT = pipe(
	runTaskByTask(5, generateAndPasteLocal, 'Wklejenie danych (local)'),
	printTimes(TIMES_SHEET_LOCAL)
);

/* *************** EXTERNAL ****************** */

// JobByJob
const pasteExterJbJ = pipe(
	runJobByJob(
		5,
		generateAndPasteExternal,
		'Wklejenie danych (external)'
	),
	printTimes(TIMES_SHEET_EXTERNAL)
);

// TaskByTask
const pasteExterTbT = pipe(
	runTaskByTask(
		5,
		generateAndPasteExternal,
		'Wklejenie danych (external)'
	),
	printTimes(TIMES_SHEET_EXTERNAL)
);

/* *************** CACHE ****************** */

// JobByJob
const pasteCacheJbJ = pipe(
	runJobByJob(20, generateAndPasteCache, 'Wklejenie danych (cache)'),
	printTimes(TIMES_SHEET_CACHE)
);

// TaskByTask
const pasteCacheTbT = pipe(
	runTaskByTask(20, generateAndPasteCache, 'Wklejenie danych (cache)'),
	printTimes(TIMES_SHEET_CACHE)
);

export {
	pasteLocalJbJ,
	pasteLocalTbT,
	pasteExterJbJ,
	pasteExterTbT,
	pasteCacheJbJ,
	pasteCacheTbT,
};
