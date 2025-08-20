const { spawn } = require('child_process');
const { createServer } = require('vite');
const electron = require('electron');

let electronProcess;

async function startDev() {
  // Start Vite dev server
  console.log('Starting Vite dev server...');
  const server = await createServer({
    // Server will run on default port 8080
  });
  
  await server.listen();
  console.log('Vite dev server started on http://localhost:8080');

  // Wait a bit for server to be ready
  setTimeout(() => {
    console.log('Starting Electron...');
    electronProcess = spawn(electron, ['electron/main.js'], {
      stdio: 'inherit',
      env: {
        ...process.env,
        NODE_ENV: 'development'
      }
    });

    electronProcess.on('close', (code) => {
      console.log(`Electron process exited with code ${code}`);
      server.close();
      process.exit(0);
    });
  }, 2000);
}

// Handle cleanup
process.on('SIGINT', () => {
  if (electronProcess) {
    electronProcess.kill();
  }
  process.exit(0);
});

startDev().catch(console.error);