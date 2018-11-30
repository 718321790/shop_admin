# Vue 项目说明文件

## 接口文档地址

- [接口文档地址](https://shop-api.circle.ink/#1)

## 服务器接口的准备

- 1 开启 phpStudy ，目的是为：开启MySql数据的服务
- 2 在 接口文件夹（shop-api）中输入命令： `npm start` 启动接口服务

## 创建项目

- 说明：通过 `vue-cli` 脚手架，来快速初始化一个项目
- 1 在终端中运行命令：`vue init webpack shop_admin_27`

## 运行项目

- 1 进入项目根目录： `cd shop_admin_27`
- 2 运行项目： `npm run dev`
- 3 自己手动打开浏览器

## 如何开启一个功能

- 说明：我们只需要操作 `src` 目录中的内容，其他的文件夹别动！！！

## 在项目中使用路由

- 1 安装： `npm i vue-router`
- 2 在项目 main.js 中配置路由规则即可

## VueCli中的一些说明

- `@` 符号：表示 `src` 目录的绝对路径，在导入组件时直接使用 `@/components` 路径
- 使用 CommonJS 中的 `const Home = require('./components/home/Home').default` 方式导入组件，需要指定 default

## 抽离路由模块

- 说明：路由应该是一个独立的模块，而不应该将所有的路由配置都放在入口中，这样会导致路由变的很混乱，所以，需要将 路由处理为一个独立的模块
- 因为基于 webpack ，是一个模块化的开发环境，因此，每个JS文件都是一个独立的模块，模块中用到了什么内容，就应该手动导入这个内容（比如：Vue）

## ElementUI 组件库的使用

- ElementUI 是 饿了吗 公司出品

### 使用步骤

- 1 安装：`npm i element-ui`
- 2 在 main.js 中导入并安装ElementUI插件：

```js
// 导入 element-ui
import ElementUI from 'element-ui'
// 导入样式
import 'element-ui/lib/theme-chalk/index.css'
// 安装 ElementUI插件
Vue.use(ElementUI)
```

- 3 使用 ElementUI 提供的组件：

```html
<!-- 在 Home.vue 中使用组件： -->
<el-button type="success">成功按钮</el-button>
```

## 项目中如何使用 ElementUI 实现一个功能

- [ElementUI 文档](http://element-cn.eleme.io/#/zh-CN)
- 1 从 element-ui 文档中，找到你要使用的组件
- 2 从该组件的文档中，找到一个符合你要实现功能的组件（比如：带有表达验证的form组件）
- 3 拷贝组件提供的示例代码（显示代码看到的），到我们自己的组件中，先可以在自己的组件，让elementui的组件跑起来
- 4 再根据文档和开发经验，分析 `template` 结构，分析 `js` 代码逻辑
- 5 将其修改为适合你项目的功能

### 如何分析 template 和 js代码

- 1 拿到你要使用的组件，分析每个组件中的属性，如果这个属性看不懂，就到组件文档最底部查找文档说明
- 2 如果文档没有表述清楚，就根据当前 代码配合模块 ，去分析其功能

### 登录功能完成

- 该模块中用到的组件：`Form表单` 、`Message 消息提示`
- 1 安装：`npm i axios`
- 2 在 Login.vue 中导入axios
- 3 调用 axios.post 完成登录操作

## 编程式导航

- 说明：通过 JS 代码实现路由跳转

```js
// 作用：跳转到 /home 这个路由对应的组件中
this.$router.push('/home')
```

## 访问限制

- 说明：没有登录的时候，不应该进入 后台首页（/home）；只有登录后，才能够访问后台首页
- 因此，我们需要给项目添加 访问限制

### 两个问题

- 1 如何知道有没有登录成功？
  - 登录成功后，服务器返回了一个 `token`，这个 `token` 是一个身份标识，表示：登录成功
  - 这个 token 类似于 sessionId
  - 应该如何处理 token？ 将token存储到localStroage中，这样就可以在任意地方获取到token了
  - *结论：判断localStorage中有没有token值，如果有就表示登录了；如果没有就表示没有登录*

- 2 如何做到访问限制？思路如下：
  - 1 访问每个页面（除了登录页）之前，都从 localStorage 中获取token
  - 2 如果有token，就允许访问这个路由（“页面”）
  - 3 如果没有token，就跳转到登录页面，让用户登录
  - `说明：访问限制只针对于 非登录页面`

- 问题：访问限制的代码逻辑应该在哪写？？？
  - 经过分析发现，项目中有很多个页面，而除了登录页面之外，所以其他页面都需要进行访问限制的判断，因此，这个 访问限制 的代码，应该写在一个公共的地方，这样，就可以对所有的页面，进行访问控制的判断了
  - 应该使用 **导航守卫** 来进行访问控制

## 在 vue-cli 生产的项目中使用less

- 说明：脚手架中已经配置好了所有的 预编译CSS 配置
- 只需要安装对应的 loader 包，比如要使用 less ，只需要安装：`npm i -D less less-loader`
- 在组件的 `style` 标签上，添加 `lang="less"`
