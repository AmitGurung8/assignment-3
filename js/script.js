// Wait for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Display student information dynamically
    const studentInfo = document.getElementById('student-info');

    // Handle form submission
    const orderBtn = document.getElementById('order-btn');
    orderBtn.addEventListener('click', () => {
        // Retrieve form values 
        studentInfo.textContent = 'Student ID: 1232183 | Name: Amit Gurung';
        const size = document.getElementById('size').value;
        const crust = document.getElementById('crust').value;
        const toppings = getSelectedToppings();
        const sauces = getSelectedSauces();
        const cheese = getSelectedCheese();
        const delivery = document.getElementById('delivery').checked;

        // Validate form fields
        if (size.trim() === '') {
            alert('Please select a size.');
            return;
        }

        if (crust.trim() === '') {
            alert('Please select a crust type.');
            return;
        }

        if (toppings.length === 0) {
            alert('Please select at least one topping.');
            return;
        }

        if (sauces.length === 0) {
            alert('Please select at least one sauce.');
            return;
        }

        if (cheese.length === 0) {
            alert('Please select at least one cheese type.');
            return;
        }

        // Create a Pizza object with the submitted details
        const pizza = new Pizza(size, crust, toppings, sauces, cheese, delivery);
        displayPizza(pizza); // Display the details of the ordered pizza
        startDeliveryCountdown(); // Start delivery countdown if delivery option is selected
    });
});

// Pizza class definition
class Pizza {
    constructor(size, crust, toppings, sauces, cheese, delivery) {
        this.size = size; // Assigning the size of the pizza
        this.crust = crust; // Assigning the crust type of the pizza
        this.toppings = toppings; // Assigning the toppings of the pizza
        this.sauces = sauces; // Assigning the sauces of the pizza
        this.cheese = cheese; // Assigning the cheese of the pizza
        this.delivery = delivery; // Assigning the delivery option of the pizza
    }

    // Method to get the description of the pizza
    getDescription() {
        return `Size: ${this.size}, Crust: ${this.crust}, Toppings: ${this.toppings.join(', ')}, 
        Sauces: ${this.sauces.join(', ')}, Cheese: ${this.cheese.join(', ')}, Delivery: ${this.delivery ? 'Yes' : 'No'}`;
    }
}

// Function to get the selected toppings
function getSelectedToppings() {
    const checkboxes = document.querySelectorAll('input[name="topping"]:checked');
    return Array.from(checkboxes).map(checkbox => checkbox.value);
}

// Function to get the selected sauces
function getSelectedSauces() {
    const checkboxes = document.querySelectorAll('input[name="sauce"]:checked');
    return Array.from(checkboxes).map(checkbox => checkbox.value);
}

// Function to get the selected cheese
function getSelectedCheese() {
    const checkboxes = document.querySelectorAll('input[name="cheese"]:checked');
    return Array.from(checkboxes).map(checkbox => checkbox.value);
}

// Function to display the pizza details
function displayPizza(pizza) {
    const pizzaInfo = document.getElementById('pizza-info'); // Get the pizza info display element
    pizzaInfo.innerHTML = `<p>${pizza.getDescription()}</p>`; // Display the description of the ordered pizza
}

// Function to start the delivery countdown
function startDeliveryCountdown() {
    const deliveryCheckbox = document.getElementById('delivery'); // Get the delivery checkbox
    const deliveryTime = getRandomDeliveryTime(); // Get random delivery time between 5 to 10 minutes
    const deliveryInfo = document.getElementById('delivery-info'); // Get the delivery info display element
    const countdownDisplay = document.getElementById('countdown'); // Get the countdown display element

    if (deliveryCheckbox.checked) { // Check if delivery option is checked
        deliveryInfo.textContent = `Your pizza will be delivered in approximately ${deliveryTime} minutes.`; // Display delivery time info
        let countdown = deliveryTime * 60; // Convert minutes to seconds for countdown

        const timer = setInterval(() => { // Start countdown timer
            const minutes = Math.floor(countdown / 60);
            const seconds = countdown % 60;

            countdownDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // Display countdown timer

            if (countdown === 0) {
                clearInterval(timer); // Stop the timer when countdown reaches 0
                deliveryInfo.textContent = 'Your pizza is now delivered! Enjoy your meal.'; // Update delivery info message
            } else {
                countdown--; // Decrement countdown
            }
        }, 1000); // Update every second
    } else {
        deliveryInfo.textContent = ''; // Clear delivery info if delivery option is not checked
        countdownDisplay.textContent = ''; // Clear countdown display
    }
}

// Function to get a random delivery time between 5 to 10 minutes
function getRandomDeliveryTime() {
    return Math.floor(Math.random() * (10 - 5 + 1)) + 5; // Random integer between 5 and 10
}
