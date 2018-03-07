// export default {
//   areaHost: ''
// }


export default (function () {
  const config = {
    dev: {
      areaHost: ''
    },
    qa: {
      areaHost: 'https://internal-stage.tutormeetplus.com'
    },
    stage: {
      areaHost: 'https://internal-stage.tutormeetplus.com'
    },
    prod: {
      areaHost: 'https://internal.tutormeetplus.com'
    }
  }
  return config[process.env.DEPLOYMENT_ENV]
})()