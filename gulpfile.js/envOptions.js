const srcPath = './app';
const distPath = './dist';
const nodePath = './node_modules';

let envOptions = {
  string: 'env',
  default: {
    env: 'dev',
  },
  copyFile: {
    src: [
      `${srcPath}/**/*`,
      `${srcPath}/assets/js/**/*.js`,
      `${srcPath}/assets/style/*`,
      `${srcPath}/assets/style/**/*.scss`,
      `${srcPath}/assets/style/**/*.sass`,
      `${srcPath}/**/*.ejs`,
      `${srcPath}/**/*.html`,
    ],
    path: distPath,
  },
  html: {
    src: [
      `${srcPath}/**/*.html`,
    ],
    ejsSrc: [
      `${srcPath}/**/*.ejs`,
    ],
    path: distPath,
  },
  style: {
    src: [
      `${srcPath}/assets/style/**/*.scss`,
      `${srcPath}/assets/style/**/*.sass`,
    ],
    outputStyle: 'expanded',
    includePaths: [
      `${nodePath}/bootstrap/scss`,
    ],
    path: `${distPath}/assets/style`,
  },
  javascript: {
    src: [
      `${srcPath}/assets/js/**/*.js`,
      // `!${srcPath}/assets/js/index.js`,
    // `!${srcPath}/assets/js/admin.js`,
      `!${srcPath}/assets/js/register.js`,
      `!${srcPath}/assets/js/reserve.js`,
      `!${srcPath}/assets/js/cart.js`,
      `!${srcPath}/assets/js/cart2.js`,
      `!${srcPath}/assets/js/table.js`,
      `!${srcPath}/assets/js/result.js`,
      `!${srcPath}/assets/js/member.js`,
    ],
    concat: 'all.js',
    path: `${distPath}/assets/js`,
  },
  copyJSFile: {
    src: [
      // `!${srcPath}/assets/js/index.js`,
    // `!${srcPath}/assets/js/admin.js`,
      `${srcPath}/assets/js/register.js`,
      `${srcPath}/assets/js/reserve.js`,
      `${srcPath}/assets/js/cart.js`,
      `${srcPath}/assets/js/cart2.js`,
      `${srcPath}/assets/js/table.js`,
      `${srcPath}/assets/js/result.js`,
      `${srcPath}/assets/js/member.js`,
    ],
    path: `${distPath}/assets/js`,
  },
  vendors: {
    src: [
      `${nodePath}/jquery/dist/jquery.slim.min.js`,
      `${nodePath}/bootstrap/dist/js/bootstrap.bundle.min.js`, // 已包含 popper.js
    ],
    concat: 'vendors.js',
    path: `${distPath}/assets/js`,
  },
  img: {
    src: [
      `${srcPath}/assets/images/**/*`,
    ],
  },
  clean: {
    src: distPath,
  },
  browserSetting: {
    dir: distPath,
    port: 8080,
  },
  deploySrc: `${distPath}/**/*`,
};

exports.envOptions = envOptions;
