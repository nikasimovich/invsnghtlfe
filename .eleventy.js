const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Add human-readable date filter
  eleventyConfig.addFilter("date", (dateObj, format = "LLLL d, yyyy") => {
    return DateTime.fromJSDate(dateObj).toFormat(format);
  });

  // Define your essay collection
  eleventyConfig.addCollection("essays", function(collection) {
    return collection.getFilteredByTag("essays").reverse();
  });

  // Pass through the assets folder (images, JS, CSS)
  eleventyConfig.addPassthroughCopy("assets");

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site"
    }
  };
};
