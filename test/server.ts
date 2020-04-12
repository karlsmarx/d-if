import express from "express";
import bodyParser from "body-parser";

const app: express.Application = express();

// Parser JSON body
app.use(bodyParser.json());

// Ensure a simple get that return params as body
app.get("/user", (req, res) => {
    res.send({ message: "Hello World!", ...req.params });
});

// Ensure a post that returns the post body
app.post("/user", (req, res) => {
    res.send(req.body);
});

// Ensure a put that returns the put body and id
app.put("/user/:id", (req, res) => {
    res.send({ ...req.body, id: Number(req.params.id) });
});

// Ensure a patch that returns the patch body and id
app.patch("/user/:id", (req, res) => {
    res.send({ ...req.body, id: Number(req.params.id) });
});

// Ensure a delete that returns the id
app.delete("/user/:id", (req, res) => {
    res.send(req.params.id);
});

app.listen(8090, () => {
    console.log("Server Running");
    app.emit("serverReady");
});

export default app;
