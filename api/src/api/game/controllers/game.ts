/**
 * game controller
 */

import { factories } from "@strapi/strapi";
import axios from "axios";
import jsdom from "jsdom";
import slugify from "slugify";
import FormData from "form-data";

const getByName = async (name: string, entityName: string) => {
  const item = await strapi.entityService.findMany(
    `api::${entityName}.${entityName}`,
    {
      filters: { name },
      populate: "*",
    }
  );

  return item.length ? item[0] : null;
};

const create = async (name: string, entityName: string) => {
  const item = await getByName(name, entityName);

  if (!item) {
    await strapi.entityService.create(`api::${entityName}.${entityName}`, {
      data: {
        name,
        slug: slugify(name, { lower: true }),
      },
    });
  }
};

const createGame = async (products, entityName: string) => {
  await Promise.all(
    products.map(async (product) => {
      const item = await getByName(product.title, "game");

      if (!item) {
        const game = await strapi.entityService.create(
          `api::${entityName}.${entityName}`,
          {
            data: {
              name: product.title,
              slug: product.slug.replace(/-/g, "_"),
              price: product.price.finalMoney.amount ?? 0,
              release_date: new Date(product.releaseDate)
                .toISOString()
                .slice(0, 10),
              categories: await Promise.all(
                product.genres.map((genre) => getByName(genre.name, "category"))
              ),
              plataforms: await Promise.all(
                product.operatingSystems.map((operatingSystem) =>
                  getByName(operatingSystem, "plataform")
                )
              ),
              developers: await Promise.all(
                product.developers.map((name) => getByName(name, "developer"))
              ),
              publishers: await Promise.all(
                product.publishers.map((name) => getByName(name, "publisher"))
              ),
              ...(await getGameInfo(product.slug.replace(/-/g, "_"))),
            },
          }
        );

        console.log(products[0]);
        await setImage({ image: product.coverHorizontal, game });
        await Promise.all(
          product.screenshots
            .slice(0, 5)
            .map((image) =>
              setImage({
                image: image.replace("_{formatter}", ""),
                game,
                field: "gallery",
              })
            )
        );
        return game;
      }
    })
  );
};

const getProductsInfo = async () => {
  const gogApiURL = `https://catalog.gog.com/v1/catalog?limit=48&order=desc%3Atrending&productType=in%3Agame%2Cpack%2Cdlc%2Cextras&page=1&countryCode=BR&locale=en-US&currencyCode=BRL`;

  const {
    data: { products },
  } = await axios.get(gogApiURL);

  return products;
};

const getGameInfo = async (slug: string) => {
  const { JSDOM } = jsdom;
  const body = await axios.get(`https://www.gog.com/en/game/${slug}`);
  const dom = new JSDOM(body.data);

  const description = dom.window.document.querySelector(
    "[content-summary-section-id='description'] .description"
  );

  if (!description)
    return {
      rating: "BR0",
      short_description: "",
      description: "",
    };

  return {
    rating: "BR0",
    short_description: description.textContent.slice(0, 160).trim(),
    description: description.innerHTML,
  };
};

const createManyToManyData = async (products) => {
  const developersList = {};
  const publishersList = {};
  const categoriesList = {};
  const plataformList = {};

  products.forEach((product) => {
    const { developers, publishers, genres, operatingSystems } = product;

    genres &&
      genres.forEach((item) => {
        categoriesList[item.name] = true;
      });

    operatingSystems &&
      operatingSystems.forEach((item) => {
        plataformList[item] = true;
      });

    developers &&
      developers.forEach((item) => {
        developersList[item] = true;
      });

    publishers &&
      publishers.forEach((item) => {
        publishersList[item] = true;
      });

    return Promise.all([
      ...Object.keys(categoriesList).map(async (name) => {
        const item = await getByName(name, "category");
        if (!item) create(name, "category");
      }),
      ...Object.keys(plataformList).map(async (name) => {
        const item = await getByName(name, "plataform");
        if (!item) create(name, "plataform");
      }),
      ...Object.keys(developersList).map(async (name) => {
        const item = await getByName(name, "developer");
        if (!item) create(name, "developer");
      }),
      ...Object.keys(publishersList).map(async (name) => {
        const item = await getByName(name, "developer");
        if (!item) create(name, "publisher");
      }),
    ]);
  });
};

const setImage = async ({ image, game, field = "cover" }) => {
  const url = image;
  const { data } = await axios.get(url, { responseType: "arraybuffer" });
  const buffer = Buffer.from(data, "base64");

  const formData = new FormData();
  formData.append("refId", game.id);
  formData.append("ref", "api::game.game");
  formData.append("field", field);
  formData.append("files", buffer, { filename: `${game.slug}.jpg` });

  console.log(`Uploading ${field} image: ${game.slug}.jpg`);

  await axios({
    method: "POST",
    url: `http://${strapi.config.host}:${strapi.config.port}/api/upload`,
    data: formData,
    headers: {
      "Content-Type": `multipart/form-data`,
    },
  });
};

export default factories.createCoreController(
  "api::game.game",
  ({ strapi }) => ({
    populate: async (ctx) => {
      const products = await getProductsInfo();
      await createManyToManyData(products);
      await createGame(products, "game");

      return ctx.send("Finished populating!");
    },
  })
);
