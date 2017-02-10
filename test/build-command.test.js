import test from 'ava';

import { buildCommand } from '../lib/build-command';

test(`Should be a function.`, (t) => {
  t.is(typeof buildCommand, `function`);
});

test(`Should return a browsertime command string with the given options.`, (t) => {
  const options = [
    `test-script`,
    {
      browser: `chrome`,
      iterations: 1,
      skipHar: ``,
    },
    `https://test-url.com`,
  ];
  const expectedResult = `test-script --browser chrome --iterations 1 --skipHar https://test-url.com`;
  const commandString = buildCommand(options);
  t.is(commandString, expectedResult);
});
