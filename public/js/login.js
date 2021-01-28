$(document).ready(function() {
  // Getting references to our form and inputs
  var loginForm = $("form.login");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  // JavaScript for disabling form submissions if there are invalid fields - validation
  (function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {

      return;
    }

    $('.login').addClass('animate__animated, animate__zoomOut');
    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(function() {
        window.location.replace("/dashboard");
        // If there's an error, log the error
      })
      .catch(function(err) {
        console.log(err);
      });
  }
  // Add animations and redirect on buttons click
  $('#go-shoppin').on('click', () => {
    $('.intro').addClass('animate__animated, animate__zoomOut');
    window.location.href="/login.html";
  });
  $('#howitworks').on('click', () => {
    $('.intro').addClass('animate__animated, animate__zoomOut');
    window.location.href="/howitworks.html";
  });
  $('#howitworks').on('click', () => {
    $('.intro').addClass('animate__animated, animate__zoomOut');
    window.location.href="/howitworks.html";
  });
});
