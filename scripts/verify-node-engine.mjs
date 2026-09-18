import { readFile } from 'node:fs/promises';

const expectedRange = '^20.19.0 || >=22.12.0';
const packageJson = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
const vitePackageJson = JSON.parse(await readFile(new URL('../node_modules/vite/package.json', import.meta.url), 'utf8'));

if (packageJson.engines?.node !== expectedRange) {
  throw new Error(`package.json declares ${packageJson.engines?.node ?? 'no Node range'}, expected ${expectedRange}`);
}

if (vitePackageJson.engines?.node !== expectedRange) {
  throw new Error(`Vite declares ${vitePackageJson.engines?.node ?? 'no Node range'}, expected ${expectedRange}`);
}

const parseVersion = (version) => {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version);
  return match ? match.slice(1).map(Number) : null;
};

const acceptsNodeVersion = (version) => {
  const parsed = parseVersion(version);
  if (!parsed) return false;
  const [major, minor] = parsed;
  return (major === 20 && minor >= 19) || major >= 22 && (major > 22 || minor >= 12);
};

const supportedVersions = ['20.19.0', '20.25.1', '22.12.0', '23.0.0'];
const rejectedVersions = ['21.0.0', '22.0.0', '22.11.0', 'not-a-version', '22.12'];

for (const version of supportedVersions) {
  if (!acceptsNodeVersion(version)) throw new Error(`Expected Node ${version} to be accepted`);
}

for (const version of rejectedVersions) {
  if (acceptsNodeVersion(version)) throw new Error(`Expected Node ${version} to be rejected`);
}

console.log(`Node engine range verified: ${expectedRange}`);
