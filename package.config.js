const { BACKEND_URL } = require('./config')
const package1 = {
  promotions: [
    {
      isEnabled: false,
      serviceID: '1',
      logo: `${BACKEND_URL}/logo1.jpg`
    },
    {
      isEnabled: false,
      serviceID: '3',
      logo: `${BACKEND_URL}/logo2.jpg`
    },
    {
      isEnabled: false,
      serviceID: '5',
      logo: `${BACKEND_URL}/logo3.jpg`
    },
    {
      isEnabled: false,
      serviceID: '6',
      logo: `${BACKEND_URL}/logo4.jpg`
    }
  ],
  anotherFn: () => {
    return true
  } // end anotherFn
}
// end package1
const package2 = {
  promotions: [
    {
      isEnabled: false,
      serviceID: '2',
      logo: `${BACKEND_URL}/logo5.jpg`
    },
    {
      isEnabled: false,
      serviceID: '4',
      logo: `${BACKEND_URL}/logo6.jpg`
    },
    {
      isEnabled: false,
      serviceID: '7',
      logo: `${BACKEND_URL}/logo7.jpg`
    },
    {
      isEnabled: false,
      serviceID: '9',
      logo: `${BACKEND_URL}/logo8.jpg`
    }
  ],
  anotherFn: () => {
    return false
  } // end anotherFn
}
// end package2
module.exports = {
  package1,
  package2
}