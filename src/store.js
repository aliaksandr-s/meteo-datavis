import { writable } from 'svelte/store';

function createPopUpState() {
	const { subscribe, set, update } = writable(false);

	return {
		subscribe,
		show: () => update(() => true),
		hide: () => update(() => false),
	};
}

function createChartState() {
	const { subscribe, set, update } = writable({
		loaded: false,
	});

	return {
		subscribe,
		setData: data => update(() => data),
		reset: () => set({}),
	};
}

function createControlsState() {
	const { subscribe, set, update } = writable({
		dateFrom: '2018-12-04',
		dateTo: '2018-12-06',
	});

	return {
		subscribe,
		setDateFrom: date => update(state => (state.dateFrom = date)),
		setDateTo: date => update(state => (state.dateTo = date)),
    reset: () => set({}),
	};
}

export const popUpState = createPopUpState();
export const chartState = createChartState();
export const controlsState = createControlsState();
