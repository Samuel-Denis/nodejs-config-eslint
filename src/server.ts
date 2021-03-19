import express from "express";
import { categoriesRoutes } from './routes/categories.routes';

const app = express();

app.use(express.json());
app.use(categoriesRoutes);

app.get("/", (req, res) => res.json({ message: "Hello Samuel " }));

app.listen(3333);
