const events = require('../data/alerts.json');
const { prisma } = require('../src/libs/prismaClient');

async function main() {
  console.log(`Event seed Start...`);

  events.forEach(async event => {
    const eventCreated = await prisma.alert.create({
      data: {
        date: new Date(event.date),
        event: event.event,
        damage: event.damage,
      },
    });

    console.log(`Created event with name: ${eventCreated.event}!`);
  });

  console.log(`Event seed finished.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
