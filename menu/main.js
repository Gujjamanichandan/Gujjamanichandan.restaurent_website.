// gujja mani chandan
$(document).ready(function(){
    $('#multicol-carousel').slick({
      slidesToShow: 4, // Number of slides to show at a time
      slidesToScroll: 1, // Number of slides to scroll
      autoplay: true, // Autoplay the carousel
      autoplaySpeed: 2000, // Autoplay speed in milliseconds
      speed: 1000, // Transition speed in milliseconds
      infinite: true, // Enable infinite loop
      prevArrow: '<button type="button" class="slick-prev"><</button>',
      nextArrow: '<button type="button" class="slick-next">></button>',
    });

   // Function to handle menu search
   $("#menuSearch").on("input", function() {
    var searchTerm = $(this).val().toLowerCase();

    // Hide all menu items in maincourse, extras, and drinks sections
    $(".maincourse .item26, .extras .item26, .drinks .item26").hide();

    // Show only items in maincourse that match the search term
    $(".maincourse .item26").filter(function() {
      return $(this).text().toLowerCase().includes(searchTerm);
    }).show();

    // Show only items in extras that match the search term
    $(".extras .item26").filter(function() {
      return $(this).text().toLowerCase().includes(searchTerm);
    }).show();

    // Show only items in drinks that match the search term
    $(".drinks .item26").filter(function() {
      return $(this).text().toLowerCase().includes(searchTerm);
    }).show();
 });

 let cartCounter = 0;
  let totalCost = 0;

  // Array to store cart items
  const cartItems = [];

  // Add to Cart Button Click Event
  $('.main_cart, .Extras_cart, .drinks_cart').on('click', function() {
    // Get the item name and cost
    const itemName = $(this).siblings('div').find('h3.menu-item').text();
    const itemCost = parseFloat($(this).siblings('div').find('p:last').text().replace('$', ''));

    // Add the item to the cart array
    cartItems.push({ name: itemName, cost: itemCost });

    // Update total cost
    totalCost += itemCost;

    // Update the cart counter and display
    cartCounter++;
    updateCartCounter();

  });

  // Function to Update Cart Counter
  function updateCartCounter() {
    $('.addToCart').text('Show Cart (' + cartCounter + ')');
  }

  // Function to update the shopping cart modal
  function updateCartModal() {
    // Clear the existing items in the cart modal
    $('#cartItems').empty();

    // Add each item to the cart modal
    cartItems.forEach(function (item, index) {
      // Use index as a unique identifier for each item
      $('#cartItems').append(`
        <li>
          ${item.name} - $${item.cost.toFixed(2)}
          <button class="deleteItem" data-index="${index}">&times;</button>
        </li>
      `);
    });

    // Add the total cost to the cart modal
    $('#cartItems').append(`<li>Total: $${totalCost.toFixed(2)}</li>`);

    // Display the shopping cart modal
    $('.cart-modal').show();

    // Attach click event to delete buttons
    $('.deleteItem').on('click', function () {
      const index = $(this).data('index');
      removeItem(index);
    });
  }

  // Function to remove an item from the cart
  function removeItem(index) {
    const removedItem = cartItems.splice(index, 1)[0];

    // Update total cost
    totalCost -= removedItem.cost;

    // Update the cart counter and display
    cartCounter--;
    updateCartCounter();

    // Update the shopping cart modal
    updateCartModal();
  }


  // Show Cart Button Click Event
$('.addToCart').on('click', function() {
  // Update the shopping cart modal
  if ($(this).hasClass('showCartBtn')) {
      updateCartModal();
  }

  // Checkout Button Click Event
  $('#checkoutBtn').on('click', function() {
    alert('Implement your checkout logic here. Total cost: $' + totalCost.toFixed(2));
  });

  // Close Shopping Cart Modal Click Event
  $('#closeCartModal').on('click', function() {
    // Hide the shopping cart modal
    $('.cart-modal').hide();
  });
});

});
