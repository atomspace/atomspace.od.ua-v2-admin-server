const Model = require('./Model');

class Merch extends Model {
  static get tableName() {
    return 'app_merch';
  }

  static getAll = async () => await Merch.query();

  static editMerch = async merch =>
    await Merch.query()
      .findById(merch.id)
      .patch({ ...merch });

  static deleteMerch = async idx => Merch.query().deleteById(idx);
}

module.exports = Merch;
