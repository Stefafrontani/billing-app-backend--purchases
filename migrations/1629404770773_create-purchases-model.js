/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('purchases', {
    id: {
      type: 'serial',   // With these two, is the same to id: 'id'
      primaryKey: true, // With these two, is the same to id: 'id'
      unique: true
    },
    description: {
      type: 'varchar(1000)',
      notNull: true
    },
    boughtAt: {
      type: 'timestamp',
      notNull: true,
    },
    amount: {
      type: 'integer',
      notNull: true
    }
  })
  pgm.createTable('payments', {
    id: 'id',
    expirationDate: {
      type: 'varchar(1000)',
      notNull: true
    },
    amount: {
      type: 'integer',
      notNull: true
    },
    purchaseId: {
      type: 'integer',
      notNull: true,
      references: '"purchases"',
      onDelete: 'cascade',
    },
  })
};