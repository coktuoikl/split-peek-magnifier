# Windows Installer Setup Guide

This guide will help you create a Windows installer (.exe) for the Split Magnifier app.

## Prerequisites

1. **Node.js 18+** - Download from [nodejs.org](https://nodejs.org/)
2. **Git** - Download from [git-scm.com](https://git-scm.com/)

## Setup Instructions

### 1. Export and Clone the Project

1. Click the "Export to GitHub" button in Lovable
2. Clone your repository locally:
   ```bash
   git clone <your-repository-url>
   cd <your-project-name>
   ```

### 2. Install Dependencies

```bash
npm install
```

### 3. Update package.json

Add these scripts to your `package.json` file in the `"scripts"` section:

```json
{
  "scripts": {
    "electron:dev": "concurrently \\"npm run dev\\" \\"wait-on http://localhost:8080 && electron electron/main.js\\"",
    "electron:pack": "electron-builder",
    "electron:dist": "npm run build && electron-builder",
    "electron:dist:win": "npm run build && electron-builder --win",
    "build:icons": "node scripts/build-icons.js",
    "postinstall": "npm run build:icons"
  }
}
```

Also add these properties to the root of your `package.json`:

```json
{
  "main": "electron/main.js",
  "homepage": "./",
  "description": "Professional Screen Magnification Tool with Split-Screen View",
  "author": "Your Name",
  "license": "MIT"
}
```

### 4. Generate Icons

Run the icon generation script:

```bash
npm run build:icons
```

### 5. Development Mode

To run the app in development mode with Electron:

```bash
npm run electron:dev
```

This will start both the Vite dev server and Electron, with hot reloading enabled.

### 6. Build Windows Installer

To create the Windows installer:

```bash
npm run electron:dist:win
```

This will:
1. Build the React app for production
2. Package it with Electron
3. Create Windows installers in the `dist-electron` folder

## Output Files

After running the build command, you'll find these files in `dist-electron`:

- **`Split Magnifier-1.0.0-x64.exe`** - Windows installer (64-bit)
- **`Split Magnifier-1.0.0-ia32.exe`** - Windows installer (32-bit)
- **`Split Magnifier-1.0.0-portable.exe`** - Portable version (no installation required)

## Installation Features

The Windows installer includes:

- ✅ **NSIS Installer** - Professional Windows installer
- ✅ **Desktop Shortcut** - Automatic desktop shortcut creation
- ✅ **Start Menu Entry** - Added to Windows Start Menu
- ✅ **Uninstaller** - Clean uninstall process
- ✅ **Auto-updater Ready** - Built-in update mechanism
- ✅ **Code Signing Ready** - Can be code-signed for distribution

## Customization

### Change App Icon

Replace `build-resources/icon.png` with your custom 512x512 PNG icon, then run:

```bash
npm run build:icons
```

### Modify Installer Settings

Edit `electron-builder.config.js` to customize:

- Company name
- Installer appearance
- File associations
- Auto-start options
- Update server settings

## Distribution

### Code Signing (Recommended)

For public distribution, you should code-sign your installer:

1. Get a code signing certificate
2. Add these to `electron-builder.config.js`:

```javascript
win: {
  certificateFile: "path/to/certificate.p12",
  certificatePassword: "your-password",
  // ... other settings
}
```

### Auto-Updates

The app is configured for GitHub releases auto-updates. To enable:

1. Update the `publish` section in `electron-builder.config.js`
2. Create GitHub releases with your built installers
3. The app will automatically check for updates

## Troubleshooting

### Build Errors

If you encounter build errors:

1. **Clear cache**: `npm run clean` (if available) or delete `node_modules` and `npm install`
2. **Check Node version**: Ensure you're using Node.js 18+
3. **Windows only**: Install Visual Studio Build Tools if native modules fail

### Icon Issues

If icons don't generate properly:

1. Ensure `sharp` is installed: `npm install sharp`
2. Check that `build-resources/icon.png` exists and is 512x512
3. Run `npm run build:icons` manually

### Electron Won't Start

If Electron fails to start:

1. Check that the Vite dev server is running on port 8080
2. Verify `electron/main.js` exists
3. Try running components separately: `npm run dev` then `electron electron/main.js`

## Advanced Features

### Menu Integration

The app includes keyboard shortcuts:

- **Ctrl+T** - Toggle magnifier
- **Ctrl+1/2** - Switch split orientation
- **Ctrl+Plus/Minus** - Zoom in/out
- **F11** - Full screen
- **Ctrl+R** - Reset focus area

### System Tray (Optional)

To add system tray functionality, modify `electron/main.js` to include tray icon and menu.

## Support

For issues with the Electron setup, check:

- [Electron Documentation](https://www.electronjs.org/docs)
- [electron-builder Documentation](https://www.electron.build/)
- [GitHub Issues](https://github.com/electron/electron/issues)

---

**Note**: This setup creates a professional desktop application that users can install like any other Windows software. The app will have its own window, appear in the taskbar, and can be distributed to users who don't have browsers or prefer desktop applications.
