"use strict";
/**
 * game controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController("api::game.game", ({ strapi }) => ({
    populate: async (ctx) => {
        const options = {
            sort: "popularity",
            page: "1",
            ...ctx.query,
        };
        await strapi.service("api::game.game").populate(options);
        return ctx.send("Finished populating!");
    },
}));
