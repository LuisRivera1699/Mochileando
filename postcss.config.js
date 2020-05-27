const tailwindcss = require("tailwindcss");

module.exports = ({ env }) => ({
  plugins: [
    tailwindcss("./tailwind.js"),
    require("autoprefixer"),
    env === "production"
      ? require("cssnano")({
          preset: [
            "default",
            {
              discardComments: {
                removeAll: true,
              },
            },
          ],
        })
      : "",
  ],
});
