[comment]: <> (# Vue 3 + Vite)

[comment]: <> (This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs]&#40;https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup&#41; to learn more.)

[comment]: <> (## Recommended IDE Setup)

[comment]: <> (- [VSCode]&#40;https://code.visualstudio.com/&#41; + [Volar]&#40;https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar&#41;)

# 使用[vite](https://vitejs.cn/) +[vue3](https://v3.cn.vuejs.org/) 编写的一个ToDoList
UI采用拟物风格，使用CSS工具[Neumorphism.io](https://neumorphism.io/#e0e0e0) 进行实现。

图标以及SVG图像取自[iconfont(阿里图标库)](https://www.iconfont.cn/)


## 现有功能
- 增加/编辑/删除/修改待办
- 数据暂存（利用vuex：createPersistedState插件实现数据的可持续化）
- 主题切换
- 移动端适配
- 列表动画

# 持久化数据存储：
使用vuex持久化存储插件vuex-persistedstate对数据进行本地的持久化存储，防止数据刷新丢失。
# 列表动画：
vue3提供动画的封装，在v-for渲染列表的场景下，使用transition-group组件包裹元素，使得在添加和删除待办时实现过渡的动画效果，增加用户体验的舒适度。
