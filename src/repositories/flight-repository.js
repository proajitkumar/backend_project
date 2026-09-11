const CrudRepository = require("./crud-repository");
const { Flight } = require("../models");

class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight);
  }

  async getAllFlights(filter, order) {
    const response = await Flight.findAll({
      where: filter,
      order: order,
    });
    return response;
  }
}

module.exports = FlightRepository;
