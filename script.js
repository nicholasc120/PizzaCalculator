const pizzaData = [];

function addRow() {
    const price = document.getElementById('price').value;
    const diameter = document.getElementById('diameter').value;

    if (price === "" || diameter === "") {
        alert("Please enter both price and diameter.");
        return;
    }

    pizzaData.push({
        price: parseFloat(price),
        diameter: parseFloat(diameter)
    });

    pizzaData.sort((a, b) => a.price - b.price);

    renderTable();

    document.getElementById('price').value = '';
    document.getElementById('diameter').value = '';
}

function renderTable() {
    const pizzaList = document.getElementById('pizzaList');

    pizzaList.innerHTML = '';

    pizzaData.forEach(item => {
        const newRow = document.createElement('tr');

        const priceCell = document.createElement('td');
        const diameterCell = document.createElement('td');

        priceCell.textContent = `$${item.price.toFixed(2)}`;
        diameterCell.textContent = `${item.diameter.toFixed(1)} in`;

        newRow.appendChild(priceCell);
        newRow.appendChild(diameterCell);

        pizzaList.appendChild(newRow);
    });
}

function calculate() {
    const outputDiv = document.getElementById('output');

    outputDiv.innerHTML = '';

    if (pizzaData.length === 0) {
        outputDiv.textContent = 'No data available.';
        return;
    }

    const largestPizza = pizzaData.reduce((prev, current) => (current.price > prev.price) ? current : prev);

    const largestArea = Math.PI * Math.pow(largestPizza.diameter / 2, 2)

    pizzaData.forEach((item) => {
        const currentArea = Math.PI * Math.pow(item.diameter / 2, 2);

        const minimumAmountOfPizzas = Math.floor(largestArea / currentArea) + 1;
        const cheaper = (minimumAmountOfPizzas * item.price) < largestPizza.price || (item.diameter == largestPizza.diameter && item.price < largestPizza.price);

        let lineText = `You need to buy ${minimumAmountOfPizzas} of the $${item.price} ${item.diameter} inch pizzas to get more pizza than a $${largestPizza.price} ${largestPizza.diameter} inch pizza. `;

        const lineSpan = document.createElement('span');

        if (!cheaper) {
            lineText += 'This option is not cheaper.\n';
            lineSpan.classList.add('red-text');
        } else {
            lineText += 'This option is cheaper.\n';
        }

        lineSpan.textContent = lineText;
        outputDiv.appendChild(lineSpan);
    });
}