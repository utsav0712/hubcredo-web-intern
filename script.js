const auth = firebase.auth();

// SIGNUP PAGE
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const errorDiv = document.getElementById('signupError');
    errorDiv.textContent = '';

    if (!name || !email || password.length < 6) {
      errorDiv.textContent = 'Please fill all fields. Password must be at least 6 characters.';
      return;
    }

    try {
      const cred = await auth.createUserWithEmailAndPassword(email, password);
      await cred.user.updateProfile({ displayName: name });
      alert('Signup successful! Please login.');
      window.location.href = 'index.html';
    } catch (err) {
      errorDiv.textContent = err.message;
    }
  });
}

// LOGIN PAGE
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const errorDiv = document.getElementById('loginError');
    errorDiv.textContent = '';

    if (!email || !password) {
      errorDiv.textContent = 'Please enter email and password.';
      return;
    }

    try {
      await auth.signInWithEmailAndPassword(email, password);
      window.location.href = 'dashboard.html';
    } catch (err) {
      errorDiv.textContent = err.message;
    }
  });
}

// DASHBOARD PAGE
const usernameSpan = document.getElementById('username');
if (usernameSpan) {
  auth.onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = 'index.html';
    } else {
      usernameSpan.textContent = user.displayName || user.email;
    }
  });
}
