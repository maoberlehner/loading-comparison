import test from 'ava';

import { logResult } from '../lib/log-result';

test(`Should be a function.`, (t) => {
  t.is(typeof logResult, `function`);
});
