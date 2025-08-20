/**
 * @type {import('electron-builder').Configuration}
 */
module.exports = {
  appId: 'com.splitmagnifier.app',
  productName: 'Split Magnifier',
  directories: {
    output: 'dist-electron',
    buildResources: 'build-resources'
  },
  files: [
    'dist/**/*',
    'electron/**/*',
    'package.json'
  ],
  extraMetadata: {
    main: 'electron/main.js'
  },
  win: {
    target: [
      {
        target: 'nsis',
        arch: ['x64', 'ia32']
      },
      {
        target: 'portable',
        arch: ['x64']
      }
    ],
    icon: 'build-resources/icon.ico',
    publisherName: 'Split Magnifier',
    requestedExecutionLevel: 'asInvoker',
    artifactName: '${productName}-${version}-${arch}.${ext}',
    legalTrademarks: 'Split Magnifier'
  },
  nsis: {
    oneClick: false,
    perMachine: false,
    allowToChangeInstallationDirectory: true,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
    shortcutName: 'Split Magnifier',
    runAfterFinish: true,
    installerIcon: 'build-resources/icon.ico',
    uninstallerIcon: 'build-resources/icon.ico',
    installerHeaderIcon: 'build-resources/icon.ico',
    deleteAppDataOnUninstall: true,
    license: 'build-resources/license.txt'
  },
  portable: {
    artifactName: '${productName}-${version}-portable.${ext}'
  },
  mac: {
    target: [
      {
        target: 'dmg',
        arch: ['x64', 'arm64']
      }
    ],
    icon: 'build-resources/icon.icns',
    category: 'public.app-category.productivity',
    hardenedRuntime: true,
    gatekeeperAssess: false,
    entitlements: 'build-resources/entitlements.mac.plist',
    entitlementsInherit: 'build-resources/entitlements.mac.plist'
  },
  dmg: {
    title: '${productName} ${version}',
    icon: 'build-resources/icon.icns',
    background: 'build-resources/dmg-background.png',
    contents: [
      {
        x: 110,
        y: 150
      },
      {
        x: 440,
        y: 150,
        type: 'link',
        path: '/Applications'
      }
    ],
    window: {
      width: 550,
      height: 400
    }
  },
  linux: {
    target: [
      {
        target: 'AppImage',
        arch: ['x64']
      },
      {
        target: 'deb',
        arch: ['x64']
      }
    ],
    icon: 'build-resources/icon.png',
    category: 'Utility',
    description: 'Professional Screen Magnification Tool',
    desktop: {
      StartupWMClass: 'Split Magnifier'
    }
  },
  publish: {
    provider: 'github',
    owner: 'your-username',
    repo: 'split-magnifier'
  }
};