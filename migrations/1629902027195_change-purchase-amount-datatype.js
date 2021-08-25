/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.alterColumn(
    'purchases',
    'amount',
    {
      type: 'numeric'
    }
  )
};
