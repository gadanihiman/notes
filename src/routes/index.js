const path = require('path');

module.exports = [
  {
    path: '/',
    component: path.resolve('src/containers/index.js'),
  },
  {
    path: '/notes/:id',
    component: path.resolve('src/containers/editNote.js'),
  },
  {
    path: '/createNote',
    component: path.resolve('src/containers/createNote.js'),
  },
  {
    path: '/404',
    component: path.resolve('src/containers/404.js'),
  },
];
