# 利用Vue框架

一个开发Todolisi

要求
可以做到每天的日程增删改查，与统计。可以按照日历的方式查看其他日期的todolist
附加功能
可以尝试将echarts集成进来。做个每天任务量的趋势图。

首先在全局空间安装Vue cli

```
npm install -g vue-cli
```

再文件夹输入

```
npm vue create
```

 在当前文件夹配置环境
可以cd进入文件夹再利用

```
npm run sever 
```

启动项目
这样就可以利用组件化进行编程
先对项目进行分析拆分成四个组件
最后再利用App.vue 包含所有子组件存储再src文件夹中
其余组件保存在components文件夹中

![image-20210713195827413](C:\Users\HP\AppData\Roaming\Typora\typora-user-images\image-20210713195827413.png)

一开始在index中上面有个一search组件

下面包括一整个todolist栏

todolist中包含item子组件

Mainfooter是页面底部

今天对整个的结构进行了构建，明天对增加删改和交互做一个处理，并且对echarts函数库进行了解



------



今天添加了功能项添加了 增 删 功能

复习了父子组件通信Props和复习了一些基础的API

了解了用 GIT托管代码并将项目上传至Gitee



在git bash here 中 先初始化git

`git init`

可以通过git中的status来查看代码的上传情况

`git status`

然后 利用add 添加托管代码文件

`git add . //添加所有代码`

`git commit -m <message>//来对版本进行说明`

`git log //查看版本`

利用

`git remote add orgin (git地址) //进行连接远程仓库`

最后利用push进行上传

`git push  orgin master//上传至master分支`

------

在git学习当中的最后一步遇到一个问题关于push的时候的一个Error

# error: failed to push some refs to 'xxxx'

经过了很久的翻阅文档发现是因为在远程仓库有一个README.md文件但本地没有导致

解决方案:

`git pull --rebase origin master`从远程仓库克隆一份README.md文件

再利用push去提交

解决了问题



