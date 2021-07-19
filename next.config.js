const packageJson = require('./package.json');
const s3 = require('./config/s3.json');

module.exports = {
  future: {
    webpack5: true,
  },
  webpack: function (config) {
    config.experiments = {};
    return config;
  },
  env: {
    APP_NAME: packageJson.name,
    APP_VERSION: packageJson.version,

    SITE_ENV: process.env.NODE_ENV,
    API_HOST: process.env.API_HOST,
    APP_HOST: process.env.APP_HOST,

    S3_BUCKET: s3.bucket,
    S3_SECRET: s3.secret,
    S3_ACCESS: s3.access,
  }
};

