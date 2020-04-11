import express from "express";
import bodyParser from "body-parser";

const app: express.Application = express();

// Parser JSON body
app.use(bodyParser.json());

// Ensure a simple get
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Ensure a post that returns the post body
app.post("/", (req, res) => {
    res.send(req.body);
});

// Ensure a put that returns the put body and id
app.put("/:id", (req, res) => {
    res.send({ ...req.body, id: Number(req.params.id) });
});

// Ensure a patch that returns the patch body and id
app.patch("/:id", (req, res) => {
    res.send({ ...req.body, id: Number(req.params.id) });
});

// Ensure a delete that returns the id
app.delete("/:id", (req, res) => {
    res.send(req.params.id);
});

app.listen(8090, () => {
    console.log("Server Running");
    app.emit("serverReady");
});

export default app;
