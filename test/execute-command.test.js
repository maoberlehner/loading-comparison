import 'babel-polyfill';
import sinon from 'sinon';
import test from 'ava';

import { executeCommand } from '../lib/execute-command';

test(`Should be a function.`, (t) => {
  t.is(typeof executeCommand, `function`);
});

test(`Should return a promise.`, (t) => {
  const exec = () => {};

  t.is(typeof executeCommand({ exec }, `fake command`).then, `function`);
});

test(`Should call the exec function with the given command.`, (t) => {
  const exec = sinon.spy();
  const command = `fake command`;

  executeCommand({ exec }, command);
  t.true(exec.calledWith(command));
});

test(`Should call the resolver function.`, async (t) => {
  const exec = (command, callback = () => {}) => callback();
  const resolver = sinon.spy();

  executeCommand({ exec }, `fake command`, resolver);
  t.true(await resolver.called);
});
