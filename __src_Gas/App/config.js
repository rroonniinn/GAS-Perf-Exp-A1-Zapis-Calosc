/**
 * Times Sheets
 * @typedef {Object} TimesSheets
 * @property {string} LOCAL Wklejka lokalna
 * @property {string} EXTER Wklejka do zewnętrznych plików
 * @property {string} CACHE Wklejka do cacha
 * @property {string} RAND Wklejka do randomowych danych
 * @property {string} HUB Wklejka randomowych danych do Hub
 */
/**
 * @type {TimesSheets} SHEETS Arkusze do wklejania wyników eksperymentów
 */
const SHEETS = {
	RAND: 'T: Generowanie tablic',
	LOCAL: 'T: Wklejenie lokalnie',
	EXTER: 'T: Wklejenie external',
	HUB: 'T: Wklejenie hub',
	CACHE: 'T: Wklejenie cache',
};

/**
 * Arkusze lokalne do których wklejamy losowe dane podczas eksperymentu
 * @type {Object<string, string>} LOCAL_SHEET
 */
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

/**
 * URL zewnętrznego pliku - HUBa, w którym znajdują się indywidualne arkusze z danymi
 * @type {string} EXT_SHEET_NAME
 */

const EXT_SHEET_HUB_URL =
	'https://docs.google.com/spreadsheets/d/1jV4rpRvNNbg5nvDdEdJ1bDBNzduhdnYlvbpac7QYQag';

/**
 * URLe zewnętrznych arkuszy do których wklejamy losowe dane
 * @type {Object<string, string>} EXT_SHEET_URL
 */
const EXT_SHEET_URL = {
	l100:
		'https://docs.google.com/spreadsheets/d/1KscrLBlzayuSjJorHpBqJQ1BXuSSogxtF5_GkZYzPdU',
	l200:
		'https://docs.google.com/spreadsheets/d/1UFyJp78Oivl7WqKPH3EIed3P7_ycM9KmlsmDJ_NrkE4',
	l500:
		'https://docs.google.com/spreadsheets/d/1zPkANYgFhX4o00cluuNIeWglmQHiTUR_QwIPtkK5APk',
	l1000:
		'https://docs.google.com/spreadsheets/d/1TGJr_QrdF1dpYagglMvP2rwnHk_NtuuWq8Eat4fumsE',
	l2000:
		'https://docs.google.com/spreadsheets/d/1fPYh3pVP7cCRflaxiMQxsNdb7VPKx03YH5ROKtSyTSE',
	l4000:
		'https://docs.google.com/spreadsheets/d/1TUiWAuecd5XZElF-jI34GxSUHuz3h-i4-Oj-TAnyTlg',
	l8000:
		'https://docs.google.com/spreadsheets/d/11-5VSLToGwanv6x18LWgPxrpzo0MHBwwRF93y0q8MFg',
	l16000:
		'https://docs.google.com/spreadsheets/d/1KNeNwxiB4yQ8b_bynDu78KwynMHCxNCkL035fZiaxck',
};
/**
 * Nazwa arkusza w zewnętrznym pliku, w którym znajdują się losowe dane
 * @type {string} EXT_SHEET_NAME
 */
const EXT_SHEET_NAME = 'res';

/**
 * Opis zadania wykorzysytwany w singlu
 * @type {Object<string, string>}
 */

const SHORT_DSC = {
	l100: 'Arr 1: 100',
	l200: 'Arr 2: 200',
	l500: 'Arr 3: 500',
	l1000: 'Arr 4: 1000',
	l2000: 'Arr 5: 2000',
	l4000: 'Arr 6: 4000',
	l8000: 'Arr 7: 8000',
	l16000: 'Arr 8: 16000',
};

/**
 * Dłuższy opis wykorzystywany w singlu
 * @type {Object<string, string>}
 */

const LONG_DESC = {
	getRandomData: 'Wygenerowanie losowej tablicy',
	goLocal: 'Wklejenie danych (local)',
	goExternal: 'Wklejenie danych (external)',
	goCache: 'Wklejenie danych (cache)',
	goHub: 'Wklejenie danych (hub)',
};

/**
 * Gdzie wkleić wyniki ekspetymentów
 * @type {Object<string, string>}
 */

const WHERE_TO_PRINT = {
	getRandomData: SHEETS.RAND,
	goLocal: SHEETS.LOCAL,
	goExternal: SHEETS.EXTER,
	goHub: SHEETS.HUB,
	goCache: SHEETS.CACHE,
};

export {
	SHEETS,
	LOCAL_SHEET,
	EXT_SHEET_URL,
	EXT_SHEET_NAME,
	SHORT_DSC,
	EXT_SHEET_HUB_URL,
	LONG_DESC,
	WHERE_TO_PRINT,
};
