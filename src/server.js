const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { generateUniqueCode, sendConfirmationEmail } = require("./services/emailService");
const { db } = require("./config/firebaseConfig");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Endpoint to generate unique code and send confirmation email
app.post("/generateCodeAndEmail", async (req, res) => {
   const { name, email, tickets, agentCode, paymentId } = req.body;

   try {
      const uniqueCode = generateUniqueCode(agentCode);

      // Store booking data in Firebase
      const bookingRef = await db.collection("bookings").add({
         name,
         email,
         tickets: parseInt(tickets),
         agentCode,
         paymentId,
         uniqueCode,
      });

      // Send confirmation email
      await sendConfirmationEmail(email, uniqueCode, tickets);

      res.status(200).send("Booking successful");
   } catch (error) {
      res.status(500).send("Server error");
   }
});

// Start the server
app.listen(3000, () => {
   console.log("Server running on port 3000");
});