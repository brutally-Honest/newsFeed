const { CronJob } = require("cron");
const axios = require("axios");
const parseString = require("xml2js").parseString;
const Feed = require("../models/feeds");
const Category = require("../models/categories");

const filter = (string) => {
  const imgTagRegex = /<img[^>]*>/g;
  const aTagTegex = /<a\b[^>]*>(.*?)<\/a>/g;
  const description = string.replace(imgTagRegex, "").replace(aTagTegex, "");
  return description;
};
// every 5 minutes
const job = new CronJob("0 */5 * * * *", async function () {
  const d = new Date();
  try {
    const categories = await Category.find({});
    categories.map(async (category) => {
      const categoryFeed = await axios.get(`${category.url}`);
      parseString(categoryFeed.data, async (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result.rss?.channel[0]?.title, d);
          result.rss.channel[0].item.forEach(async (e) => {
            const feed = await Feed.findOne({ title: e.title });
            if (!feed) {
              const description = filter(e.description[0]);
              const newFeed = {
                title: e.title[0],
                link: e.link[0],
                pubDate: e.pubDate[0],
                image: e.enclosure ? e.enclosure[0]["$"].url : "No image",
                category: category._id,
                description,
              };
              //logging new feed
              console.log(newFeed);
              const feedInDb = new Feed(newFeed);
              const final = await feedInDb.save();
              console.log(final);
              await Category.findByIdAndUpdate(category._id, {
                $push: { feeds: { feedId: final._id } },
              });
            }
          });
        }
      });
    });
  } catch (e) {
    console.log(e);
  }
});
module.exports = job;
