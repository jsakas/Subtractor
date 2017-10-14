class Observable {
  constructor() {
    self.observers = []
  }

  registerObserver(observer) {
    self.observers.push(observer)
  }

  notifyObservers(message = null) {
    self.observers.forEach((observer) => {
      observer.notify(message || this)
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
