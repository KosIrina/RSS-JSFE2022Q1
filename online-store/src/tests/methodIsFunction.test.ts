import { AppController } from '../components/controller/controller';

describe('AppController', () => {
  const app = new AppController();
  it('clearFiltersSettings() should be a function', () => {
    expect(typeof app.clearFiltersSettings).toBe('function');
  });
});
