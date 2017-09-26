class Observable {
  constructor() {
    self.observers = []
  }

  registerObserver(observer) {
    self.observers.push(observer)
  }

  notifyObservers() {
    self.observers.forEach((observer) => {
      observer.notify(this)
    })
  }
}

class Observer {
  constructor(observable) {
    observable.registerObserver(this)
  }

  notify(observable) {
    console.log('Got update from', observable)
  }
}

export { Observable, Observer }
