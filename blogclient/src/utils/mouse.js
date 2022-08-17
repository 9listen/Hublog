/**
 * 鼠标跟随特效（基于canvas）需要元素挂载后再使用
 * @param {String} el canvas元素id
 * @param {String} clientWidth 容器宽
 * @param {String} clientHeight 容器高
 */
function mouseLoading(el, clientWidth, clientHeight) {
  function titlecolor() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    let a = 0.8;
    let color = `rgba(${r},${g},${b},${a})`;
    return "#FFFF00";
  }
  //构建星光对象
  class Star {
    constructor(x, y, r, speed) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.losespeed = speed;
      this.color = titlecolor();
      this.dx = Math.floor(Math.random() * 5 - 1);
      this.dy = Math.floor(Math.random() * 5 - 1);
      actor.push(this);
    }
    render() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, true);
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill();
    }
    godie() {
      for (let i = 0; i < actor.length; i++) {
        if (actor[i] === this) {
          actor.splice(i, 1);
        }
      }
    }
    update() {
      this.x -= this.dx;
      this.y -= this.dy;
      this.r -= this.losespeed;
      if (this.r < 0) {
        this.godie();
      }
    }
  }
  let canvas = document.getElementById(el);
  let ctx = canvas.getContext("2d");
  //创建演员列表
  let actor = [];
  setInterval(function() {
    ctx.clearRect(0, 0, clientWidth, clientHeight);
    for (let i = 0; i < actor.length; i++) {
      actor[i].update();
      actor[i] && actor[i].render();
    }
    new Star(
      Math.ceil(Math.random() * clientWidth),
      clientHeight + 30,
      Math.floor(Math.random() * 10 - 2),
      0.02
    );
  }, 20);
  // canvas.onmousemove = function(e) {
  //   new Star(e.clientX, e.clientY, 8, 0.2);
  // };
}
export default mouseLoading;
