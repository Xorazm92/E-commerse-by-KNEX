// Initialize Stripe
const stripe = Stripe('your_publishable_key'); // Replace with your Stripe publishable key
const elements = stripe.elements();

// Create card element
const card = elements.create('card');
card.mount('#card-element');

// Handle form submission
const form = document.getElementById('payment-form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const { token, error } = await stripe.createToken(card);

    if (error) {
        // Handle error
        const errorElement = document.getElementById('card-errors');
        errorElement.textContent = error.message;
    } else {
        // Send token to server
        const response = await fetch('/api/v1/payment/process', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                token: token.id,
                amount: document.getElementById('amount').value
            })
        });

        const result = await response.json();
        if (result.success) {
            // Payment successful
            window.location.href = '/payment-success.html';
        } else {
            // Handle payment error
            const errorElement = document.getElementById('card-errors');
            errorElement.textContent = result.message;
        }
    }
});
