<template>
  <div class="todo">
    <header id="header">
      To Do List
    </header>
    <main id="main">
      <div class="one">
        <div class="oneText">
          <!--      @keyup.enter为回车事件-->
          <input type="text" placeholder="敲回车或点击右侧+号 添加待办" v-model="state.value" 
              @keyup.enter="add"/>
          <button type="button" @click="add">+</button>
        </div>
        <div class="list-img list-img-theme">
          <img class="theme" src="../assets/svg/night.svg" v-show="$store.state.theme==='DayTheme'" 
              @click="ThemeSwitch" width="25"/>
          <img class="theme" src="../assets/svg/太阳.svg" v-show="$store.state.theme==='NightTheme'"
              @click="ThemeSwitch" width="30"/>
        </div>
        <div class="oneText">
          共有
          <span style="font-size: 20px;color: rgb(0, 153, 255)">{{ state.lists.length }}</span>
          个任务，其中
          <span style="font-size: 20px;color: #e5083f">{{ $store.state.finish }}</span>个任务已完成
        </div>

      </div>

      <div class="two">
        <div class="list">
          <div class="title"><h3>待办</h3></div>
          <ul>
            <transition-group name="flip-list" tag="ul">
              <!-- v-bind:class 可以简写为 :class。
              v-bind用来绑定动态的属性，
              v-bind:key 简写成 :key -->
              <!-- 给每个v-for里的绑定不同的key：list字符串+index索引 -->
            <template v-for="(item,index) in state.lists" :key="'lists-'+index">
              <li v-if="!item.checked">
                <div class="li-content">
                  <div style="display: flex;align-items: center;max-width: 85%">
                    <input class="checkbox" type="checkbox" :id="'checkboxInput'+index" 
                        v-model="item.checked" @click="isChecked(index)">
                    <!-- v-model 指令用来在 input、select、textarea、checkbox、radio 
                    等表单控件元素上创建双向数据绑定，根据表单上的值，自动更新绑定的元素的值。 -->
                    <!-- 点击修改 -->
                    <label class="checkboxLable" :for="'checkboxInput'+index"></label>
                    <label v-if="!item.isEdit" @click="showEdit(item,index)"
                           style="max-width: 85%;word-break: break-all;">
                      {{ item.name }}
                    </label>
                    <label v-else>
                      <!--       回车或者输入框失去焦点时触发事件
                          1. Textarea是个H5的新标签 对象代表 HTML 表单中的一个文本域 (textarea)。
                              HTML 表单的每一个 <textarea> 标签，都能创建一个Textarea 对象。 
                          2. antofocus：属性用于设置或返回页面加载时 textarea 文本框是否应自动获得焦点。
                          3. @blur元素失去焦点时所触发的事件 -->
                      <textarea v-model="state.editValue" rows="4"
                                @keyup.enter="editInput(item)" @blur="editInput(item)" autofocus="autofocus"
                      ></textarea>
                    </label>
                  </div>

                  <button type="button" class="close" @click="Close(index)">
                    <span>&times;</span>
                    <!-- 就把&times当成x的图标吧！！ -->
                  </button>
                </div>
              </li>
            </template>
            <!-- 如果长度为0,就显示图片 -->
            <div v-if="$store.state.lists.filter((item)=>item.checked === false).length===0" class="SvgTips">
              <img src="../assets/svg/我的学习.svg" width="250"/>
              <div>
                快去添加新的待办吧！
              </div>

            </div>
            </transition-group>
          </ul>
        </div>
        <!-- 中间那张vs -->
        <div class="list-img">
          <img class="vs" src="../assets/svg/vs.svg" width="100"/>
        </div>

        <!-- 右侧,已办这边 -->
        <div class="list">

          <div class="title"><h3>已办</h3></div>
          <ul>
            <transition-group name="flip-list" tag="ul">
            <template v-for="(item,index) in state.lists" :key="'finish-'+index">
              <li v-if="item.checked">
                <div class="li-content">
                  <div style="display: flex;align-items: center;max-width: 85%">
                    <input class="checkbox" type="checkbox" v-model="item.checked" :id="'checkboxInput1'+index"
                           @click="isChecked(index)">
                    <label class="checkboxLable" :for="'checkboxInput1'+index"></label>
                    <!-- word-break：在合适的点换行，break-all : 允许在单词内换行，也允许非亚洲语言文本行的任意字内断开 -->
                    <label style="max-width: 85%;word-break: break-all;"> {{ item.name }}</label>
                  </div>

                  <button type="button" class="close" @click="Close(index)">
                    <!-- v-on缩写
                     v-on:click="doSomething"缩写成 
                     @click="doSomething" -->
                    <span>&times;</span>
                  </button>
                </div>
              </li>

            </template>
            <div v-if="$store.state.finish===0" class="SvgTips">
              <img src="../assets/svg/学习.svg" width="250"/>
              <div>
                还没有完成的任务哦
              </div>
            </div>
            </transition-group>
          </ul>
        </div>
      </div>
    </main>
    <footer id="footer">
      <!-- <span>author@<a href="http://ailjx.gitee.io/" target="_blank">ailj</a></span> -->
      <!-- <soan><a href="https://v3.cn.vuejs.org/" target="_blank">vue3</a>+<a href="https://vitejs.cn/" target="_blank">vite</a> -->
      <!-- </soan> -->
      <!-- <span><a href="https://gitee.com/ailjx/todolist" target="_blank">Source code</a> -->
        <!-- </span> -->
    </footer>
  </div>
