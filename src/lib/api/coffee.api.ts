export const createCoffeeApi = () => {
	return {
		getRandomCoffee: () =>
			fetch('https://random-data-api.com/api/coffee/random_coffee').then<ICoffeeResponse>((r) =>
				r.json()
			),
		getCoffeePicture: () =>
			fetch('https://loremflickr.com/500/500/coffee_bean', { redirect: 'follow' })
				.then((res) => res.blob())
				.then((blob) => window.URL.createObjectURL(blob))
	};
};

interface ICoffeeResponse {
	id: number;
	uid: string;
	blend_name: string;
	origin: string;
	variety: string;
	notes: string;
	intensifier: string;
}
