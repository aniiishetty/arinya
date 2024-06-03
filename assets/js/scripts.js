document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.querySelector('.submit-btn'),
          phone = document.querySelector('#phone'),
          password = document.querySelector('#user-password'),
          passwordConfirm = document.querySelector('#user-password-confirm'),
          email = document.querySelector('#mail'),
          errorDisplayers = document.getElementsByClassName('error'),
          inputFields = document.querySelectorAll('input'),
          cardContainer = document.querySelector('.card-container'),
          outroOverlay = document.querySelector('.outro-overlay');

    let validFields = {
        'f-name': false,
        'l-name': false,
        'mail': false,
        'phone': false,
        'user-password': false,
        'user-password-confirm': false
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

    phone.addEventListener('keyup', (e) => {
        let message = errorDisplayers[3];
        /^\d+$/.test(e.target.value) ? onValidation(phone.id, message, '', true) : onValidation(phone.id, message, '*Please enter valid number', false);
    });

    email.addEventListener('keyup', (e) => {
        let message = errorDisplayers[2];
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value) ? onValidation(email.id, message, '', true) : onValidation(email.id, message, '*Please provide a valid Email', false);
    });

    password.addEventListener('keyup', (e) => {
        let message = errorDisplayers[4];
        e.target.value.length >= 8 ? onValidation(password.id, message, '', true) : onValidation(password.id, message, 'Password requires minimum 8 characters', false);
    });

    passwordConfirm.addEventListener('keyup', (e) => {
        let message = errorDisplayers[5];
        e.target.value === password.value ? onValidation(passwordConfirm.id, message, '', true) : onValidation(passwordConfirm.id, message, '*Passwords do not match', false);
    });

    document.getElementById('signupForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        let isFormValid = Object.values(validFields).every(isValid => isValid);

        inputFields.forEach((input, index) => {
            if (!input.value) {
                errorDisplayers[index].textContent = '*This field is Required';
            }
        });

        if (isFormValid) {
            const user = {
                firstName: document.getElementById('f-name').value,
                lastName: document.getElementById('l-name').value,
                email: document.getElementById('mail').value,
                phone: document.getElementById('phone').value,
                password: document.getElementById('user-password').value,
            };

            try {
                const response = await fetch('http://localhost:5000/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user),
                });

                const data = await response.json();
                if (response.ok) {
                    cardContainer.style.display = 'none';
                    outroOverlay.classList.remove('disabled');
                    alert(data.message);
                } else {
                    alert(data.error);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    });
});
