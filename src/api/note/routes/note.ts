export default {
  routes: [
    {
      method: "POST",
      path: "/notes/testRoute",
      handler: "note.testRoute",
      config: {
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/notes/create',
      handler: 'note.createNote',
      config: {
        auth: {
          strategies: ['users-permissions'],
        },
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/notes/edit',
      handler: 'note.editNote',
      config: {
        auth: {
          strategies: ['users-permissions'],
        },
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/notes/upload-md',
      handler: 'note.uploadMd',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/notes/by-tag-name/:name',
      handler: 'note.findNotesByTag',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/notes/:id',
      handler: 'note.deleteNoteById',
      config: {
        auth: {
          strategies: ['users-permissions'],
        },
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/notes',
      handler: 'note.findAll',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/notes/:id',
      handler: 'note.findOneExtended',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
