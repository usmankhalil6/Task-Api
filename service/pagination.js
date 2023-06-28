function fetchResponse(model) {
  return async (req, res, next) => {
    let { skip, limit, sort, rangeType = "" } = req.query;
    let populate = null;
    try {
      if (!skip) {
        skip = 0;
      }
      if (!limit) {
        limit = 10;
      }
      if (!sort) {
        sort = { createdAt: "-1" };
      }
      const rangeTypeQuery = rangeType;
      const startIndex = skip;
      const endIndex = Number(limit);
      const sortQuery = sort;
      const query = req.query;
      delete query.sort;
      delete query.limit;
      delete query.skip;
      const results = {};
      const total = await model.countDocuments(query).exec();
      results.total = total;
      results.skip = startIndex;
      results.limit = endIndex;
      results.data = await model
        .find(query)
        .populate(populate)
        .limit(rangeTypeQuery === "all" ? total : endIndex)
        .skip(startIndex)
        .sort(sortQuery)
        .exec();
      res.json(results);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  };
}
module.exports.fetchResponse = fetchResponse;
