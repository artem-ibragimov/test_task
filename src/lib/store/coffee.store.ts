import { createUID, createUserActivity } from '$lib/utils';
import { writable, type Readable, derived, get } from 'svelte/store';

type CardID = string;
type ImgSrc = string;
const MS = 1000;

export const createCoffeStore = (api: {
	getRandomCoffee(): Promise<ICoffeeData>;
	getCoffeePicture(): Promise<ImgSrc>;
}) => {
	const cards = writable<Record<CardID, ICoffeeCard>>({});
	const userActivity = createUserActivity(30 * MS);
	let isLoading = writable<boolean>(false);

	function setCard(id: CardID, data: ICoffeeData) {
		cards.update((prev) => {
			prev[id] = { ...prev[id], ...data };
			return prev;
		});
	}

	function setImgSrc(uid: CardID, imgSrc: ImgSrc) {
		cards.update((prev) => {
			prev[uid] = prev[uid] || {};
			prev[uid].imgSrc = imgSrc;
			return prev;
		});
	}

	function setError(id: CardID, error: Error) {
		console.error(error);
		cards.update((prev) => {
			prev[id] = { ...prev[id], error };
			return prev;
		});
	}

	const loadCard = (id: CardID) => api.getRandomCoffee().then((data) => setCard(id, data));
	const loadImg = (id: CardID) => api.getCoffeePicture().then((imgSrc) => setImgSrc(id, imgSrc));
	const load = () => {
		if (get(isLoading)) {
			return;
		}
		isLoading.set(true);
		const id: CardID = createUID();
		Promise.all([
			loadCard(id).catch((e) => {
				setError(id, e);
			}),
			loadImg(id).catch((e) => {
				setError(id, e);
			})
		]).then(() => {
			isLoading.set(false);
		});
	};

	userActivity.isInactive.subscribe((isInactive) => {
		if (!isInactive) {
			return;
		}
		userActivity.reset();
		load();
	});

	return {
		cards: derived(cards, ($cards) => Object.values($cards).filter((v) => !!v.id || !!v.error)),
		isLoading: isLoading as Readable<boolean>,
		init() {
			load();
		},
		onLoadMoreClick() {
			userActivity.reset();
			load();
		}
	};
};

interface ICoffeeData {
	id: number;
	uid: CardID;
	blend_name: string;
	origin: string;
	variety: string;
	notes: string;
	intensifier: string;
}

interface ICoffeeCard extends Partial<ICoffeeData> {
	imgSrc?: ImgSrc;
	error?: Error;
}
