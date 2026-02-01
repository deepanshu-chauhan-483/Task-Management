import dotenv from "dotenv";
dotenv.config(); // Load .env first

import app from "./app";

const PORT = process.env.PORT || 4000; // fallback if PORT is undefined

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
