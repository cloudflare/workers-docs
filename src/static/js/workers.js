function selectText(node) {
  var selection = window.getSelection()
  var range = document.createRange()
  range.selectNodeContents(node)
  selection.removeAllRanges()
  selection.addRange(range)
  return selection
}

function addCopyText(containerEl) {
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
function addCopySquare(containerEl) {
  let elToCopy = containerEl.querySelector('.copy')
  let copyBtn = containerEl.querySelector('.copy-trigger')
  copyBtn.addEventListener('click', function(el) {
    const target = el.target
    let highlight = el.target.parentElement.querySelector('.copy')
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

  let highlightBlocks = document.querySelectorAll('.copy-group')
  Array.from(highlightBlocks).forEach(element => {
    // if path is a template page, it will have 1 or more matches after templates/
    if (window.location.pathname.match('/workers/templates/+.')) {
      addCopySquare(element)
    } else {
      addCopyText(element)
    }
  })
})
