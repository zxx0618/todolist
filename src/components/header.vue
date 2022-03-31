<template>
  <div class="todo">
    <header id="header">
      To Do List
    </header>
    <footer id="footer">
      <span>author@<a href="http://ailjx.gitee.io/" target="_blank">ailj</a></span>
      <soan><a href="https://v3.cn.vuejs.org/" target="_blank">vue3</a>+<a href="https://vitejs.cn/" target="_blank">vite</a>
      </soan>
      <span><a href="https://gitee.com/ailjx/todolist" target="_blank">Source code</a>
        </span>
    </footer>
  </div>
</template>
<script setup>
</script>

<style lang="less" scoped>
@import "../assets/css/Day.css";

@body-bg: var(--body_bg);
@shadowOne: var(--shadowOne);
@shadowTwo: var(--shadowTwo);
@input_focus: var(--input_focus);
@font_color: var(--font_color);
@media screen and (max-width: 600px) {
  .todo {
    width: 90%;
  }

}
.todo {
  width: 100%;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  position: relative;
  background-color: @body-bg;
  color: @font_color;
  transition: color 1s;
}

#header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  border-radius: 0 0 50% 50%;
  font: italic 2em Georgia, serif;
  font-weight: 300;
  box-shadow: 9px 9px 10px @shadowOne,
    -9px -9px 10px @shadowTwo;
  position: absolute;
  top: 0;
  z-index: 999;
  animation: header 3s cubic-bezier(.61, .27, .33, .99) forwards;
  background-color: inherit;
}

@keyframes header {
  0% {
    height: 100vh;
  }
  50% {
    height: 50vh;
  }
  100% {
    height: 50px;
  }
}
#footer {
  font: italic 1em Georgia, serif;
  line-height: 1.5em;
  position: absolute;
  bottom: 0;
  display: flex;
  height: 100vh;
  border-radius: 50% 50% 0 0;
  justify-content: center;
  align-items: center;
  border-top: 1px solid @shadowOne;
  background-color: inherit;
  flex-direction: column;
  width: 100%;
  animation: footer 3s cubic-bezier(.61, .27, .33, .99) forwards;
}

@keyframes footer {
  0% {
    height: 100vh;
  }
  50% {
    height: 50vh;
  }
  100% {
    height: 80px;
  }
}
</style>
