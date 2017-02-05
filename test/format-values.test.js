import sinon from 'sinon';
import test from 'ava';

import formatValuesFactory from '../lib/format-values';

test(`Should be a function.`, (t) => {
  const chalk = () => {};
  const Math = { min: () => {} };
  const formatValues = formatValuesFactory({ chalk, Math });

  t.is(typeof formatValues, `function`);
});

test(`Should format the min values of an array.`, (t) => {
  const chalk = {
    bold: {
      green: sinon.spy(),
    },
  };
  const Math = { min: sinon.stub().returns(1) };
  const values = [1, 2, 3];
  const formatValues = formatValuesFactory({ chalk, Math });

  formatValues(values);
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
  const formatValues = formatValuesFactory({ chalk, Math });
  const formattedValues = formatValues(values);

  t.deepEqual(formattedValues, expectedResult);
});
