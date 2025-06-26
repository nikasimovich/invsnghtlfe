const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("date", (dateObj, format = "LLLL d, yyyy") => {
    return DateTime.fromJSDate(dateObj).toFormat(format);
  });

  eleventyConfig.addCollection("essays", function (collection) {
    return collection.getFilteredByTag("essays").reverse();
  });

  // ✅ Make sure these passthrough copies are here:
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy(".nojekyll");

  return {
    pathPrefix: "", // ✅ use root-relative URLs with no subfolder
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site",
    },
  };
};
