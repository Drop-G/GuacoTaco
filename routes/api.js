const path = require("path");
const { Reservation, ReservationLists} = require("../model/model");

const reservationLists = new ReservationLists(5);
reservationLists.load();
module.exports = function(app){
    app.get("/api/tables", function (req, res) {
        res.json(reservationLists.getTables());
      });
      
      app.get("/api/waitlist", function (req, res) {
        res.json(reservationLists.getWaitlist());
      });
      
      app.post("/api/tables", async function (req, res) {
        const { customerName, phoneNumber, customerEmail, customerID} = req.body;
        const reservation = new Reservation(
            customerName,
            customerEmail,
            customerID,
            phoneNumber
        )
        const result = await reservationLists.addReservation(reservation);
        res.json(result);
      });
      
      app.post("/api/clear", function (req, res) {
        // Empty out the arrays of data
        reservationLists.clear();
      
        res.json({ ok: true });
      });
}