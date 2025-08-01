export default {
  async find(ctx) {
    const types = await strapi.entityService.findMany('api::type.type' as any, {
      fields: ['id', 'name'],
    });

    ctx.body = types;
  },
};
