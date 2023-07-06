# wanandroid_uni_app

**项目预览**

| ![][uni-az-1] | ![][uni-az-2] | ![][uni-az-3] | ![][uni-az-4] |
| ------------- | ------------- | ------------- | ------------- |
| ![][uni-az-5] | ![][uni-az-6] | ![][uni-az-7] | ![][uni-az-8] |
| ![][uni-az-9] | ![][uni-az-10]|               |               |

## 一 开发环境

* Windows 11 专业版
* HBuilder X 3.8.4.20230531
* Vue 2.x

## 二 组件及API

### 2.1 API

玩Android 开放API：https://wanandroid.com/blog/show/2

### 2.2 组件及依赖

* uni-ui ：https://ext.dcloud.net.cn/plugin?id=55
* hello-uniapp 示例工程：https://ext.dcloud.net.cn/plugin?id=4941

### 2.3 参考项目

* https://github.com/zizikoth/UniApp_WanAndroid

## 三 网络访问问题(接口API)

### 3.1 跨域问题

* 使用插件：Allow CORS:Access-Control-Allow-Origin(安装后点击On)，但是访问自动缓存cookie时会有问题
* 在manifest.josn文件中的源码视图中配置devServer代理，接口访问及cookie缓存都可以解决

### 3.2 cookie问题

* 小程序端不支持自动保持 cookie，通过登录接口保存cookie的方法不可取
* 使用第三方网络工具：luch-request设置自动保存cookie

### 3.3 网络访问工具变更

* 之前：uni-request
* 现在：luch-request


## 四 版本

### v1.0

* 项目框架+[底部tabBar][1]
* 添加uni-ui依赖

## v2.0

* 首页-轮播图
* 首页-文章列表
* 点击-轮播图/文章列表，跳转倒webview显示详情
* 上拉刷新、下拉加载更多文章列表

### v3.0 

* 体系
* 使用了uni-group和uni-tag

### v4.0

* 项目
* scroll-view切换tab标签，点击标签显示文章列表

### v5.0

* 消息-选项卡
* 我的
* 登录、注册页面

### v6.0

* 消息

## 五 项目实现

### 5.1 已完成接口

* login：登录
* register：注册
* homeBanner：首页轮播图
* homeArticles：首页文章列表
* getProjectTree：项目
* getSystemAndNaviTree：导航
* getCoinInfo：用户信息
* getMessageRead：已读消息
* getMessageUnRead：未读消息

### 5.2 未完成





[1]:https://uniapp.dcloud.net.cn/collocation/pages.html#tips-tabbar

<!--uni-app-wanandroid-->

[uni-az-1]:https://cdn.staticaly.com/gh/PGzxc/CDN/master/blog-resume/uni-az-home-1.png
[uni-az-2]:https://cdn.staticaly.com/gh/PGzxc/CDN/master/blog-resume/uni-az-navigator-2.png
[uni-az-3]:https://cdn.staticaly.com/gh/PGzxc/CDN/master/blog-resume/uni-az-project-3.png
[uni-az-4]:https://cdn.staticaly.com/gh/PGzxc/CDN/master/blog-resume/uni-az-article-web-4.png
[uni-az-5]:https://cdn.staticaly.com/gh/PGzxc/CDN/master/blog-resume/uni-az-mine-login-no-5.png
[uni-az-6]:https://cdn.staticaly.com/gh/PGzxc/CDN/master/blog-resume/uni-az-mine-login-yes-6.png
[uni-az-7]:https://cdn.staticaly.com/gh/PGzxc/CDN/master/blog-resume/uni-az-user-login-7.png
[uni-az-8]:https://cdn.staticaly.com/gh/PGzxc/CDN/master/blog-resume/uni-az-user-register-8.png
[uni-az-9]:https://cdn.staticaly.com/gh/PGzxc/CDN/master/blog-resume/uni-az-msg-read-9.png
[uni-az-10]:https://cdn.staticaly.com/gh/PGzxc/CDN/master/blog-resume/uni-az-msg-unread-10.png