import Nes from 'nes/client';

class WebsocketClient {
  constructor() {
    this.socket = new Nes.Client('ws://localhost:8080');
    this.cachedSubscriptions = {}; // use for additional check, prevent duplicate subs
  }

  setupConnection() {

    this.socket.connect((err) => {

      if (err) {

        console.log(err);
      }
    });
  }

  makeRequest(message) {

    this.socket.request(message, (err, res) => {
      if (err) {
        return err;
      }

      return res;
    });
  }

  initSubscription(subscriptionPath, callback) {

    if (this.cachedSubscriptions[subscriptionPath]) return;

      // save for future reference, when unsubscribing
    this.cachedSubscriptions[subscriptionPath] = subscriptionPath;

    this.socket.subscribe(subscriptionPath, (msg) => {

      callback(msg);

    }, (err) => {

      if (err) {
        console.log(err);
      }
    });
  }

  cancelSubscriptions(subscriptionPath) {

      // unsubsribe from all handlers for this Id
    this.socket.unsubscribe(subscriptionPath, null, err => err);

    this.cachedSubscriptions[subscriptionPath] = '';
  }
}

const websocketClient = new WebsocketClient();
websocketClient.setupConnection();

// For testing
window.nes = websocketClient;

export {
  websocketClient,
};

