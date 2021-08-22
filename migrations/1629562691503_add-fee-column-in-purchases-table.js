/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.addColumns('purchases', {
    fees: {
      type: 'smallint',
      notNull: true,
      default: 0
    },
  })
};
