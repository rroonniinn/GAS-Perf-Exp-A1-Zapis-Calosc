/* eslint-disable max-lines-per-function */

import {
	startMinuteTrigger,
	startHourTrigger,
	cancelTimeTriggers,
} from '../../../GAS | Library/v01/gas/timeTriggers';

import { buildStructure } from './buildStructure';
import {
	randomExternal,
	randomLocal,
	randomHub,
	randomCacheA,
	randomCacheB,
	randomCacheC,
	randomCacheD,
} from './tasks';
import { test } from './test';

// @ts-ignore
global.randomLocal = randomLocal;
// @ts-ignore
global.randomHub = randomHub;
// @ts-ignore
global.randomExternal = randomExternal;
// @ts-ignore
global.randomCacheA = randomCacheA;
// @ts-ignore
global.randomCacheB = randomCacheB;
// @ts-ignore
global.randomCacheC = randomCacheC;
// @ts-ignore
global.randomCacheD = randomCacheD;

// @ts-ignore
global.menu = {
	test,
	buildStructure,
	triggers: {
		loc: () => startMinuteTrigger('randomLocal', 1),
		hub: () => startMinuteTrigger('randomHub', 1),
		ext: () => startMinuteTrigger('randomExternal', 1),
		cacheA: () => startMinuteTrigger('randomCacheA', 1),
		cacheB: () => startMinuteTrigger('randomCacheB', 15),
		cacheC: () => startMinuteTrigger('randomCacheC', 30),
		cacheD: () => startHourTrigger('randomCacheD', 1),
		stop: cancelTimeTriggers,
	},
};

const menuElements = [
	['Zbuduj strukturę plików', 'menu.buildStructure'],
	'------------------',
	[
		'Test funkcji do odpalenia automatycznego',
		['Test : randomLocal', 'randomLocal'],
		['Test : randomHub', 'randomHub'],
		['Test : randomExternal', 'randomExternal'],
		'------------------',
		['Test : randomCache 1 min', 'randomCacheA'],
		['Test : randomCache 15 min', 'randomCacheB'],
		['Test : randomCache 30 min', 'randomCacheC'],
		['Test : randomCache 1h', 'randomCacheD'],
	],
	'------------------',
	['Uruchom Trigger dla Random Local', 'menu.triggers.loc'],
	['Uruchom Trigger dla Random Hub', 'menu.triggers.hub'],
	['Uruchom Trigger dla Random External', 'menu.triggers.ext'],
	'-----------------',
	['Uruchom Trigger dla Random Cache 1 min', 'menu.triggers.cacheA'],
	['Uruchom Trigger dla Random Cache 15 min', 'menu.triggers.cacheB'],
	['Uruchom Trigger dla Random Cache 30 min', 'menu.triggers.cacheD'],
	['Uruchom Trigger dla Random Cache 1 h', 'menu.triggers.cacheC'],
	'-------------------',
	['Zatrzymaj triggery', 'menu.triggers.stop'],
	'-------------------',
	['DEV', ['Test', 'menu.test'], ['Update menu', 'onOpen']],
];

export { menuElements };
