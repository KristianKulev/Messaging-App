import 'whatwg-fetch';
import storageService from 'services/storage.service';

import Nes from 'nes/client';

let nesClient;
let cachedSubscriptionPath;

function setupNesClient() {

  nesClient = new Nes.Client('ws://localhost:8080');

  nesClient.connect((err) => {

    if (err) {

      console.log(err);
    }
  });
}
// TODO: this call should probably be moved to different location
setupNesClient();

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;


  console.log('util', response);
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options) {

  options.headers = { Authorization: storageService.get('session', 'token_id') }; // TODO: this should be real token

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}

export function nesRequest(message) {

  nesClient.request(message, (err, res) => {
    if (err) {
      return err;
    }

    return res;
  });
}

export function initClientSubscription(subscriptionPath, callback) {

  if (cachedSubscriptionPath) return;

  // save for future reference, when unsubscribing
  cachedSubscriptionPath = subscriptionPath;

  nesClient.subscribe(subscriptionPath, (msg) => {

    callback(msg);
  });
}

// test nesClient.subscriptions()
window.nes = nesClient;
export function cancelClientSubscriptions(subscriptionPath) {

  // TODO: BUGFIX - subscriptions dont get cancelled. Saga is not triggered on one hand; action is triggered with wrong conversationId, because it comes from the state, and the moment the cancelSubscription action is triggered, the conversationId is already the one of the newly opened conversation. if  cachedSubscriptionPath instead of subscriptionPath, comming from the action is used, probably it will be ok

  // nesClient.unsubscribe(cachedSubscriptionPath, null, err => err);

  console.log('unsubscribe before', nesClient.subscriptions());

  // unsubsribe from all handlers for this Id
  nesClient.unsubscribe(cachedSubscriptionPath, null, err => err);

  console.log('unsubscribe after', nesClient.subscriptions());
  cachedSubscriptionPath = '';
}
