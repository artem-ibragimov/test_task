import { createCoffeStore } from '$lib/store/coffee.store';
import { createCoffeeApi } from '$lib/api/coffee.api';

export const coffeeStore = createCoffeStore(createCoffeeApi());
