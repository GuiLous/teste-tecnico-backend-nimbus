/* eslint-disable no-param-reassign */
const repository = require('./repository');

function getDateFormatted(date) {
  const dateFormatted = new Date(date).toISOString().split('T')[0];
  return dateFormatted;
}

module.exports = {
  async execute(dateStart, dateEnd) {
    const dbAlerts = await repository.execute(dateStart, dateEnd);

    const eventsResponse = dbAlerts.reduce((result, alert) => {
      const { date } = alert;

      const existingSummary = result.find(
        summary => summary.date === getDateFormatted(date),
      );

      if (existingSummary) {
        existingSummary.damages.push(alert.damage);
        if (alert.damage > existingSummary.maxDamageEvent.damage) {
          existingSummary.maxDamageEvent = alert;
        }
        if (alert.damage < existingSummary.minDamageEvent.damage) {
          existingSummary.minDamageEvent = alert;
        }
      } else {
        result.push({
          date: getDateFormatted(date),
          damages: [alert.damage],
          maxDamageEvent: { event: alert.event, damage: alert.damage },
          minDamageEvent: { event: alert.event, damage: alert.damage },
        });
      }

      return result;
    }, []);

    eventsResponse.forEach(summary => {
      const totalDamage = summary.damages.reduce(
        (total, damage) => total + damage,
        0,
      );
      summary.avgDamage = Math.round(totalDamage / summary.damages.length);
      delete summary.damages;
    });

    return eventsResponse.sort((a, b) => b.date.localeCompare(a.date));
  },
};
