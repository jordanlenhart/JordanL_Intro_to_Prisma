const dataContainer = document.getElementById('data-container');

async function fetchAndDisplayData() {
    try {
        // Show loading state
        dataContainer.textContent = 'Loading data...';

        // Fetch data from your Express API
        const response = await fetch('http://localhost:5555/api/data');

        if (!response.ok) {
            console.log(`response not okay`)
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        console.log(data)

        // Display the data
        if (data.length === 0) {
            dataContainer.textContent = 'No data found';
            return;
        }

// Create HTML for the data
        const html = `
            ${data.map(client => `
                <div class="client-card">
                    <h2>${client.name}</h2>
                    <p><strong>ID:</strong> ${client.id}</p>
                    <p><strong>Email:</strong> ${client.email}</p>

                    <table>
                        <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Products</th>
                        </tr>
                        </thead>
                        <tbody>
                        ${client.orders.map(order => `
                            <tr>
                            <td>${order.id}</td>
                            <td>${new Date(order.date).toLocaleDateString()}</td>
                            <td>
                                <ul class="product-list">
                                ${order.products.map(product => `
                                    <li>${product.name} ($${product.price})</li>
                                `).join('')}
                                </ul>
                            </td>
                            </tr>
                        `).join('')}
                        </tbody>
                    </table>
                    </div>
                </body>
            `).join('')}
        `;

       dataContainer.innerHTML = html;
    } catch (error) {
console.error('Error:', error);
 	dataContainer.textContent = 'Failed to load data. Check console for details.';
    }
}

// Fetch and display data when the page loads
document.addEventListener('DOMContentLoaded', fetchAndDisplayData);
