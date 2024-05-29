import express from "express";
import cors from "cors";
import bookingRoutes from "./routes/booking.js";
import { homePage } from "./controllers/booking.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors()); // we can restrict who can access the API.

app.get("/", homePage);
app.use("/hall-api", bookingRoutes);

app.listen(PORT);
