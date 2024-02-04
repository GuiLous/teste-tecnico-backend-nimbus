const { prisma } = require('../libs/prismaClient');

module.exports = {
  async execute(dateStart, dateEnd) {
    const dbAlerts = await prisma.alert.findMany({
      where: {
        date: {
          gte: `${dateStart}T00:00:00Z`,
          lte: `${dateEnd}T23:59:59Z`,
        },
      },
      select: {
        date: true,
        damage: true,
        event: true,
      },
      orderBy: {
        date: 'desc',
      },
    });

    return dbAlerts;
  },
};
