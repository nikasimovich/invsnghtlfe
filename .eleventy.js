const { DateTime } = require("luxon");

const isProd = process.env.ELEVENTY_ENV === "production";

module.exports = function (eleventyConfig) {
  // Filters
  eleventyConfig.addFilter("date", (dateObj, format = "LLLL d, yyyy") => {
    return DateTime.fromJSDate(dateObj).toFormat(format);
  });

  // Collections
  eleventyConfig.addCollection("essays", function (collection) {
    return collection.getFilteredByTag("essays").reverse();
  });

  // Static Assets
  eleventyConfig.addPassthroughCopy("assets");

  // Use pathPrefix based on environment
  return {
    pathPrefix: isProd ? "/invsnghtlfe" : "/",
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site",
    },
  };
};
