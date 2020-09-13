const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

function checkIdExists(req, res, next) {
  const { id } = req.params;

  const project = projects.find((p) => p.id == id);

  if (!project) {
    return res.status(400).json({ error: "Project ID does not exists" });
  }

  return next();
}
function logRequests(req, res, next) {
  console.count("numero de requisições");
  return next();
}

server.use(logRequests);

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  const projeto = {
    id: id,
    title: title,
    tasks: [],
  };
  projects.push(projeto);

  return res.json(projects);
});

server.post("/projects/:id/task", checkIdExists, (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  const project = projects.find((p) => p.id == id);

  project.tasks.push(task);

  return res.json(projects);
});

server.put("/projects/:id", checkIdExists, (req, res) => {
  const { id } = req.params;
  const { titulo } = req.body;

  const project = projects.find((p) => p.id == id);

  project.title = titulo;

  return res.json(projects);
});

server.delete("/projects/:id", checkIdExists, (req, res) => {
  const { id } = req.params;

  const index = projects.findIndex((p) => p.id == id);

  projects.splice(index, 1);

  return res.json(projects);
});

server.listen(3000);
