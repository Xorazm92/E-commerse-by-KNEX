// API endpoints
const API_BASE_URL = '/api/v1';

// Login function
async function login(email, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        
        if (data.success) {
            // Store token in localStorage
            localStorage.setItem('token', data.token);
            // Redirect to home page
            window.location.href = '/';
        } else {
            showError(data.message);
        }
    } catch (error) {
        console.error('Login error:', error);
        showError('An error occurred during login');
    }
}

// Register function
async function register(name, email, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });
        const data = await response.json();
        
        if (data.success) {
            // Show success message and switch to login form
            showSuccess('Registration successful! Please login.');
            switchToLogin();
        } else {
            showError(data.message);
        }
    } catch (error) {
        console.error('Registration error:', error);
        showError('An error occurred during registration');
    }
}

// UI Helper functions
function showError(message) {
    const errorDiv = document.querySelector('.error-message');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

function showSuccess(message) {
    const successDiv = document.querySelector('.success-message');
    successDiv.textContent = message;
    successDiv.style.display = 'block';
}

function switchToLogin() {
    document.querySelector('#registerForm').style.display = 'none';
    document.querySelector('#loginForm').style.display = 'block';
}

function switchToRegister() {
    document.querySelector('#loginForm').style.display = 'none';
    document.querySelector('#registerForm').style.display = 'block';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Login form submission
    document.querySelector('#loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.querySelector('#loginEmail').value;
        const password = document.querySelector('#loginPassword').value;
        login(email, password);
    });

    // Register form submission
    document.querySelector('#registerForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.querySelector('#registerName').value;
        const email = document.querySelector('#registerEmail').value;
        const password = document.querySelector('#registerPassword').value;
        register(name, email, password);
    });

    // Switch form links
    document.querySelector('.switch-to-register').addEventListener('click', (e) => {
        e.preventDefault();
        switchToRegister();
    });

    document.querySelector('.switch-to-login').addEventListener('click', (e) => {
        e.preventDefault();
        switchToLogin();
    });
});
