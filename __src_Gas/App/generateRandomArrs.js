import { randomIntegersArray2d } from '../../../GAS | Library/v02/arr/randomIntegersArray2d';

/**
 * Obiekt z funkcjami generującymi losowe tablice z liczbami o
 * różnej liczbie wierszy i 15 kolumnach
 * @type {object} generateRandomArrs
 */

const generateRandomArrs = {
	l100: () => randomIntegersArray2d(100, 15),
	l200: () => randomIntegersArray2d(200, 15),
	l500: () => randomIntegersArray2d(500, 15),
	l1000: () => randomIntegersArray2d(1000, 15),
	l2000: () => randomIntegersArray2d(2000, 15),
	l4000: () => randomIntegersArray2d(4000, 15),
	l8000: () => randomIntegersArray2d(8000, 15),
	l16000: () => randomIntegersArray2d(16000, 15),
};

export { generateRandomArrs };
