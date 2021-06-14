document.getElementById('basic-plan-btn').addEventListener("click", function(evt) {
    // You'll have to define PRICE_ID as a price ID before this code block
    createCheckoutSession(PRICE_ID).then(function(data) {
      // Call Stripe.js method to redirect to the new Checkout page
      stripe
        .redirectToCheckout({
          sessionId: data.sessionId
        })
        .then(handleResult);
    });
  });