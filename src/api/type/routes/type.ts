export default {
  routes: [
    {
      method: 'GET',
      path: '/types',
      handler: 'type.find',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};