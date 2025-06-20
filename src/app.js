const express = require('express');

const app = express();

// It works for all paths
// app.use((req,res) => {
//     res.send("Hello from server..!!")
// })

// request handler
app.use("/test", (req,res) => {
    res.send("Hello from test path..!!!")
})

app.listen(3001, () => console.log("Server running at port: 3001..."))