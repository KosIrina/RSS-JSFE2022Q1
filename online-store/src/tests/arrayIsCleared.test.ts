import { AppController } from '../components/controller/controller';
import { AllOptions } from '../constants/constants';

describe('AppController', () => {
  const app = new AppController();
  it('clearFiltersSettings() should make array length equal to zero', () => {
    AllOptions.filters.categories = ['a', 'b', 'c'];
    app.clearFiltersSettings();
    expect(AllOptions.filters.categories).toHaveLength(0);
  });
});
