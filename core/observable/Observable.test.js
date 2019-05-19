import { Observer, Observable } from './Observable';

describe('Observable', () => {
  test('registers observers', () => {
    const observable = new Observable();

    let o1 = new Observer();
    let o2 = new Observer();

    observable.registerObserver(o1);
    observable.registerObserver(o2);

    o1.notify = jest.fn();
    o2.notify = jest.fn();

    observable.notifyObservers('foo');

    expect(o1.notify).toHaveBeenCalledTimes(1);
    expect(o2.notify).toHaveBeenCalledTimes(1);
    expect(o1.notify.mock.calls[0][0]).toEqual('foo');
    expect(o2.notify.mock.calls[0][0]).toEqual('foo');
  });

  test('un-registers observers', () => {
    const observable = new Observable();

    let o1 = new Observer();
    let o2 = new Observer();

    observable.registerObserver(o1);
    observable.registerObserver(o2);

    expect(observable.observers.length).toEqual(2);
    expect(observable.observers[0]).toBe(o1);
    expect(observable.observers[1]).toBe(o2);

    observable.unregisterObserver(o1);

    expect(observable.observers[0]).toBe(o2);
    expect(observable.observers.length).toEqual(1);
  });

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
