# direct_search

> 通过简单的命令直接到达搜索结果页面的工具。原理很简单，识别输入参数，调用对应的搜索引擎。

## 开发

```
npm run dev
```

## 构建

```
npm run build
```

## 使用方法

```javascript
搜索引擎/全称 搜索

// e.g.
go 前端框架  // 新开标签，使用谷歌搜索 前端框架


// 已支持的搜索引擎(详见帮助dialog)

baidu            b | ba
google           go
being            be
github           gi
stackoverflow    st
npm              n
juejin           j | jue
zhihu            z | zhi
csdn             c | cs
segmentfault     se | sf
```

## Features

- 支持主流搜索引擎
- 适配深色模式。支持根据环境自动切换。手动切换，将缓存设置结果。

体验地址： ([搜索直达](https://ciro.club/search/))
