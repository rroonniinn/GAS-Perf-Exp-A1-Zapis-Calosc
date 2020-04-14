import { setMenu } from '../../GAS | Library/v02/gas/setMenu';

import { menuElements } from './App/menu';

// @ts-ignore
global.onOpen = () => {
	setMenu(menuElements, 'ICON', true);
};
