import 'babel-polyfill';
import sinon from 'sinon';
import test from 'ava';

import { executor } from '../lib/executor';

test(`Should be a function.`, (t) => {
  t.is(typeof executor, `function`);
});

test(`Should return a promise.`, (t) => {
  const exec = () => {};

  t.is(typeof executor({ exec }, `fake command`).then, `function`);
});

test(`The exec function should be called with the given command.`, (t) => {
  const exec = sinon.spy();
  const command = `fake command`;

  executor({ exec }, command);
  t.true(exec.calledWith(command));
});

test(`The resolver function should be called.`, async (t) => {
  const exec = (command, callback = () => {}) => callback();
  const resolver = sinon.spy();

  executor({ exec }, `fake command`, resolver);
  t.true(await resolver.called);
});
