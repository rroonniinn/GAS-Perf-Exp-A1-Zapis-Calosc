import { randomIntegersArray2d } from '../../../GAS | Library/v02/arr/randomIntegersArray2d';
import { paste } from '../../../GAS | Library/v02/gas/paste';
import { getSheet } from '../../../GAS | Library/v02/gas/getSheet';
import { getIdFromUrl } from '../../../GAS | Library/v02/gas/getIdFromUrl';
import { crusherCache } from '../../../GAS | Library/v02/cache/crusherCache';
import { LOCAL_SHEET, EXT_SHEET_URL, EXT_SHEET_NAME } from './config';

/**
 * Obiekt z funkcjami generującymi losowe tablice z numerami od 0 do 1000
 * o różnej liczbie wierszy i 15 kolumnach
 * @type {Object<string, function>} generateRandomArrs
 */

const generateData = {
	l100: () => randomIntegersArray2d(100, 15),
	l200: () => randomIntegersArray2d(200, 15),
	l500: () => randomIntegersArray2d(500, 15),
	l1000: () => randomIntegersArray2d(1000, 15),
	l2000: () => randomIntegersArray2d(2000, 15),
	l4000: () => randomIntegersArray2d(4000, 15),
	l8000: () => randomIntegersArray2d(8000, 15),
	l16000: () => randomIntegersArray2d(16000, 15),
};

/**
 * Pobiera odpowiednią funkcję generującą losowe dane
 * @param {string} taskCode Zdefiniowany kod zadania np. l100
 */
const getRandomData = taskCode => generateData[taskCode];

/**
 * Wygeneruj losowe liczby i wklej je lokalnie
 * @param {string} taskCode Zdefiniowany kod zadania np. l100
 */
const goLocal = taskCode => () => {
	const randomData = generateData[taskCode]();
	paste(getSheet(LOCAL_SHEET[taskCode]), 'A1', randomData);
};

/**
 * Wygeneruj losowe liczby i wklej je do zewnętrznego arkusza
 * @param {string} taskCode Zdefiniowany kod zadania np. l100
 */
const goExternal = taskCode => () => {
	const randomData = generateData[taskCode]();
	paste(
		getSheet(EXT_SHEET_NAME, getIdFromUrl(EXT_SHEET_URL[taskCode])),
		'A1',
		randomData
	);
};

/**
 * Wygeneruj losowe liczby  i wklej je do cacha
 * @param {string} taskCode Zdefiniowany kod zadania np. l100
 */
const goCache = taskCode => () => {
	const randomData = generateData[taskCode]();
	crusherCache.put(taskCode, randomData, 120);
};

export { goLocal, goExternal, goCache, getRandomData };
