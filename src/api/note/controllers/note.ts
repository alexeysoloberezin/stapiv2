import type Koa from 'koa';
import fs from 'fs';

export default {
  async testRoute(ctx) {
    ctx.send({ message: 'OK' });
  },

  async uploadMd(ctx: Koa.Context) {
    const { files } = ctx.request;

    if (!files || !files.file) {
      return ctx.badRequest('Файл не передан');
    }

    const uploadedFile = files.file;

    const fileArray = Array.isArray(uploadedFile) ? uploadedFile : [uploadedFile];

    const createdNotes = [];

    for (const file of fileArray) {
      const buffer = await fs.promises.readFile(file.filepath, 'utf-8');
      const title = file.originalFilename?.replace('.md', '') ?? 'Untitled';

      const created = await strapi.entityService.create('api::note.note', {
        data: {
          title,
          content: buffer,
        },
      });

      createdNotes.push(created);
    }

    ctx.send({ body: createdNotes });
  },

  async findNotesByTag(ctx) {
    const { name } = ctx.params;

    console.log('name', name)

    const notes = await strapi.entityService.findMany('api::note.note', {
      fields: ['id', 'title', 'createdAt'],
    });

    console.log(notes)
    ctx.send({ data: notes })
  },

  async createNote(ctx) {
    try {
      const { title, content, isFree, typeId } = ctx.request.body;

      if (!title || !typeId) {
        return ctx.badRequest('Missing required fields: title or typeId');
      }

      const note = await strapi.entityService.create('api::note.note', {
        data: {
          title,
          content,
          isFree,
          type: typeId ? { id: typeId } : undefined,
        },
        populate: ['type'],
      });

      ctx.send({ data: note });
    } catch (err) {
      ctx.internalServerError('Failed to create note', err);
    }
  },
  async editNote(ctx) {
    try {
      const { id, title, content, isFree, typeId } = ctx.request.body;

      if (!id || !title || !typeId) {
        return ctx.badRequest('Missing required fields: id, title or typeId');
      }

      const updatedNote = await strapi.entityService.update('api::note.note', id, {
        data: {
          title,
          content,
          isFree,
          type: typeId ? { id: typeId } : undefined,
        },
        populate: ['type'],
      });

      ctx.send({ data: updatedNote });
    } catch (err) {
      console.error(err);
      ctx.internalServerError('Failed to update note', err);
    }
  },

  async findAll(ctx) {
    const entity = await strapi.entityService.findMany('api::note.note', {
      fields: ['id', 'title', 'createdAt', 'isFree', 'content'], 
      populate: {
        type: {fields: ['id', 'name']}
      },
      sort: { createdAt: 'desc' }
    }) as Array<{
      id: number
      title: string
      createdAt: string
      isFree: boolean
      content: string
      type?: {
        id: number
        name: string
      }
    }>

    if (!entity) {
      return ctx.notFound('Ничего не найдено');
    }

    ctx.send({ data: entity })
  },
  async deleteNoteById(ctx) {
    const { id } = ctx.params;

    try {
      const deleted = await strapi.entityService.delete('api::note.note', id);
      ctx.send({ success: true, deleted });
    } catch (err) {
      ctx.throw(500, 'Ошибка при удалении заметки');
    }
  },
  async findOneExtended(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.entityService.findOne('api::note.note', id, {
      populate: {
        type: {fields: ['id', 'name']}
      }
    });

    if (!entity) {
      return ctx.notFound('Заметка не найдена');
    }

    ctx.send({ body: entity });
  },
};
