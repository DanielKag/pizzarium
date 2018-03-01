export class Order {
    selectedPizza: ImageSelectorItem;
    selectedToppings: ImageSelectorItem[];

    getTotalPrice(): number {
        let total: number = this.selectedPizza.price;
        
        for (let i = 0; i < this.selectedToppings.length; i++) {
            total += this.selectedToppings[i].price;
        }

        return total;
    }
}

export interface ImageSelectorItem {
  value: string;
  img: string;
  price: number;
}