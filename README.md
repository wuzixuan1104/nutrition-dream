#### 參數設定

我們採用官方的設定方式，參考 https://nextjs.org/docs/basic-features/environment-variables

1. .env.development 開發環境
1. .env.production 正式環境

#### tailwindcss

##### 常用模組

```css
/* 1. 常見元件可以定義為一個通用class ，範例  styles/globals.css  */
.btn {
  @apply px-2 py-1 text-sm rounded-sm	bg-gray-200 hover:bg-gray-400;
}

/* 使用就是一般的class
<div className="btn" />

/* 你可以複寫 或 修改
<div className="btn ml-3" />

*/
```

##### 一般使用

你可以直接在 jsx 上使用，除非你很理解你在做什麼，不然建議你把 css 放在一個 xx.css 上，然後利用第一種方式先把主要元件寫好

```html
<div className="py-1 text-sm rounded-sm	bg-gray-200 hover:bg-gray-400" />
```
