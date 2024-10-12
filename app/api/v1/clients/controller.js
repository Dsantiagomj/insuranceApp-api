export const create = (req, res, next) => {
  const { body = {} } = req;

  res.json({
    data: body,
  });
};

export const getAll = (req, res, next) => {
  const { query = {} } = req;
  const { limit = 25, offset = 0 } = query;
  res.json({
    meta: {
      limit,
      offset,
    },
  });
};

export const read = async (req, res, next) => {
  const { params = {} } = req;
  const { id = "" } = params;
  res.json({
    data: {
      id,
    },
  });
};

export const update = (req, res, next) => {
  res.json({});
};

export const remove = (req, res, next) => {
  res.json({});
};
