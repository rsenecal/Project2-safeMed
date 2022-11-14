
function purchaseClicked(event){

  console.log(event.target.id);
  // eslint-disable-next-line indent
    // var priceElement = document.getElementsByClassName('cart-total-price')[0];
  var priceElement = document.getElementById('planPrice');
  var price = parseFloat(priceElement.innerText.replace('$',''))*100;

  // stripeHandler.open({
  //   amount: price

  // });

}
document.getElementById('purchasedPlan1').addEventListener('click', purchaseClicked);