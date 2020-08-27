const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios').default;

require('dotenv').config()

const app = express()

app.use(bodyParser())

app.post('/generate_otp', (req, res) => {
  const body = req.body
  const { mobileNumber } = body;
  var options = {
    authkey: process.env.SECRET_KEY,
    template_id: process.env.TEMPLATE_ID,
    mobile: mobileNumber,
    expiry: 1
  };

  axios.get(process.env.BASE_URL + '/otp', {
    params: options
  }).then((result) => {
    const data = result.data
    res.status(200).send(data)
  })
    .catch(err => {
      res.status(400).send(err)
    })

})

app.post('/verify_otp', (req, res) => {
  const body = req.body
  const { mobile, otp } = body
  axios.post(process.env.BASE_URL + "/otp/verify?mobile=" + mobile + "&otp=" + otp + "&authkey=" + process.env.SECRET_KEY).then(result => {
    res.status(200).send(result.data)
  }).catch(err => {
    res.status(400).send({
      msg: "failed"
    })
  })
})

const port = process.env.PORT || 8001
app.listen(port, () => {
  console.log("Server started at " + port)
})
