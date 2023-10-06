/* eslint-disable */

const request = require('request')
const cheerio = require('cheerio')

const jar = request.jar()

const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:76.0) Gecko/20100101 Firefox/76.0'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

const PREFECTURES = [ '北海道',
  '青森県',
  '岩手県',
  '秋田県',
  '宮城県',
  '山形県',
  '福島県',
  '茨城県',
  '栃木県',
  '群馬県',
  '埼玉県',
  '千葉県',
  '東京都',
  '神奈川県',
  '新潟県',
  '福井県',
  '石川県',
  '富山県',
  '静岡県',
  '山梨県',
  '長野県',
  '愛知県',
  '岐阜県',
  '三重県',
  '和歌山県',
  '滋賀県',
  '奈良県',
  '京都府',
  '大阪府',
  '兵庫県',
  '岡山県',
  '広島県',
  '鳥取県',
  '島根県',
  '山口県',
  '香川県',
  '徳島県',
  '愛媛県',
  '高知県',
  '福岡県',
  '佐賀県',
  '長崎県',
  '大分県',
  '熊本県',
  '宮崎県',
  '鹿児島県',
  '沖縄県' ]

const SHOP_ID = 'PA01036757'

// this.address = {
//   name: '吉田　航己（ヨシダ　コウキ)',
//   zip: '2591116',
//   prefecture: '神奈川県',
//   address1: '伊勢原市石田684-1',
//   address2: 'クレセントアール102',
//   phone: '09061471314',
//   email: 'connorlurring@gmail.com'
// }

// this.cartForm = {}

function getProduct (cb) {
  request({
    method: 'GET',
    url: 'https://ftcstore.jp/?pid=147833227',
    jar,
    gzip: true,
    proxy: 'http://localhost:8889',
    headers: {
      'Host': 'ftcstore.jp',
      'User-Agent': USER_AGENT,
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-GB',
      'Accept-Encoding': 'gzip, deflate, br',
      'Referer': 'https://ftcjapan.shop-pro.jp/cart/',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': 1,
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'cross-site'
    }
  }, (err, res, body) => {
    if (err) {
      return console.log(err)
    }
    const $ = cheerio.load(body)

    const num = $('input[name="product_num"]').val()

    const variant = '73623103,2'// $('option[name="ORANGE"]').val();
    const size = '73623104,0'// $('option[name="LABEL"]').val();

    const user_hash = $('input[name="user_hash"]').val()
    const regi_hash = $('input[name="regi_hash"]').val()
    const members_hash = $('input[name="members_hash"]').val()
    const shop_id = $('input[name="shop_id"]').val()
    const product_id = $('input[name="product_id"]').val()
    const members_id = $('input[name="members_id"]').val()
    const back_url = $('input[name="back_url"]').val()
    const reference_token = $('input[name="reference_token"]').val()
    const shop_domain = $('input[name="shop_domain"]').val()

    this.cartForm = {
      option1: variant,
      option2: size,
      product_num: num,
      user_hash,
      regi_hash,
      members_hash,
      shop_id,
      product_id,
      members_id,
      back_url,
      reference_token,
      shop_domain
    }

    cb()
  })
}

function cartProduct (cb) {
  request({
    method: 'POST',
    url: 'https://ftcjapan.shop-pro.jp/cart/proxy/basket/items/add',
    jar,
    followAllRedirects: true,
    proxy: 'http://localhost:8889',
    headers: {
      'Host': 'ftcstore.jp',
      'User-Agent': USER_AGENT,
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-GB',
      'Accept-Encoding': 'gzip, deflate, br',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': 366, // Buffer.byteLength(JSON.stringify(form), 'utf8'),
      'Origin': 'https://ftcstore.jp',
      'Connection': 'keep-alive',
      'Referer': 'https://ftcstore.jp/?pid=147833227',
      'Upgrade-Insecure-Requests': 1,
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'cross-site'
    },
    form: this.cartForm
  }, (err, res, body) => {
    if (err) {
      return console.log(err)
    }

    // console.log(jar)

    cb()
  })
}

const startTime = Date.now()

const monitor = () => {
  request({
    method: 'GET',
    url: 'https://ftcstore.jp/?pid=147835358',
    jar,
    gzip: true,
    proxy: 'http://localhost:8889',
    headers: {
      'Host': 'ftcstore.jp',
      'User-Agent': USER_AGENT,
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-GB',
      'Accept-Encoding': 'gzip, deflate, br',
      'Referer': 'https://ftcjapan.shop-pro.jp/cart/',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': 1,
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'cross-site'
    }
  }, (err, res, body) => {
    if (err) {
      return console.log(err)
    }
    const $ = cheerio.load(body)

    if (!$('input[name="product_num"]')) {
      return setTimeout(monitor, 2000)
    }

    const num = $('input[name="product_num"]').val()

    const variant = '73626786,0'// $('option[name="ORANGE"]').val();
    const size = '73626787,0'// $('option[name="LABEL"]').val();

    // console.log(body)

    const user_hash = $('input[name="user_hash"]').val()
    const regi_hash = $('input[name="regi_hash"]').val()
    const members_hash = $('input[name="members_hash"]').val()
    const shop_id = $('input[name="shop_id"]').val()
    const product_id = $('input[name="product_id"]').val()
    const members_id = $('input[name="members_id"]').val()
    const back_url = $('input[name="back_url"]').val()
    const reference_token = $('input[name="reference_token"]').val()
    const shop_domain = $('input[name="shop_domain"]').val()

    this.cartForm = {
      option1: variant,
      option2: size,
      product_num: num,
      user_hash,
      regi_hash,
      members_hash,
      shop_id,
      product_id,
      members_id,
      back_url,
      reference_token,
      shop_domain
    }
  })
}

