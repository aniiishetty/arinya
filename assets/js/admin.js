document.addEventListener('DOMContentLoaded', () => {
    const errorDisplayers = document.getElementsByClassName('error'),
          inputFields = document.querySelectorAll('input, textarea');

    let validFields = {
        'product-name': false,
        'product-description': false,
        'product-price': false,
        'product-stock': false
        // Add more fields if needed
    };

    function onValidation(inputId, current, messageString, isValid) {
        current.textContent = messageString;
        validFields[inputId] = isValid;
    }

    inputFields.forEach((input, index) => {
        let inputId = input.id;
        input.addEventListener('keyup', (e) => {
            let currentErrorDisplayer = errorDisplayers[index];
            e.target.value ? onValidation(inputId, currentErrorDisplayer, '', true) : onValidation(inputId, currentErrorDisplayer, '*This field is Required', false);
        });
    });

    // Form submission event listener
    document.getElementById('addProductForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        let isFormValid = Object.values(validFields).every(isValid => isValid);

        if (isFormValid) {
            const product = {
                name: document.getElementById('product-name').value,
                description: document.getElementById('product-description').value,
                price: document.getElementById('product-price').value,
                stock: document.getElementById('product-stock').value
                // Add more fields if needed
            };

            try {
                const response = await fetch('http://localhost:5000/add-product', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(product),
                });

                const data = await response.json();
                if (response.ok) {
                    alert(data.message);
                    // Optionally redirect or update UI
                } else {
                    alert(data.error);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            alert('Please fill out all required fields.');
        }
    });
});
