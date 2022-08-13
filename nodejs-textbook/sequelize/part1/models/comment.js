const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        comment: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'Comment',
        tableName: 'commenter',
        paranoid: false,
        charset: 'utf8md4',
        collate: 'utf8md4_general_ci',
      }
    );
  }
  static associate(db) {
    db.Comment.belongsTo(db.User, {
      foreignKey: 'commenter',
      targetKey: 'id',
    });
  }
};
