const Model = require('./Model');
const fs = require('fs');
const path = require('path');

class News extends Model {
  static get tableName() {
    return 'app_news';
  }

  static getAll = async () => await News.query();

  static editArticle = async merch =>
    await News.query()
      .findById(merch.id)
      .patch({
        ...merch,
        updated_time: News.query().findById(merch.id).updated_time
      });

  static deleteArticle = async idx => {
    let obj = await News.query().findById(idx);
    try {
      fs.unlinkSync(path.join(__dirname, `../uploads/${obj.news_picture_url}`));
    } catch (err) {
      console.log(err);
    }
    return await News.query().deleteById(idx);
  };

  static addNewArticle = async article => await News.query().insert(article);
}

module.exports = News;
