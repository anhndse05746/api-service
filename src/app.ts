import express from "express";
import routers from "./routers/routers";

export const app = express();
const port = 3000;

app.use(routers);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

