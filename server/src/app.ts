import express from "express";
import userRouter from "./routes/user.route";
import authRouter from "./routes/auth.route";
import section_swapRouter from "./routes/section_swap.route";
import departmentRouter from "./routes/department.route";
import courseRouter from "./routes/course.route";
import thesisGroupRouter from "./routes/thesis-group.route";
import resourceRouter from "./routes/resources.route";
var cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: `${process.env.CLIENT_URL}`,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("The API is working");
});
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/section_swap", section_swapRouter);
app.use("/api/v1/department", departmentRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/thesis-group", thesisGroupRouter);
app.use("/api/v1/resource", resourceRouter);

export default app;
