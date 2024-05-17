import express from "express";
import routes from "./routes/authRoutes"
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json())

app.use("/api/v1/auth", routes)


app.listen(PORT, () => {
  console.log(`Connected to auth service on port : ${PORT} `);
});
