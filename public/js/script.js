var handleFetchResult = function(result) {
    if (!result.ok) {
      return result.json().then(function(json) {
        if (json.error && json.error.message) {
          throw new Error(result.url + ' ' + result.status + ' ' + json.error.message);
        }
      }).catch(function(err) {
        showErrorMessage(err);
        throw err;
      });
    }
    return result.json();
  };


// Create a Checkout Session with the selected plan ID
var createCheckoutSession = function(priceId) {
    return fetch("/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        priceId: priceId
      })
    }).then(handleFetchResult);
  };

  fetch("/setup")
  .then(handleFetchResult)
  .then(function(json) {
    var publishableKey = json.publishableKey;
    var basicPriceId = json.basicPrice;
    var proPriceId = json.proPrice;

    var stripe = Stripe(publishableKey);
    // Setup event handler to create a Checkout Session when button is clicked
    document
      .getElementById("basic-plan-btn")
      .addEventListener("click", function(evt) {
        createCheckoutSession(basicPriceId).then(function(data) {
          // Call Stripe.js method to redirect to the new Checkout page
          stripe
            .redirectToCheckout({
              sessionId: data.sessionId
            })
            .then(handleResult);
        });
      });

    // Setup event handler to create a Checkout Session when button is clicked
    document
      .getElementById("pro-plan-btn")
      .addEventListener("click", function(evt) {
        createCheckoutSession(proPriceId).then(function(data) {
          // Call Stripe.js method to redirect to the new Checkout page
          stripe
            .redirectToCheckout({
              sessionId: data.sessionId
            })
            .then(handleResult);
        });
      });
  });

// Theme Switcher Logic
document.addEventListener('DOMContentLoaded', () => {
    const themeSwitcherBtn = document.getElementById('theme-switcher-btn');
    const body = document.body;
    const themeKey = 'themePreference';

    // 1. Apply saved theme on page load
    const savedTheme = localStorage.getItem(themeKey);
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    } else if (savedTheme === 'light') {
        body.classList.remove('dark-mode');
    }
    // If savedTheme is null, the CSS @media (prefers-color-scheme: dark) will take effect.

    // 2. Add event listener to the button
    if (themeSwitcherBtn) {
        themeSwitcherBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');

            // 3. Save current theme preference
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem(themeKey, 'dark');
            } else {
                localStorage.setItem(themeKey, 'light');
            }
        });
    }
});
