const Model = require('./Model');

class Mentor extends Model {
  static get tableName() {
    return 'app_mentor';
  }

  static getAll = async () => await Mentor.query();

  static getById = async idx => await Mentor.query().findById(idx);

  static amount = async () => await Mentor.query().count;

  static insert = async mentor => await Mentor.query().insert(mentor);
}

module.exports = Mentor;
