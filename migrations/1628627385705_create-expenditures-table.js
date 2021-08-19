exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('expenditures', {
    id: 'id',
    description: {
      type: 'varchar(1000)',
      notNull: true
    },
    boughtDatetime: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
};