import React, { useState } from 'react'
import './prism.css'

import Prism from 'prismjs'
import marked from 'marked'

import './App.css'

marked.setOptions({
  breaks: true,
  highlight: function (code) {
    return Prism.highlight(code, Prism.languages.javascript, 'javascript')
  },
})
const renderer = new marked.Renderer()
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`
}

const defaultText = `# React Markdown Previewer!

## Creating using react
### heading

Code test, \`<div></div>\`

\`\`\`
// this is multi-line code:

function greatings(firstname, lastname) {
  if (firstname = 'Delv' && lastname) {
    console.log(\`Hello, \${firstname}\`)
  }
}
\`\`\`

Links [links](https://www.freecodecamp.org)
> Block Quotes!

You can also make text **bold**... whoa!

1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)

`
function App() {
  const [text, setText] = useState(defaultText)
  return (
    <div className="App">
      <h1 className="heading">Markdown Previewer</h1>
      <div className="content">
        <div className="makrdown">
          <h3>Markdown Text</h3>
          <textarea
            name="markdown"
            id="editor"
            rows="20"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="textarea"
          ></textarea>
        </div>
        <div className="preview">
          <h3>Preview</h3>
          <Preview markdown={text} />
        </div>
      </div>
    </div>
  )
}

function Preview({ markdown }) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: marked(markdown, { renderer: renderer }),
      }}
      id="preview"
    ></div>
  )
}

export default App