</template>
<script setup>
import {reactive, computed} from 'vue'
import {useStore} from "vuex"

const store = useStore()
let editIndex = 0;
// 增加待办
const add = () => {
  // trim()去除前后空格
  if (state.value.trim() === '') {
    alert("不可输入空内容!")
    state.value = ''
    return
  }
  store.commit('add', state.value)
  // stroe.commit()传值给vuex的mutation改变state，commit是同步操作
  state.value = ''
};


// 删除待办
const Close = (index) => {
  if (confirm("确定要删除吗？")) {
    store.commit('Close', index)
  }
}

// 修改待办状态
const isChecked = (index) => {
  store.commit('isChecked', index)
}

// 出现修改待办框
const showEdit = (item, index) => {
  if (!state.isEdit) { // 如果该条待办没修改过
    // isEdit是否修改过，
    state.isEdit = true
    editIndex = index
    item.isEdit = true
    state.editValue = item.name
  }
};

/*   store里的修改待办
editInput(state, val) {
  state.lists[val[0]] = {
    name: val[1],
    checked: false,
    isEdit: false
  }
}
*/

// 修改待办
const editInput = (item) => {
  if (item.name !== state.editValue) {
    if (confirm("确定要修改吗？")) {
      store.commit('editInput', [editIndex, state.editValue])
    } else {
      // 如果不确认修改，就存储原来item的数据，
      // 如果确认修改，就存储新输入的state的value，也就是editValue
      store.commit('editInput', [editIndex, item.name])
    }
  } else {
    // 如果等于，就相当于，虽然修改了待办，但是没有修改它的实际内容
    store.commit('editInput', [editIndex, item.name])
  }
  state.isEdit = false
}


const ThemeSwitch = () => {
  if (document.body.className === 'DayTheme') {
    document.body.className = 'NightTheme'
  } else {
    document.body.className = 'DayTheme'
  }
  store.commit('ThemeSwitch', document.body.className)
}
// 每个方法写完都要和store里存储的数据进行commit，


// ref函数和reactive函数都是用来定义响应式数据；
// reactive的响应式是更深层次的，只能 给对象添加响应式，
// ref给值类型(String，Number，Boolean，Symbol)添加响应式
const state = reactive({
  isEdit: false,
  value: '',
  editValue: '',
  lists: computed(() => store.state.lists),
  theme: computed(() => store.state.theme)
  // 对state.lists和theme使用监听computed
});


// 网页所有元素的class，都添加一个theme，
document.body.className = state.theme;
</script>

<style lang="less" scoped>
@import "../assets/css/Day.css";

