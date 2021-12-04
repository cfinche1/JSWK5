class Item {
    constructor(name) {
        this.name = name;
    }
}

class Meal {
    constructor(name, numberOfItems) {
        this.name = name;
        this.numberOfItems = numberOfItems;
        this.items = [];
    }

    addItem(item) {
        if (item instanceof Item) {
            this.items.push(item);
        } else {
            throw new Error('You can only add instance of Item.');
        }
    }

    describe() {
        return `${this.name} has ${this.items.length} items.`;
    }
}

class Menu {
    constructor() {
        this.meals = [];
        this.selectedMeals = null;
    }

    start() {
        let selection = this.showMainMenuOptions();

        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createMeal();
                    break;
                case '2':
                    this.viewMeal();
                    break;
                case '3':
                    this.deleteMeal();
                    break;
                case '4':
                    this.displayMeals();
                    break;
                default:
                    selection = 0;
            }

            selection = this.showMainMenuOptions();

        }

        alert('Complete!');

    }
    showMainMenuOptions() {
        return prompt(`
        0) exit
        1) create new meal
        2) view meal
        3) delete meal
        4) display all meals
        `);
    }

    showItemMenuOptions(mealInfo) {
        return prompt(`
        0) back
        1) create item
        2) delete item
        ---------------
        ${mealInfo}
        `);
    }

    displayMeals() {
        let mealString = '';
        for (let i = 0; i < this.meals.length; i++) {
            mealString += i + ') ' + this.meals[i].name + '\n';
        }

        alert(mealString);
    }

    createMeal() {
        let name = prompt('Enter name of new meal:');
        let numberOfItems = prompt('Enter the amount of items within this meal:')
        this.meals.push(new Meal(name, numberOfItems));
    }

    viewMeal() {
        let index = prompt('Enter the number associated with the meal you want to see:');
        if (index > -1 && index < this.meals.length) {
            this.selectedMeals = this.meals[index];
            let description = 'Meal name: ' + this.selectedMeals.name + '\n';

            for (let i = 0; i < this.selectedMeals.items.length; i++) {
                description += i + ') ' + this.selectedMeals.items[i].name + '\n';
            }

            let selection = this.showItemMenuOptions(description);
            switch(selection) {
                case '1':
                    this.createItem();
                    break;
                case '2':
                    this.deleteItem();
            }
        }
    }

    deleteMeal() {
        let index = prompt('Enter the number associated with the meal you want to delete:');
        if (index > -1 && index < this.meals.length) {
            this.meals.splice(index, 1);
        }
    }

    createItem() {
        let name = prompt('Enter the name of the new item:');
        this.selectedMeals.items.push(new Item(name));
    }

    deleteItem() {
        let index = prompt('Enter the number associated with the item you want to delete:');
        if (index > -1 && index < this.selectedMeals.items.length) {
            this.selectedMeals.items.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();