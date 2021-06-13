
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');


module.exports = {
  async create(ctx) {
    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services['contact-request'].create(data, { files });
    } else {
      entity = await strapi.services['contact-request'].create(ctx.request.body);
    }
    entity = sanitizeEntity(entity, { model: strapi.models['contact-request'] });

    const date = new Date(entity['published_at']);

    await strapi.plugins['email'].services.email.send({
      to: 'melf@stillleben.media',
      from: 'noreply@stillleben.media',
      replyTo: entity['email'],
      subject: 'Kontaktanfrage von ' + entity['name'] + ' am ' + date.getDay() + '.' + date.getMonth() + '.' + date.getFullYear() + ' - ' + date.getHours() + ':' + date.getMinutes(),
      text: `
        Kontaktanfrage von ${entity['name']}\n\n
        Kontakt E-Mail: ${entity['email']}\n\n
        Nachricht:\n
        ${entity['message']}\n
      `
    });
    return entity;
  }
};
