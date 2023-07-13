module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/**/*.test.js",
    "!src/index.js"
  ],
  coverageReporters: ["json", "lcov", "text", "clover"],
};

