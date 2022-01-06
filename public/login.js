const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const email = $('#email-login').val().trim();
    const password = $('#password-login').val().trim();
  
    if (email && password) {
      // Send a POST request to the API endpoint
      $.ajax({
        url: '/api/users/login', 
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
        success: function() {
            // If successful, redirect the browser to the profile page
            document.location.replace('/profile');
        },
        error: function() {
            alert(response.statusText);
        }
      });
    }
}
  
const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = $('#name-signup').val().trim();
    const email = $('#email-signup').val().trim();
    const password = $('#password-signup').val().trim();
  
    if (name && email && password) {
      $.ajax({
        url: '/api/users',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({ name, email, password }),
        success: function() {
            document.location.replace('/profile');
        },
        error: function() {
            alert(response.statusText);
        }
      });
    }
}
  
$('.login-form').on('submit', loginFormHandler);
  
$('.signup-form').on('submit', signupFormHandler);