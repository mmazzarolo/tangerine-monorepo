import { isEven } from "@my-monorepo/is-even";
import { isOdd } from "@my-monorepo/is-odd";
import express from "express";

const app = express();
const port = 3000;

app.get("/is-even/:number", (req, res) => {
  const result = isEven(Number(req.params.number));
  return res.status(200).send(result);
});

app.get("/is-odd/:number", (req, res) => {
  const result = isOdd(Number(req.params.number));
  return res.status(200).send(result);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
