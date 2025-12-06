// Simulate user storage (in production, use Firebase, Supabase, etc.)
let users = [];

// Sign Up
document.getElementById('signupForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const errorDiv = document.getElementById('signupError');
    errorDiv.textContent = '';

    if (users.some(user => user.email === email)) {
        errorDiv.textContent = 'Email already exists!';
        return;
    }

    users.push({ name, email, password });
    alert('Sign up successful! You can now log in.');
    window.location.href = 'index.html';
});

// Login
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const errorDiv = document.getElementById('loginError');
    errorDiv.textContent = '';

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        localStorage.setItem('currentUser', user.name);
        window.location.href = 'dashboard.html';
    } else {
        errorDiv.textContent = 'Invalid email or password!';
    }
});

// Dashboard
document.getElementById('username')?.textContent = localStorage.getItem('currentUser');
