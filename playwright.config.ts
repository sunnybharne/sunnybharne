import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  workers: 1,
  use: {
    baseURL: 'http://127.0.0.1:4321',
    channel: 'chromium',
    launchOptions: { args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] },
  },
  webServer: {
    command: 'python3 -m http.server 4321 --bind 127.0.0.1 --directory out',
    url: 'http://127.0.0.1:4321',
  },
});
