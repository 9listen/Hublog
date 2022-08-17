<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
*::-webkit-scrollbar {
  width: 7px;
  height: 7px;
  background-color: #fff;
}
*::-webkit-scrollbar-thumb {
  background-color: #e1e1e1;
  border-radius: 5px;
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
em {
  font-style: normal;
}
a {
  text-decoration: none;
  color: #333;
}
img {
  border: none;
  vertical-align: top;
}
table {
  border-collapse: collapse;
}
input,
textarea {
  outline: none;
}
textarea {
  resize: none;
  overflow: auto;
}
body {
  font-size: 12px;
  font-family: arial;
}
</style>
