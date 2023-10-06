const ICONS_DIR = 'icons/';

const windowsOS = {
  win: {
    icon: ICONS_DIR + 'SNKRS-ICON.ico',
    // publisherName: 'win',
    target: 'nsis',
  },

  nsis: {
    differentialPackage: true,
  },
};

const linuxOS = {
  linux: {
    icon: ICONS_DIR,
    target: 'deb',
  },
};

const macOS = {
  mac: {
    target: 'dmg',
    icon: ICONS_DIR + 'SNKRS-ICON.icns',
    hardenedRuntime: true,
    entitlements: 'build/entitlements.mac.inherit.plist',
  },
  dmg: {
    contents: [
      {
        x: 410,
        y: 150,
        type: 'link',
        path: '/Applications',
      },
      {
        x: 130,
        y: 150,
        type: 'file',
      },
    ],
  },
};

module.exports = {
  asar: true,
  productName: 'CACTUSAIO',
  appId: 'com.cactus.aio',
  artifactName: 'CACTUSAIO-${version}.${ext}',
  directories: {
    output: 'build',
  },
  // default files: https://www.electron.build/configuration/contents
  files: [
    'package.json',
    {
      from: 'dist/main/',
      to: 'dist/main/',
    },
    {
      from: 'dist/renderer',
      to: 'dist/renderer/',
    },
    {
      from: 'src/lib',
      to: 'dist/lib/',
    },
    {
      from: 'src/resources/',
      to: 'dist/resources/',
    },
  ],
  publish: {
    provider: 's3',
    bucket: 'cactus-aio-release',
  },
  ...windowsOS,
  ...linuxOS,
  ...macOS,
};
