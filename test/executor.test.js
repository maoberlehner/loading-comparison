import sinon from 'sinon';
import test from 'ava';

import executorFactory from '../lib/executor';

test(`Should return a promise.`, (t) => {
  const exec = () => {};
  const executor = executorFactory({ exec });

  t.is(typeof executor(`fake command`).then, `function`);
});

test(`The exec function should be called with given command.`, (t) => {
  const exec = sinon.spy();
  const executor = executorFactory({ exec });
  const command = `fake command`;

  executor(command);
  t.true(exec.calledWith(command));
});

test(`The resolver function should be called.`, async (t) => {
  const exec = (command, callback = () => {}) => callback();
  const resolver = sinon.spy();
  const executor = executorFactory({ exec });

  executor(`fake command`, resolver);
  t.true(await resolver.called);
});
