var stripeHandler = StripeCheckout.configure({
  key: stripePublishableKey,
  locale: 'en',
  token: function(token) {
    // console.log(token)
    var quantity = 1;
    var id = document.querySelector('[data-price-id]');

  }

});

fetch('/charge', {
  method: 'POST',
  header: {
    'Content-type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify({
    stripeTokenid: token.id,
    itemId: id,
    qty: quantity

  })

});


function purchaseClicked(){
  // eslint-disable-next-line indent
    // var priceElement = document.getElementsByClassName('cart-total-price')[0];
  var priceElement = document.getElementsById('planPrice');
  var price = parseFloat(priceElement.innerText.replace('$',''))*100;

  stripeHandler.open({
    amount: price

  });

}
document.getElementById('purchasePlan').addEventListener('click', purchaseClicked);