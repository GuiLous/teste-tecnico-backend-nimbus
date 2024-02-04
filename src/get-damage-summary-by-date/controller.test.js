const controller = require('./controller');
const repository = require('./repository');

jest.mock('./repository', () => ({
  execute: jest.fn(),
}));

describe('Controller', () => {
  it('should return average, maximum, and minimum events daily in a date range', async () => {
    const dateStart = '2024-01-01';
    const dateEnd = '2024-01-02';

    const mockAlerts = [
      { date: '2024-01-01', event: 'Event A', damage: 100 },
      { date: '2024-01-01', event: 'Event B', damage: 200 },
      { date: '2024-01-02', event: 'Event C', damage: 150 },
      { date: '2024-01-02', event: 'Event D', damage: 250 },
    ];

    repository.execute.mockResolvedValue(mockAlerts);

    const expectedResult = [
      {
        date: '2024-01-02',
        avgDamage: 200,
        maxDamageEvent: { event: 'Event D', damage: 250 },
        minDamageEvent: { event: 'Event C', damage: 150 },
      },
      {
        date: '2024-01-01',
        avgDamage: 150,
        maxDamageEvent: { event: 'Event B', damage: 200 },
        minDamageEvent: { event: 'Event A', damage: 100 },
      },
    ];

    const result = await controller.execute(dateStart, dateEnd);

    expect(repository.execute).toHaveBeenCalledWith(dateStart, dateEnd);
    expect(result).toEqual(expectedResult);
  });
});
