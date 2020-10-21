// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================

const express = require("express");
const path = require("path");
// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const tableData = [
  {
    customerName: "Ahmed",
    customerEmail: "ahmed@example.com",
    customerID: "afhaque89",
    phoneNumber: "000-000-0000"
  }
];

const waitListData = [
  {
    customerName: "Saima",
    customerEmail: "saima@example.com",
    phoneNumber: "000-000-0000",
    customerID: "saimaCool"
  }
];


// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================

app.get("/api/tables", function (req, res) {
  res.json(tableData);
});

app.get("/api/waitlist", function (req, res) {
  res.json(waitListData);
});

app.post("/api/tables", function (req, res) {
  if (tableData.length < 5) {
    tableData.push(req.body);
    res.json(true);
  }
  else {
    waitListData.push(req.body);
    res.json(false);
  }
});

app.post("/api/clear", function (req, res) {
  // Empty out the arrays of data
  tableData.length = 0;
  waitListData.length = 0;

  res.json({ ok: true });
});
app.get("/tables", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/tables.html"));
});

app.get("/reserve", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/reserve.html"));
});

// If no matching route is found default to home
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/home.html"));
});

// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
