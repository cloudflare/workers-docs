---
title: Aggregating Multiple Requests
---
Here, we make multiple requests to different API endpoints, aggregate the responses and send it back as a single response.

{{<highlight javascript>}}
addEventListener('fetch', event => {
    event.respondWith(fetchAndApply(event.request))
})
  
/**
 * Make multiple requests, 
 * aggregate the responses and 
 * send it back as a single response
 */
async function fetchAndApply(request) {
    const init = {
      method: 'GET',
      headers: {'Authorization': 'XXXXXX'}
    }
    const [btcResp, ethResp, ltcResp] = await Promise.all([
      fetch('https://api.coinbase.com/v2/prices/BTC-USD/spot', init),
      fetch('https://api.coinbase.com/v2/prices/ETH-USD/spot', init),
      fetch('https://api.coinbase.com/v2/prices/LTC-USD/spot', init)
    ])
  
    const btc = await btcResp.json()
    const eth = await ethResp.json()
    const ltc = await ltcResp.json()
  
    let combined = {}
    combined['btc'] = btc['data'].amount
    combined['ltc'] = ltc['data'].amount
    combined['eth'] = eth['data'].amount
  
    const responseInit = {
      headers: {'Content-Type': 'application/json'}
    }
    return new Response(JSON.stringify(combined), responseInit)
}

{{</highlight>}}