function create(model) {
  return async (req, res, next) => {
    try {
      const result = new model({
        ...req.body,
      });
      await result.save();
      res.json(result);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  };
}
module.exports.create = create;
