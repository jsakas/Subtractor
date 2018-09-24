class Observable {
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

class Observer {
  constructor(observable) {
    observable.registerObserver(this);
  }

  notify(observable) {
    console.log('Got update from', observable);
  }
}

export { Observable, Observer };
