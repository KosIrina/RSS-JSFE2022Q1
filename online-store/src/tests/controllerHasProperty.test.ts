import { AppController } from '../components/controller/controller';

describe('AppController', () => {
  const controller = new AppController();
  it('controller should have selection property', () => {
    expect(controller).toHaveProperty('selection');
  });
});
