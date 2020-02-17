const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

server.use((req, res, next) => {
  console.count('Requisições');

  next();
});

checkProjectExists = (req, res, next) => {
  const { id } = req.params;

  if (!projects.find(proj => proj === id)) {
    return res.status(400).json({ error: 'ID selecionado não existe!' });
  }

  next();
};

server.get('/projects', (req, res) => {
  res.send(projects);
});

server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  projects.push({ id: id, title: title, tasks: [] });

  return res.send(projects);
});

server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  console.log(id, title);

  const project = projects.filter(proj => proj.id === id);

  project[0].tasks.push(title);

  res.send(projects);
});

server.put('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.filter(proj => proj.id === id);

  project[0].title = title;

  return res.send(projects);
});

server.delete('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const projectIndex = projects.map(proj => proj.id).indexOf(id);

  projects.splice(projectIndex, 1);

  res.send(projects);
});

server.listen(3000);
