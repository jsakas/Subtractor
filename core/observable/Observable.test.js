import { Observer, Observable } from './Observable';

describe('Observable', () => {
  test('notifies Observers of a property change', () => {

    const observable = new Observable();
    observable.update = function(value) {
      this.privateValue = value;
      this.notifyObservers();
    };

    const observer = new Observer(observable);
    observer.notify = jest.fn();

    observable.update(1234);
    expect(observer.notify.mock.calls[0][0].privateValue).toEqual(1234);
  });
  test('can notify Observers with a custom message', () => {

    const observable = new Observable();
    observable.update = function(value) {
      this.privateValue = value;
      this.notifyObservers({ privateValue: value });
    };

    const observer = new Observer(observable);
    observer.notify = jest.fn();

    observable.update(1234);
    expect(observer.notify.mock.calls[0][0]).toEqual({ privateValue: 1234 });
  });
});
