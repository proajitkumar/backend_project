const { Logger } = require("../config");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    const response = this.model.create(data);
    return response;
  }

  async destroy(data) {
    try {
      const response = this.model.destroy({
        where: {
          id: data,
        },
      });
      return response;
    } catch (error) {
      Logger.error("Something went wrong went in the Crud Repo : destroy");
      throw error;
    }
  }

  async get(data) {
    try {
      const response = this.model.findByPk(data);
      return response;
    } catch (error) {
      Logger.error("Something went wrong went in the Crud Repo : get");
      throw error;
    }
  }

  async getAll() {
    try {
      const response = this.model.findAll();
      return response;
    } catch (error) {
      Logger.error("Something went wrong went in the Crud Repo : getAll");
      throw error;
    }
  }

  async update(id, data) {
    // data -> {col: value, ...}
    try {
      const response = this.model.update(data, {
        where: {
          id: id,
        },
      });
      return response;
    } catch (error) {
      Logger.error("Something went wrong went in the Crud Repo : update");
      throw error;
    }
  }
}

module.exports = CrudRepository;
