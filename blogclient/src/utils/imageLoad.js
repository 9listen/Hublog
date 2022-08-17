const socures = [
  {
    url: "./../../static/images/logo.jpeg",
    name: "图片1"
  },
  {
    url: "./../../static/images/side-bg.gif",
    name: "图片2"
  },
  {
    url: "./../../static/images/nav1.jpg",
    name: "图片3"
  },
  {
    url: "./../../static/images/cover1.jpg",
    name: "图片4"
  }
];
/**
 *加载图片
 * @param {String} url 图片地址
 * @param {String} name 图片名字
 */
const imgPreloader = (url, name) => {
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.src = url;
    image.name = name;
    image.onload = e => {//图片加载完成后立即执行
      resolve(e);
    };
    image.onerror = err => {//图像加载过程中发生错误时被触发
      reject(err);
    };
  });
};
/**
 *
 * @param {String} imgs  图片资源
 */
export const imgsPreloader = (imgs = socures) => {
  let promiseArr = [];
  imgs.forEach(element => {
    promiseArr.push(imgPreloader(element.url, element.name));
  });
  return Promise.all(promiseArr);
};
