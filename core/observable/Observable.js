export class Observable {
  constructor() {
    this.observers = [];
  }

  registerObserver(observer) {
    this.observers.push(observer);
  }

  notifyObservers(message = null) {
    this.observers.forEach((observer) => {
      observer.notify(message || this);
    });
  }
}

export class Observer {
  constructor(observable) {
    observable.registerObserver(this);
  }

  notify(observable) {
    console.log('Got update from', observable);
  }
}
