// Arrow Functions Explained
// ----------------------------------------
// Step 1: Traditional Function vs Arrow Function
// Traditional way:
// function add(a, b) {
//     return a + b;
// }

// Arrow function way:
// const add = (a, b) => a + b;

// Step 2: Arrow Function Examples
// Example 1: Single parameter (parentheses optional)
// Traditional:
// function double(x) {
//     return x * 2;
// }
// Arrow way:
// const double = x => x * 2;

// Example 2: No parameters (must use empty parentheses)
// Traditional:
// function sayHello() {
//     return "Hello!";
// }
// Arrow way:
// const sayHello = () => "Hello!";

// Example 3: Multiple lines need curly braces and return
// const multiply = (a, b) => {
//     let result = a * b;
//     return result;
// }

// Ternary Operators Explained
// ----------------------------------------
// Step 1: Basic Structure
// instead of:
// if (condition) {
//     return valueIfTrue;
// } else {
//     return valueIfFalse;
// }
// use:
// condition ? valueIfTrue : valueIfFalse

// Step 2: Simple Examples
// Example 1: Age Check
// const message = age >= 18 ? "Can vote" : "Cannot vote";

// Example 2: Price Display
// const price = isPremium ? "$10" : "$20";

// Example 3: Nested Ternary
// const greeting = hour < 12 ? "Good Morning" 
//                : hour < 18 ? "Good Afternoon" 
//                : "Good Evening";



/// Email Validation Regular Expression
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

// ===============================
// EMAILJS INIT (public key only)
// ===============================
window.addEventListener("load", function () {
    if (typeof emailjs !== "undefined") {
        emailjs.init("dL79Hk-8fgV_u0XY6");
        console.log("EmailJS initialized with public key");
    } else {
        console.error("EmailJS library not loaded");
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        scrollToSection(this.getAttribute('href').substring(1));
    });
});

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({ top: section.offsetTop - 80, behavior: 'smooth' });
        if (sectionId === 'Contact') {
            setTimeout(() => document.getElementById('name').focus(), 1000);
        }
    }
}

// Validation
function validateName(name) { return name.length >= 2; }
function validateEmail(email) { return emailRegex.test(email); }
function validateMessage(message) { return message.length >= 10; }

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId + 'Error');
    errorElement.textContent = message;
    errorElement.style.opacity = '1';
}
function clearError(elementId) {
    const errorElement = document.getElementById(elementId + 'Error');
    errorElement.textContent = '';
    errorElement.style.opacity = '0';
}

// Dialog helper
function showDialog(title, message, isError = false) {
    const dialog = document.createElement('dialog');
    dialog.innerHTML = `
        <div class="dialog-content">
            <button class="dialog-close-btn">×</button>
            <h3>${title}</h3>
            <p>${message}</p>
        </div>
    `;
    document.body.appendChild(dialog);
    dialog.showModal();
    dialog.querySelector('.dialog-close-btn').onclick = () => {
        dialog.close();
        dialog.remove();
    };
    dialog.onclick = (e) => {
        const rect = dialog.getBoundingClientRect();
        if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
            dialog.close();
            dialog.remove();
        }
    };
}

// Handle form submission
async function handleSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    let isValid = true;
    if (!validateName(name)) { showError('name', 'Name must be at least 2 characters'); isValid = false; }
    else clearError('name');
    if (!validateEmail(email)) { showError('email', 'Please enter a valid email address'); isValid = false; }
    else clearError('email');
    if (!validateMessage(message)) { showError('message', 'Message must be at least 10 characters'); isValid = false; }
    else clearError('message');
    if (!isValid) return;

    if (typeof emailjs === "undefined") {
        showDialog('Error', 'Email service not available. Try again later.', true);
        return;
    }

    const btn = document.querySelector('#contactForm button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
        await emailjs.send(
            "service_jwcxy2c",
            "template_xye59o2",
            {
                from_name: name,
                from_email: email,
                message: message
            }
        );
        showDialog('Thank You!', 'Your message has been received. We\'ll get back to you soon.');
        document.getElementById('contactForm').reset();
    } catch (error) {
        console.error(error);
        let errorMsg = "Email failed. " + (error.text || error.message || "Check console.");
        showDialog('Error', errorMsg, true);
    } finally {
        btn.textContent = originalText;
        btn.disabled = false;
    }
}

// Real-time validation
document.getElementById('name').addEventListener('input', function() {
    if (this.value.trim()) {
        validateName(this.value.trim()) ? clearError('name') : showError('name', 'Name must be at least 2 characters');
    }
});
document.getElementById('email').addEventListener('input', function() {
    if (this.value.trim()) {
        validateEmail(this.value.trim()) ? clearError('email') : showError('email', 'Please enter a valid email address');
    }
});
document.getElementById('message').addEventListener('input', function() {
    if (this.value.trim()) {
        validateMessage(this.value.trim()) ? clearError('message') : showError('message', 'Message must be at least 10 characters');
    }
});

// Mobile menu
document.querySelector('.hamburger-menu').addEventListener('click', () => {
    const navItems = document.querySelector('.navigation-items');
    navItems.style.display = navItems.style.display === 'flex' ? 'none' : 'flex';
});

// ========== THEME TOGGLE (same moon icon for both modes) ==========
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        // Icon stays as <i class="fas fa-moon"></i> – no change
    });
}
