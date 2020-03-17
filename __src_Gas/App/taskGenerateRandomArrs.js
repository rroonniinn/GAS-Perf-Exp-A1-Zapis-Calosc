import { performanceCheckerObj } from '../../../GAS | Library/v01/utils/performanceCheckerObj';
import { looper } from '../../../GAS | Library/v01/utils/looper';
import { pipe } from '../../../GAS | Library/v02/fp/pipe';
import { paste } from '../../../GAS | Library/v02/gas/paste';
import { getSheet } from '../../../GAS | Library/v02/gas/getSheet';

import { generateRandomArrs } from './generateRandomArrs';

const tasks = generateRandomArrs;

const TIMES_SHEET = 'T: Generowanie tablic';
const loggerRes = [];

/**
 * @param {string} task
 * @param {string} jobType
 * @returns {(callback: function, identifier: string) => any}
 */
const run = (task, jobType) => (callback, identifier) => () =>
	performanceCheckerObj(loggerRes, callback, identifier, task, jobType);

const runJbJ = run('Wygenerowanie losowej tablicy', 'Job By Job');
const runTbT = run('Wygenerowanie losowej tablicy', 'Task By Task');

/**
 * Odpalenie 'times' razy każdego zadania i przejście do następnego
 * @param {number} times
 */

const runJobByJob = times => () => {
	looper(times, runJbJ(tasks.l100, 'Arr 1: 100'));
	looper(times, runJbJ(tasks.l200, 'Arr 2: 200'));
	looper(times, runJbJ(tasks.l500, 'Arr 3: 500'));
	looper(times, runJbJ(tasks.l1000, 'Arr 4: 1000'));
	looper(times, runJbJ(tasks.l2000, 'Arr 5: 2000'));
	looper(times, runJbJ(tasks.l4000, 'Arr 6: 4000'));
	looper(times, runJbJ(tasks.l8000, 'Arr 7: 8000'));
	looper(times, runJbJ(tasks.l16000, 'Arr 8: 16000'));
};

/**
 * Odpalenie 30 razy sekwencji składającej się ze wszystkich zadań
 * @param {number} times
 */

const runTaskByTask = times => () => {
	looper(times, () => {
		runTbT(tasks.l100, 'Arr 1: 100')();
		runTbT(tasks.l200, 'Arr 2: 200')();
		runTbT(tasks.l500, 'Arr 3: 500')();
		runTbT(tasks.l1000, 'Arr 4: 1000')();
		runTbT(tasks.l2000, 'Arr 5: 2000')();
		runTbT(tasks.l4000, 'Arr 6: 4000')();
		runTbT(tasks.l8000, 'Arr 7: 8000')();
		runTbT(tasks.l16000, 'Arr 8: 16000')();
	});
};

const printTimes = () =>
	paste(getSheet(TIMES_SHEET), 'A', loggerRes, {
		notRemoveFilers: true,
		restrictCleanup: 'preserve',
	});

// Funkcje do uruchomienia masowych testów:
// JobByJob
const generateArraysJbJ = pipe(runJobByJob(20), printTimes);

// TaskByTask
const generateArraysTbT = pipe(runTaskByTask(20), printTimes);
// All
const generateArraysJbJAndTbT = () => {
	generateArraysJbJ();
	generateArraysTbT();
};

export { generateArraysJbJ, generateArraysTbT, generateArraysJbJAndTbT };
