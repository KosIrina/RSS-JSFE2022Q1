import { LINE_BREAK } from '../constants/constants';

describe('LINE_BREAK', () => {
  it('LINE_BREAK should match \n', () => {
    expect(LINE_BREAK).toMatch('\n');
  });
});
