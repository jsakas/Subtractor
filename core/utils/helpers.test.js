import { renameObjectKey } from '../../src/utils/helpers';

describe('renameObjectKey', () => {
  test('renames an object key', () => {
    const obj = { a: 1 };
    renameObjectKey(obj, 'a', 'b');
    expect(obj).toHaveProperty('b');
    expect(obj).not.toHaveProperty('a');
    expect(obj).toEqual({ b: 1 });
  });
});
