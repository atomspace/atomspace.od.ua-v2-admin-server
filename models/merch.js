const Model = require('./Model');

class Merch extends Model {
  static get tableName() {
    return 'app_merch';
  }

  static getAll = async () => await Merch.query();

  static editMerch = async merch =>
    await Merch.query()
      .findById(merch.id)
      .patch({
        ...merch,
        updated_time: Merch.query().findById(merch.id).updated_time
      });

  static deleteMerch = async idx => Merch.query().deleteById(idx);

  static addNewMerch = async merch => await Merch.query().insert(merch);
}

module.exports = Merch;
