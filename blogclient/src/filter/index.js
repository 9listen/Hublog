import { filters } from "./base";
function install(Vue) {
  filters.forEach(item => {
    Vue.filter(item.name, item.fun);
  });
}
export default {
  install
};
