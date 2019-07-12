let result = `/* 
 * 面试官你好，我是later
 * 只用文字作做我介绍太单调了
 * 我就用代码来介绍吧
 * 首先准备一些样式
 */

/* 首先给所有元素加上过渡效果 */
* {
  transition: all .3s;
}

/* 白色背景太单调了，我们来点背景 */
html {
  background: #272a32;
  color: #fff; 
}

/* 我需要一点代码高亮 */
.token.selector { 
  color: #f35656; 
}
.token.property { 
  color: #f0da5e; 
}
.token.comment {
  color: #cccccc;
}

/* 文字离边框太近了 */
#code {
  padding: 1em;
  border: 1px solid #aaa;
  margin: 0.5em;
  overflow: auto;
  width: 45vw; 
  height: 90vh;
}

/* 加点 3D 效果呗 */
html {
  perspective: 1000px;
}
.styleEditor {
  position: fixed; 
  left: 0; 
  top: 0;
  transition: none;
  transform: rotateY(10deg) translateZ(-100px) ;
}

`
let result2 = `/* 
 * 接下来正式开始 
 * 我给自己准备一个编辑器
 */
#paper {
  position: fixed;
  right: 0;
  top: 0;
  width: 48vw;
  height: 90vh;
  background: white;
  padding: 1em;
  margin: 0.5em;
  color: #222;
  overflow: auto;
}
/* 好了，我开始写简历了 */



`
let result3 = `/* 
 * 这个简历好像差点什么
 * 对了，这是 Markdown 格式的，我需要变成对 HR 更友好的格式
 * 简单，用开源工具翻译成 HTML 就行了
 */


`
let result4 = `/* 再对 HTML 加点样式 */
#paper {
  padding: 2em;
}
#paper h2 {
  display: inline-block;
  border-bottom: 1px solid;
  margin: 1em 0 .5em;
}
#paper ul,#paper ol {
  list-style: none;
}
#paper ul> li::before {
  content: '•';
  margin-right: .5em;
}
#paper ol {
  counter-reset: section;
}
#paper ol li::before {
  counter-increment: section;
  content: counter(section) ". ";
  margin-right: .5em;
}
/*
 * 这就是我的会动的简历
 * 谢谢观看
 */
`
let md = `
## 自我介绍
我叫 later，1995 年 4 月出生，XXX 学校毕业，自学前端半年希望应聘前端开发岗位


## 技能介绍
- 熟悉 JavaScript 
- 熟悉HTML/CSS
- 熟悉vue.js


## 项目介绍
1. xxx 项目
2. yyy 项目
3. zzz 项目


## 联系方式
- QQ: xxxxxxxx
- Email: xxxxxxxx
- 手机: xxxxxxx
`

writeCode('', result, () => {
  createPaper(() => {
    writeCode(result, result2, () => {
      writeMarkdown(md, () => {
        writeCode(result + result2, result3, () => {
          convertMarkdownToHtml(() => {
            writeCode(result + result2 + result3, result4)
          })
        })
      })
    })
  })
})

function writeCode(prefix, code, fn) {
  let domCode = document.querySelector('#code')
  let n = 0
  let timer = setInterval(() => {
    n += 1
    domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css, 'css')
    styleTag.innerHTML = prefix + code.substring(0, n)
    domCode.scrollTop = domCode.scrollHeight
    if (n >= code.length) {
      window.clearInterval(timer)
      fn.call()
    }
  }, 80)
}

function createPaper(fn) {
  let paper = document.createElement('pre')
  paper.id = 'paper'
  document.body.appendChild(paper)
  fn.call()
}

function writeMarkdown(markdown, fn) {
  let domPaper = document.querySelector('#paper')
  let n = 0
  let timer = setInterval(() => {
    n += 1
    domPaper.innerHTML = markdown.substring(0, n)
    domPaper.scrollTop = domPaper.scrollHeight
    if (n >= markdown.length) {
      window.clearInterval(timer)
      fn.call()
    }
  }, 80)
}

function convertMarkdownToHtml(fn) {
  let div = document.createElement('div')  
  div.className = 'html markdown-body'
  div.innerHTML = marked(md)
  let markdownContainer = document.querySelector('#paper')
  markdownContainer.replaceWith(div)
  div.id = 'paper'
  fn.call()
}