import { prisma } from "../../../database.js";
import { parsePaginationParams, parseSortParams } from "../../../utils.js";
import { fields } from "./model.js";

export const id = async (req, res, next) => {
  const { params = {} } = req;
  const { id = "" } = params;

  try {
    const data = await prisma.client.findUnique({
      where: { id },
    });

    if (data === null) {
      next({ message: "Client not found", status: 404 });
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
    const data = await prisma.client.create({ data: body });
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
    const [data, total] = await Promise.all([
      prisma.client.findMany({
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
      prisma.client.count({
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
    const data = await prisma.client.update({
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
    await prisma.client.delete({
      where: { id },
    });
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};
