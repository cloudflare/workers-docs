window.addEventListener('DOMContentLoaded', event => {
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