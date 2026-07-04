import dotenv from "dotenv";
import prisma from "./lib/prisma";

dotenv.config();
console.log(Object.keys(prisma));
console.log("JWT_SECRET =", process.env.JWT_SECRET);

import app from "./app";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 TeamFlow API running on port ${PORT}`);
});