@body-bg: var(--body_bg);
@shadowOne: var(--shadowOne);
@shadowTwo: var(--shadowTwo);
@input_focus: var(--input_focus);
@font_color: var(--font_color);
.todo {
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

#main {
  width: 100%;
  margin: 0px auto;
  padding-bottom: 100px;
  padding-top: 50px;

  .one, .two {
    display: flex;
    justify-content: center;
    align-items: center;

    /*
    flex-wrap 属性规定flex容器是单行或者多行，
    同时横轴的方向决定了新行堆叠的方向
    wrap: 规定灵活的项目在必要的时候拆行或拆列。
    */
    flex-wrap: wrap;

  }

  .list-img {
    // 弹性盒子的初始长度
    flex-basis: 200px;
    text-align: center;

    img {
      // cursor属性定义了鼠标指针放在一个元素边界范围内时所用的光标形状
      cursor: pointer;
      transition: 1s;
    }

    // 这是黑白主题切换，太阳月亮那里，hover上就有一个放缩
    .theme:hover {
      transform: rotate(360deg);
    }

    .vs:hover {
      transform: rotate(30deg) scale(1.2);
    }
  }

  .one {
    margin-top: 40px;

    div {
      width: 400px;
      text-align: center;
    }

    .oneText {

      position: relative;
      height: 40px;
      padding: 0;
      border-radius: 47px;
      background: inherit;
      box-shadow: inset 9px 9px 10px @shadowOne,
        inset -9px -9px 10px @shadowTwo;
      display: flex;
      align-items: center;
      justify-content: center;

      input {
        background-color: inherit;
        border: none;
        height: 100%;
        box-sizing: border-box;
        width: 100%;
        padding: 0 0 0 20px;
        outline: none;
        transition: 0.5s;
        border-radius: 47px;
        color: @font_color;
      }

      input:focus {
        // 输入框输入内容时,颜色发生变化
        background-color: @input_focus;
      }

      button {
        position: absolute;
        border: none;
        cursor: pointer;
        font-size: 25px;
        border-radius: 50%;
        top: 0;
        background-color: initial;
        width: 40px;
        height: 40px;
        right: 0;
        transition: 0.5s;
        color: @font_color;

        &:hover {
          transform: rotate(180deg);
          font-size: 30px;
        }
      }


    }
  }

.flip-list-move {  
  transition: transform 0.8s ease;
}
.flip-list-enter-active,.flip-list-leave-active {  
  transition: all 1s ease;
}
.flip-list-enter-from,.flip-list-leave-to {  
  opacity: 0;  
  transform: translateX(30px);
}
  .two {
    .list {
      align-self: center;
      width: 400px;
      height: 400px;
      margin-top: 40px;
      margin-bottom: 40px;
      border-radius: 30px;
      padding: 0 10px 10px 10px;
      box-sizing: border-box;
      overflow: hidden;
      background: inherit;
      box-shadow: inset -10px -10px 29px @shadowOne,
      inset 10px 10px 29px @shadowTwo;

      .title {
        text-align: center;
      }

      ul {
        max-width: 100%;
        margin: 0 auto;
        overflow-y: scroll;
        height: 85%;
        padding: 0;

        li {
          list-style-type: none;

          .li-content {
            min-height: 40px;
            padding-bottom: 5px;
            margin-bottom: 5px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px dashed @shadowOne;

            .checkbox {
              display: none;
            }

            .checkboxLable {
              display: inline-block;
              width: 20px;
              height: 20px;
              line-height: 20px;
              cursor: pointer;
              margin-right: 10px;
              border-radius: 50%;
              border: 1px solid @font_color; /*改变复选框的边框颜色也可以不要边框*/
            }

            /* checked 预先选定复选框或单选按钮。*/

            .checkbox:checked + .checkboxLable:before { /*before为伪元素可以在元素之后添加内容*/
              display: block;
              /*	css3中的content字符编码*/
              content: "\2665";
              /*	复选框里面的&radic;居中*/
              text-align: center;
              /*	复选框里面的&radic;大小*/
              font-size: 20px;
              /*	字体的颜色*/
              color: red;
            }

            .checkbox:checked:hover + .checkboxLable:before {
              animation: checkboxLable 0.7s linear infinite alternate;
              // 这块动画还得查一下
            }

            @keyframes checkboxLable {
              from {
                transform: scale(1);
              }
              to {
                transform: scale(1.5);
              }
            }

            textarea {
              background-color: inherit;
              color: @font_color;
              width: 315px;
              font-size: 16px;
            }

            .close {
              border: none;
              background-color: inherit;
              cursor: pointer;
              font-size: 20px;
              transition: 0.5s;
              color: @font_color;
            }

            .close:hover {
              font-size: 25px;
              transform: rotate(180deg);
            }
          }

        }

        .SvgTips {
          text-align: center;
        }
      }

      ul::-webkit-scrollbar {
        display: none;
      }
    }
  }
}

#footer {
  // font: italic 1em Georgia, serif;
  // line-height: 1.5em;
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

// 这里应该是移动端适配，我在哪里学过呢？？？？？？？
@media screen and (max-width: 1111px) {
  #main {
    .list-img {
      flex-basis: 150px;
    }
  }
}

@media screen and (max-width: 1000px) {
  #main {
    .oneText {
      margin-bottom: 20px;
      height: 50px !important;

      button {
        width: 50px !important;
        height: 50px !important;
        font-size: 30px !important;

        &:hover {
          font-size: 40px !important;
        }
      }
    }
    .list-img {
      flex-basis: 100%;
    }
    .list-img-theme {
      margin-bottom: 25px;
      order: -1;
    }
  }
}

@media screen and (max-width: 600px) {
  #main {
    width: 90%;
  }
}
</style>
