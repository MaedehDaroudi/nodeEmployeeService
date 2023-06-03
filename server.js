const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 81;
const app = require("./app");

app.listen(port, () => {
  console.log(`server connect on port ${port}....`);
});
