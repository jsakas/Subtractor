export class Observable {
  constructor() {
    this.observers = [];
  }

  registerObserver(observer) {
    this.observers.push(observer);
  }

  unregisterObserver(observer) {
    let index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notifyObservers(message = null) {
    this.observers.forEach((observer) => {
      observer.notify(message || this);
    });
  }
}

export class Observer {
  constructor(observable) {
    if (observable && typeof observable.registerObserver ===  'function') {
      observable.registerObserver(this);
    }
  }

  notify(observable) {
    console.log('Got update from', observable);
  }
}
