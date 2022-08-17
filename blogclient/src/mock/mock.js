// 使用 Mock
const Mock = require('mockjs')//
const getfragmentMock = () => {
  return {
    status: 200,
    'data': {
      count: 20,
      'row|5': [{
        id: '@id()',
        username: '@cname()',
        browsenum: '@integer(100,300)',
        like: '@integer(100,300)',
        message: '@cword(30,40)',
        cover: '@image',
        date: '@integer(1,12)',
      }]
    }
  }
}
const getpagearticleMock = () => {
  return {
    status: 200,
    'data': {
      count: 3, 
      'rows|3': [{
        FK_columnGuid: "@id()",
        PK_articleGuid: "@id()",
        articleContentHtml: "<p>js</p>\n",
        articleContentMd: "js",
        browsenum: "@integer(1,100)",
        columnname: "js",
        description: "@cword(1,50)",
        imagecover: "",
        labellist: [{
          key: '@pick(js,ts,vue,node)'
        }],
        lasttime: "2022-06-12 18:27:06",
        status: 1,
        title: "@pick(js,ts,vue,node)",
      }]
    }
  }
}
Mock.mock('api/client/getFragment', getfragmentMock())//请求地址+数据
Mock.mock('api/client/getpagearticle', getpagearticleMock())
