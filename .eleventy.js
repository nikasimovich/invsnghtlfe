const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Add a human-readable date filter
  eleventyConfig.addFilter("date", (dateObj, format = "LLLL d, yyyy") => {
    return DateTime.fromJSDate(dateObj).toFormat(format);
  });

  // Define your essay collection
  eleventyConfig.addCollection("essays", function (collection) {
    return collection.getFilteredByTag("essays").reverse();
  });

  // Copy static assets
  eleventyConfig.addPassthroughCopy("assets");

  return {
    pathPrefix: "/invsnghtlfe", // ← this is the important addition
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site"
    }
  };
};
