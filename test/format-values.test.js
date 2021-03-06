import sinon from 'sinon';
import test from 'ava';

import { formatValues } from '../lib/format-values';

test(`Should be a function.`, (t) => {
  t.is(typeof formatValues, `function`);
});

test(`Should call Math.min().`, (t) => {
  const Math = { min: sinon.spy() };
  const values = [1, 2];

  formatValues({ Math }, values);
  t.true(Math.min.calledWith(...values));
});

test(`Should format the min values of an array.`, (t) => {
  const chalk = {
    bold: {
      green: sinon.spy(),
    },
  };
  const Math = { min: sinon.stub().returns(1) };
  const values = [1, 2, 3];

  formatValues({ chalk, Math }, values);
  t.true(chalk.bold.green.calledWith(1));
});

test(`Should return an array with the min values highlighted.`, (t) => {
  const chalk = {
    bold: {
      green: () => `highlighted`,
    },
  };
  const Math = { min: sinon.stub().returns(1) };
  const values = [1, 2, 3, 1];
  const expectedResult = [`highlighted`, 2, 3, `highlighted`];
  const formattedValues = formatValues({ chalk, Math }, values);

  t.deepEqual(formattedValues, expectedResult);
});
