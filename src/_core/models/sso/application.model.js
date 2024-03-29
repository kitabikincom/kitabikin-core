const { Model } = require('objection');
const { db } = require('@core/config/connection');

Model.knex(db);

class ApplicationModel extends Model {
  static get tableName() {
    return 'sso.application';
  }

  static get idColumn() {
    return 'id_application';
  }

  static get relationMappings() {
    const RoleModel = require('./role.model');

    return {
      role: {
        relation: Model.HasManyRelation,
        modelClass: RoleModel,
        join: {
          from: 'sso.application.id_application',
          to: 'sso.role.id_application',
        },
      },
    };
  }

  static get modifiers() {
    return {
      loginSelects(query) {
        query.select('id_application', 'code', 'name');
      },
    };
  }
}

module.exports = ApplicationModel;
