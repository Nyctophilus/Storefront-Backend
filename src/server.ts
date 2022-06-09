import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import orderRoutes from "./handlers/order";
import userRoutes from "./handlers/user";
import productRoutes from "./handlers/product";

const app: express.Application = express();

app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
  res.send("Storefront HomePage!");
});

// routes
productRoutes(app);
userRoutes(app);
orderRoutes(app);

const port = 3000;
app.listen(port, function () {
  console.log(`starting app on: ${port}`);
});

export default app;
