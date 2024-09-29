// Add event listener for form submission
document.getElementById("bookingForm").addEventListener("submit", async (event) => {
    event.preventDefault();
 
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const tickets = document.getElementById("tickets").value;
    const agentCode = document.getElementById("agentCode").value;
 
    const amount = tickets * 80;  // Calculate total amount
 
    // Proceed to payment with Razorpay
    initiatePayment(amount, { name, email, tickets, agentCode });
 });
 
 function initiatePayment(amount, bookingData) {
    const options = {
       "key": "YOUR_RAZORPAY_KEY_ID",  // Razorpay API Key
       "amount": amount * 100,  // Amount in paisa
       "currency": "INR",
       "name": "Ticket Booking",
       "description": "Ticket booking transaction",
       "handler": function (response) {
          // Payment successful, now send data to server
          sendBookingDataToServer(bookingData, response.razorpay_payment_id);
       },
       "prefill": {
          "email": bookingData.email
       }
    };
    const payment = new Razorpay(options);
    payment.open();
 }
 
 async function sendBookingDataToServer(bookingData, paymentId) {
    const response = await fetch('/generateCodeAndEmail', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
          ...bookingData,
          paymentId
       })
    });
    if (response.ok) {
       window.location.href = "/thankyou.html";
    } else {
       alert("Something went wrong. Please try again.");
    }
 }