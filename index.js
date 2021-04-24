const server = require("./api/server");

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`\n*** Server is runnning on http://localhost:${PORT} ***\n`);
});

