import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));

const ROOT = __dirname;
const ENV = argv.env || 'dev';

const CONTENTS_PATH = ''; // dist先ディレクトリを調整する（例: 'sample/'）

const SRC = `${ROOT}/src/`;
const DEST = `${ROOT}/dist/${CONTENTS_PATH}`;
const SERVER_DIR = `${ROOT}/dist/`;

const paths = {
  src: `${SRC}`,
  dist: `${DEST}`,
  view: {
    src: `${SRC}views/pages/**/!(_)*.ejs`,
    dir: `${SRC}views/`,
    watch: `${SRC}views/**/*.ejs`,
    dist: `${DEST}`,
  },
  style: {
    src: `${SRC}styles/**/!(_)*.scss`,
    dir: `${SRC}styles/`,
    watch: `${SRC}styles/**/*.scss`,
    dist: `${DEST}assets/css/`,
  },
  script: {
    src: `${SRC}scripts/**/!(_)*.js`,
    prettierSrc: [`${SRC}scripts/**/*.js`, `!${SRC}scripts/libs/**/*.js`],
    dir: `${SRC}scripts/`,
    watch: `${SRC}scripts/**/*.js`,
    dist: `${DEST}assets/js/`,
    // headタグで読み込みscripts（※更新時は再度ビルドが必要）
    libsHead: [],
    // 通常のbodyタグ末尾で読み込みscripts（※更新時は再度ビルドが必要）
    libs: [
      `${ROOT}/node_modules/jquery/dist/jquery.min.js`,
      `${ROOT}/node_modules/lodash/lodash.min.js`,
      `${ROOT}/node_modules/gsap/dist/gsap.min.js`,
      // `${ROOT}/node_modules/scrollmagic/scrollmagic/minified/ScrollMagic.min.js`,
      // `${ROOT}/node_modules/scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js`,
      // `${ROOT}/node_modules/scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js`,
      `${ROOT}/node_modules/imagesloaded/imagesloaded.pkgd.min.js`,
      // `${ROOT}/node_modules/slick-carousel/slick/slick.min.js`,
      // `${SRC}scripts/libs/_iscroll.min.js`,
    ],
  },
  jsdoc: {
    src: `${SRC}scripts/*`,
    dist: `${ROOT}/doc/jsdoc/`,
  },
  image: {
    src: `${SRC}images/**/*`,
    dir: `${SRC}images/`,
    watch: `${SRC}images/**/*`,
    dist: `${DEST}assets/images/`,
  },
  static: {
    // font, htaccessなど
    src: [`${SRC}static/**/*`, `!${SRC}static/**/.gitkeep`],
    dir: `${SRC}static/`,
    watch: `${SRC}static/**/*`,
    dist: `${DEST}`,
  },
};

const constants = {
  default: {
    url: '/',
    apiUrl: '/',
    contentsPath: `/${CONTENTS_PATH}`,
    assetsPath: `/${CONTENTS_PATH}assets/`,
    gaID: '',
    ogpAppID: '',
    mqBreakpoint: [
      { type: 'SP', min: undefined, max: 767 },
      { type: 'TAB', min: 768, max: 1023 },
      { type: 'PC', min: 1024, max: undefined },
    ],
  },
  dev: {
    url: 'http://localhost:3000/',
    apiUrl: '/api/',
    contentsPath: `/${CONTENTS_PATH}`,
    assetsPath: `/${CONTENTS_PATH}assets/`,
    gaID: '',
    ogpAppID: '',
  },
  stg: {
    url: 'http://staging.example.com/',
    apiUrl: '/api/',
    contentsPath: `/${CONTENTS_PATH}`,
    assetsPath: `/${CONTENTS_PATH}assets/`,
    gaID: '',
    ogpAppID: '',
  },
  prd: {
    url: 'http://example.com/',
    apiUrl: '/api/',
    contentsPath: `/${CONTENTS_PATH}`,
    assetsPath: `/${CONTENTS_PATH}assets/`,
    gaID: '',
    ogpAppID: '',
  },
};

const settings = {
  default: {
    view: {
      changed: false,
      minify: false,
    },
    style: {
      changed: false,
      minify: false,
      sourcemap: true,
    },
    script: {
      changed: false,
      Uglify: false,
      sourcemap: true,
    },
    image: {
      minify: false,
    },
    minifier: {
      removeComments: true,
      collapseWhitespace: true,
    },
    ejs: {
      options: {},
      settings: {
        ext: '.html',
      },
    },
    autoprefixer: {
      browsers: ['last 2 versions', 'ie >= 9', 'ios >= 7', 'android >= 4.0'],
    },
    cssMqpacker: {},
    sass: {
      options: {
        outputStyle: 'expanded',
      },
    },
    clean: {
      patterns: [`${DEST}**/*`],
      options: {},
    },
    cleanDirectory: {
      path: `${DEST}`,
    },
    cleanDoc: {
      patterns: [`${ROOT}/docs/**/*`],
      options: {},
    },
    server: {
      port: 3000,
      server: {
        baseDir: `${SERVER_DIR}`,
        index: 'index.html',
      },
      ui: {
        port: 3001,
      },
      serveStatic: [
        {
          route: '/dummy',
          dir: `${SRC}mock/assets/`,
        },
        {
          route: '/doc',
          dir: `${ROOT}/doc/`,
        },
      ],
      ghostMode: false,
      reloadDebounce: 500,
    },
    // api mock 利用しない場合はコメントアウト
    apiServer: {
      port: 8888,
      delay: 500,
      src: `${SRC}mock/apiTemplate/`,
    },
    htmlhint: '.htmlhintrc',
    sassLint: {},
    eslint: {
      useEslintrc: true,
    },
    jsdoc: {
      tags: {
        allowUnknownTags: true,
      },
      opts: {
        destination: paths.jsdoc.dist,
      },
      plugins: ['plugins/markdown'],
      templates: {
        cleverLinks: false,
        monospaceLinks: false,
        default: {
          outputSourceFiles: true,
        },
        path: 'ink-docstrap',
        theme: 'Cyborg',
        navType: 'vertical',
        linenums: true,
        dateFormat: 'MMMM Do YYYY, h:mm:ss a',
      },
    },
    // prettierEslint: {
    //   eslintConfig: {
    //     rules: {
    //       quotes: ['error', 'single']
    //     }
    //   }
    // }
  },
  dev: {},
  stg: {
    style: {
      minify: true,
      sourcemap: false,
    },
    script: {
      Uglify: true,
      sourcemap: false,
    },
    image: {
      minify: false,
    },
  },
  prd: {
    style: {
      minify: true,
      sourcemap: false,
    },
    script: {
      Uglify: true,
      sourcemap: false,
    },
    image: {
      minify: false,
    },
  },
};

const config = {
  env: ENV,
  paths,
  constants: Object.assign({}, constants.default, constants[ENV]),
  settings: Object.assign({}, settings.default, settings[ENV]),
  isWatch: false,
};

export default config;
