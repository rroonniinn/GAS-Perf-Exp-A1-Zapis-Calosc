/* eslint-disable max-lines-per-function */
import { getChartAtLocation } from '../../../GAS | Library/v02/gas/getChartAtLocation';
import { getChartInfo } from '../../../GAS | Library/v02/gas/getChartInfo';
import { getSheet } from '../../../GAS | Library/v02/gas/getSheet';

const test = () => {
	const url = '10VoCF3VehjS54auDhfyNHpIRuMi7ABqfBfFzsmlg4yc';
	const sheet = getSheet('Wyniki', url);

	const colorA = '#ffff00'; // yellow
	const colorB = '#c32e21'; // redDark
	const colorBg = '#ea4335'; // red
	const chart = getChartAtLocation('A', 13, sheet)
		.modify()
		.asComboChart()
		.setOption('backgroundColor', {
			fill: colorBg,
			stroke: colorBg,
			strokeWidth: 1,
		})
		.setOption('fontName', 'Roboto Condensed')
		.setOption('hAxis', { textStyle: { color: 'white' } })
		.setOption('series', {
			0: {
				targetAxisIndex: 1,
				type: 'line',
				color: colorA,
				curveType: 'function',
				lineWidth: 4,
				pointSize: 7,
				dataLabel: 'value',
				dataLabelPlacement: 'above',
				annotations: {
					textStyle: {
						color: colorA,
						fontSize: 12,
						fontName: 'Roboto Condensed',
					},
					stem: { color: colorA },
				},
				pointShape: 'circle',
			},
			1: {
				targetAxisIndex: 0,
				type: 'bars',
				color: colorB,
				lineWidth: 4,
				pointSize: 7,
				dataLabel: 'value',
				dataLabelPlacement: 'below',
				annotations: {
					textStyle: {
						color: colorB,
						fontSize: 12,
						fontName: 'Roboto Condensed',
					},
					stem: { color: colorB },
				},
			},
		})
		.setOption('vAxes', {
			0: {
				textStyle: { color: colorB, fontSize: 10 },
				gridlines: { color: colorB },
				baselineColor: colorB,
			},
			1: {
				textStyle: { color: colorBg, fontSize: 1 },
				gridlines: { color: colorB },
				baselineColor: colorB,
			},
		})
		// .setOption('legend', { position: 'none' })
		.build();

	sheet.updateChart(chart);

	// console.log(getChartInfo(chart));
	// console.log('charts', charts);
	// console.log('info', getChartInfo(charts));
};
export { test };