const checkout = () => {
  request({
    method: 'POST',
    url: 'https://ftcjapan.shop-pro.jp/cart/proxy/basket/items/add',
    jar,
    followAllRedirects: true,
    proxy: 'http://localhost:8889',
    headers: {
      'Host': 'ftcstore.jp',
      'User-Agent': USER_AGENT,
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-GB',
      'Accept-Encoding': 'gzip, deflate, br',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(JSON.stringify(form), 'utf8'),
      'Origin': 'https://ftcstore.jp',
      'Connection': 'keep-alive',
      'Referer': 'https://ftcstore.jp/?pid=147833227',
      'Upgrade-Insecure-Requests': 1,
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'cross-site'
    },
    form: this.cartForm
  }, (err, res, body) => {
    const paymentForm = {
      function_div: 'Y01',
      trader_code: '323339701',
      auth_div: '2',
      option_service_div: '00',
      check_sum: '57e32c28ad9197abecfe44536bee8612d1ac865fbef67ddb1352e095554d416d',
      card_no: '', // CARD NUMBER NO SPACES
      card_owner: 'Connor Lurring',
      card_exp: '', // MMYY
      security_code: '' // CVV
    }

    request({
      method: 'POST',
      url: 'https://api.kuronekoyamato.co.jp/api/getToken',
      jar,
      followAllRedirects: true,
      proxy: 'http://localhost:8889',
      headers: {
        'Host': 'ftcstore.jp',
        'User-Agent': USER_AGENT,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-GB',
        'Accept-Encoding': 'gzip, deflate, br',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'https://ftcstore.jp',
        'Connection': 'keep-alive',
        'Referer': 'https://ftcstore.jp/?pid=147833227',
        'Upgrade-Insecure-Requests': 1,
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'cross-site'
      },
      form: paymentForm
    }, (err, res, body) => {
      if (err) {
        return console.log(err)
      }
      body = JSON.parse(body)
      this.payment_token = body.token

      // console.log(jar)
      // console.log(jar._jar.store.idx['ftcjapan.shop-pro.jp']['/']['PA01036757_basket_token'].toString());
      request({
        method: 'GET',
        jar,
        url: 'https://api.shop-pro.jp/public/basket/items',
        proxy: 'http://localhost:8889',
        qs: {
          shop_id: SHOP_ID
        },
        headers: {
          'User-Agent': USER_AGENT,
          'X-BASKET-TOKEN': jar._jar.store.idx['ftcjapan.shop-pro.jp']['/'].PA01036757_basket_token.toString().split(';')[0].split('=')[1],
          'X-SHOP-DOMAIN': 'ftcstore.jp'
        }
      }, (err, res, body) => {
        console.log(body)

        let total_price = 0
        body = JSON.parse(body)

        const checkoutItems = body.items.map(item => {
          console.log(item.name)
          total_price += item.price * item.quantity
          return {
            id: item.id,
            price: item.price,
            quantity: item.quantity,
            customizations: []
          }
        })

        console.log(total_price)

        const checkoutForm = {
          shop_id: SHOP_ID,
          items: checkoutItems,
          delivery: {
            id: 64266, // fetch this from delivery_methods
            address: {
              postal_code: this.address.zip,
              prefecture_id: PREFECTURES.indexOf(this.address.prefecture) + 1,
              address1: this.address.address1,
              address2: this.address.address2,
              phone_number: this.address.phone,
              name: this.address.name
            }
          },
          email: this.address.email,
          sex: null,
          url: null,
          birthday: null,
          receive_mail_magazine: false,
          free1: null,
          free2: null,
          free3: null,
          message: null,
          total_price,
          preferred_date: null,
          preferred_period: null,
          payment: {
            id: 787670,
            kuroneko_web_collect: {
              token: this.payment_token,
              credit_type: 'single',
              payment_time: 1
            }
          }
        }

        console.log(JSON.stringify(checkoutForm, null, 4))

        request({
          method: 'POST',
          url: 'https://api.shop-pro.jp/public/basket/checkout',
          jar,
          followAllRedirects: true,
          proxy: 'http://localhost:8889',
          headers: {
            'user-agent': USER_AGENT,
            'accept': 'application/json',
            'accept-language': 'en-GB',
            'accept-encoding': 'gzip, deflate, br',
            'x-basket-token': jar._jar.store.idx['ftcjapan.shop-pro.jp']['/'].PA01036757_basket_token.toString().split(';')[0].split('=')[1],
            'x-cart-domain-uniq': true,
            'x-shop-domain': 'ftcjapan.shop-pro.jp',
            'origin': 'https://ftcjapan.shop-pro.jp',
            'referer': 'https://ftcjapan.shop-pro.jp/cart/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'te': 'trailers'
          },
          json: true,
          body: checkoutForm
        }, (err, res, body) => {
          if (err) {
            return console.log(err)
          }

          const timeElapsed = (Date.now() - startTime) / 1000

          console.log('Time: ' + timeElapsed)

          console.log(JSON.stringify(body))

          if (body.result.status == 'completed') {
            console.log(`Successfully checked out in ${timeElapsed}s, order ID: ${body.result.sale.id}`)
          }
        })
      })
    })
  })
}
