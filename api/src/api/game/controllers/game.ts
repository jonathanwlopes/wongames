/**
 * game controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::game.game",
  ({ strapi }) => ({
    populate: async (ctx) => {
      const options = {
        sort: "popularity",
        page: "1",
        ...ctx.query,
      };

      await strapi.service("api::game.game").populate(options);

      return ctx.send("Finished populating!");
    },
  })
);
