import app from "./app";
import { generateAccessToken, generateRefreshToken } from "./utils/generateJWT";
require("dotenv").config();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
