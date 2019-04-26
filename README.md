# douban-taro
基于taro开发的豆瓣热映电影、top250电影列表

## Taro-UI组件库
https://taro-ui.aotu.io/#/

## Taro官方文档
https://nervjs.github.io/taro/


## Nginx 代理本地请求,本地nginx.conf 配置代码

> 注意：在请求中默认使用 https://douban.uieee.com 代理请求，官方的 https://api.douban.com/v2 接口禁止微信小程序访问。但是uieee有请求限制，每个整点自动更新请求次数，代理说明 https://github.com/zce/douban-api-proxy 。Nginx只能本地调试
```
location  /v2/ { 
     proxy_store off;  
     proxy_redirect off;  
     proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;  
     proxy_set_header X-Real-IP $remote_addr;  
     proxy_set_header Referer 'no-referrer-when-downgrade';  
     proxy_set_header User-Agent 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36';  
     proxy_connect_timeout 600;  
     proxy_read_timeout 600;  
     proxy_send_timeout 600;  
     proxy_pass https://api.douban.com/v2/;}

```

## 运行编译命令：

```
//微信小程序：
yarn dev:weapp

//百度小程序：
yarn dev:swan

//支付宝小程序
yarn dev:alipay

//头条小程序
yarn dev:tt

//H5
yarn dev:h5

//React Native
yarn dev:rn

```
