import http from 'k6/http'
import { sleep } from 'k6'
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
  vus: 100,
  iterations: 1000
}

export default function() {
  http.get('https://k6eliamseck.work-shop.grafana.net/api/recommendations')

  sleep(randomIntBetween(1, 5))
}