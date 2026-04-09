const API_BASE = '/api';

// mode can be 'login' or 'signup'
function switchMode(role, mode) {
    document.querySelectorAll('.form-section').forEach(form => {
        if(form.id === `${role}-${mode}-form`) {
            form.style.display = 'block';
            setTimeout(() => form.classList.add('active'), 10);
        } else {
            form.classList.remove('active');
            setTimeout(() => {
                if(!form.classList.contains('active')) {
                    form.style.display = 'none';
                }
            }, 400);
        }
    });
}

function switchRole(role) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`tab-${role}`).classList.add('active');
    
    // Default to login mode when switching role tabs
    switchMode(role, 'login');
}

async function loginStudent() {
    const roll = document.getElementById('student-roll-login').value;
    const pass = document.getElementById('student-pass-login').value;
    
    if(!roll || !pass) return Swal.fire('Error', 'Please fill all fields', 'error');

    try {
        const res = await fetch(`${API_BASE}/student/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({roll_number: roll, password: pass})
        });
        const data = await res.json();
        if(res.ok) {
            localStorage.setItem('student_roll', data.roll_number);
            localStorage.setItem('student_class', data.student_class);
            window.location.href = 'student.html';
        } else {
            Swal.fire('Error', data.detail || 'Login failed', 'error');
        }
    } catch(e) {
        Swal.fire('Error', 'Could not connect to server', 'error');
    }
}

async function signupStudent() {
    const name = document.getElementById('student-name-signup').value;
    const roll = document.getElementById('student-roll-signup').value;
    const pass = document.getElementById('student-pass-signup').value;
    
    if(!name || !roll || !pass) return Swal.fire('Error', 'Please fill all fields to sign up', 'error');

    try {
        // Backend technically only uses roll_number and password, but we pass it anyway
        const res = await fetch(`${API_BASE}/student/signup`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({roll_number: roll, password: pass})
        });
        const data = await res.json();
        if(res.ok) {
            Swal.fire('Success', 'Signup complete! You can now login.', 'success').then(() => {
                switchMode('student', 'login');
            });
        } else {
            Swal.fire('Error', data.detail || 'Signup failed', 'error');
        }
    } catch(e) {
        Swal.fire('Error', 'Could not connect to server', 'error');
    }
}

async function loginFaculty() {
    const user = document.getElementById('faculty-user-login').value;
    const pass = document.getElementById('faculty-pass-login').value;

    if(!user || !pass) return Swal.fire('Error', 'Please fill all fields', 'error');

    try {
        const res = await fetch(`${API_BASE}/faculty/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: user, password: pass})
        });
        const data = await res.json();
        if(res.ok) {
            localStorage.setItem('faculty_user', data.username);
            window.location.href = 'faculty.html';
        } else {
            Swal.fire('Error', data.detail || 'Login failed', 'error');
        }
    } catch(e) {
        Swal.fire('Error', 'Could not connect to server', 'error');
    }
}

async function signupFaculty() {
    const name = document.getElementById('faculty-name-signup').value;
    const user = document.getElementById('faculty-user-signup').value;
    const pass = document.getElementById('faculty-pass-signup').value;

    if(!name || !user || !pass) return Swal.fire('Error', 'Please fill all fields to sign up', 'error');

    try {
        const res = await fetch(`${API_BASE}/faculty/signup`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: user, password: pass})
        });
        const data = await res.json();
        if(res.ok) {
            Swal.fire('Success', 'Faculty Signup complete! You can now login.', 'success').then(() => {
                switchMode('faculty', 'login');
            });
        } else {
            Swal.fire('Error', data.detail || 'Signup failed', 'error');
        }
    } catch(e) {
        Swal.fire('Error', 'Could not connect to server', 'error');
    }
}
