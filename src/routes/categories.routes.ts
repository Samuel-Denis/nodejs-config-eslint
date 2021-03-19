import { Router } from "express";

const categoriesRoutes = Router();

const categoris = [];

categoriesRoutes.post("/categories", (req, res) => {
  const { name, description } = req.body;

  categoris.push({
    name,
    description,
  });
  return res.status(201).send();
});
export { categoriesRoutes };
