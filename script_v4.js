import http from 'k6/http'
import { sleep, check } from 'k6'
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
  stages: [
    { duration: '1m', target: 200 },
    { duration: '2m', target: 200 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% of requests should be below 2000ms
  }
}

export default function() {
  const response = http.get('https://k6eliamseck.work-shop.grafana.net/api/recommendations')

  const didSucceed = check(response, {
    'is status 200': (r) => r.status === 200,
  });

  if (!didSucceed) {
    console.log(`Unexpected response code: ${response.status}. Received: ${response.body}`)
  }

  sleep(randomIntBetween(1, 5))
}