import { directives } from "./base";
function install(Vue) {
  directives.forEach(item => {
    Vue.directive(item.name, item.fun);
  });
}
export default {
  install
};
