import app from "./src/app";
require("dotenv").config();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
