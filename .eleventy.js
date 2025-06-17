const { DateTime } = require("luxon");

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

  // ✅ KEY CHANGE HERE:
  return {
    pathPrefix: "/invsnghtlfe", // This makes {{ '/assets/main.css' | url }} point correctly
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site",
    },
  };
};
