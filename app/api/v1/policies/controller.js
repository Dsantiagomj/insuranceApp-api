import { prisma } from "../../../database.js";
import { parsePaginationParams, parseSortParams } from "../../../utils.js";
import { fields } from "./model.js";
import { connect } from "../../../database.js";

export const id = async (req, res, next) => {
  const { params = {} } = req;
  const { id = "" } = params;

  try {
    await connect();
    const data = await prisma.policy.findUnique({
      where: { id },
    });

    if (data === null) {
      next({ message: "Policy not found", status: 404 });
    } else {
      res.locals.data = data;
      next();
    }
  } catch (e) {
    next(e);
  }
};

export const create = async (req, res, next) => {
  const { body = {} } = req;
  try {
    await connect();
    const data = await prisma.policy.create({ data: body });
    res.json({
      data,
    });
  } catch (e) {
    next(e);
  }
};

export const getAll = async (req, res, next) => {
  const { query = {}, params = {} } = req;
  const { limit, offset } = parsePaginationParams(query);
  const { orderBy, direction } = parseSortParams({ fields, ...query });
  const { groupId } = params;

  try {
    await connect();
    const [data, total] = await Promise.all([
      prisma.policy.findMany({
        skip: offset,
        take: limit,
        orderBy: { [orderBy]: direction },
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
        where: {
          groupId,
        },
      }),
      prisma.policy.count({
        where: { groupId },
      }),
    ]);

    res.json({
      data,
      meta: {
        limit,
        offset,
        total,
        orderBy,
        direction,
      },
    });
  } catch (e) {
    next(e);
  }
};

export const read = async (req, res, next) => {
  const { locals = {} } = res;
  const { data } = locals;

  res.json({
    data,
  });
};

export const update = async (req, res, next) => {
  const { body = {}, params = {} } = req;
  const { id = "" } = params;

  try {
    await connect();
    const data = await prisma.policy.update({
      where: { id },
      data: {
        ...body,
        updatedAt: new Date(),
      },
    });
    res.json({ data });
  } catch (e) {
    next(e);
  }
};

export const remove = async (req, res, next) => {
  const { params = {} } = req;
  const { id = "" } = params;
  try {
    await connect();
    await prisma.policy.delete({
      where: { id },
    });
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};
