function selectText(node) {
  var selection = window.getSelection()
  var range = document.createRange()
  range.selectNodeContents(node)
  selection.removeAllRanges()
  selection.addRange(range)
  return selection
}

function addCopyButton(containerEl) {
  let copyBtn = document.createElement('div')
  copyBtn.className = 'help'
  copyBtn.textContent = 'Click to Copy'

  let lastEl = containerEl.querySelector('code')
  containerEl.appendChild(copyBtn, lastEl)

  copyBtn.addEventListener('click', function(el) {
    const target = el.target
    let highlight = el.target.parentElement.querySelector('code')
    let text = selectText(highlight)
    document.execCommand('copy')
    text.removeAllRanges()
    el.target.innerText = 'Copied to Clipboard'

    setTimeout(() => {
      target.innerText = 'Click to Copy'
    }, 6000)
  })
}

function renderArchiveNotice() {
  const body = document.querySelector('#body-inner')

  const warning = `This version of the Cloudflare Workers documentation is deprecated. Visit <a href="https://developers.cloudflare.com/workers" style="font-weight:200; color:currentColor; text-decoration: underline;">the new documentation</a>.`

  const container = document.createElement('div')
  container.className = 'notices info'
  container.style = 'margin: 0; max-width: inherit;'

  container.innerHTML = warning
  body.prepend(container)
}

window.addEventListener('DOMContentLoaded', event => {
  if (window.location.pathname.includes('/workers/archive')) {
    renderArchiveNotice()
  }

  let highlightBlocks = document.querySelectorAll('.copy')
  Array.from(highlightBlocks).forEach(element => {
    addCopyButton(element)
  })
})
