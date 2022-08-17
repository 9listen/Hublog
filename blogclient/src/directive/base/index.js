function focus(el) {
  if (el) {
    el.focus();
  }
}
const directives = [
  {
    name: "focus",
    fun: {
      inserted: focus
    }
  }
];
export { directives };
