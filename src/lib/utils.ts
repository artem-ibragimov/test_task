import { writable, type Readable } from 'svelte/store';

export function createUserActivity(timeout: number) {
	const isUserInactive = writable<boolean>(true);
	let timerId: number;
	const reset = () => {
		isUserInactive.set(false);
		clearTimeout(timerId);
		timerId = setTimeout(() => {
			isUserInactive.set(true);
		}, timeout);
	};
	reset();
	return {
		isInactive: isUserInactive as Readable<boolean>,
		reset
	};
}

export const createUID = () =>
	Math.random()
		.toString()
		.slice(1)
		.split('')
		.map((v) => String.fromCharCode(Number(v) + `a`.charCodeAt(0)))
		.join('');
