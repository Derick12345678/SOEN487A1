import express from "express";
import cors from "cors";
import mortgageRoutes from "./routes/mortgageRoutes";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api", mortgageRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});