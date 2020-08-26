// Popovers (Bootstrap)
$(function() {
  $('[data-toggle="tooltip"]').tooltip()
})

$(function() {
  $('[data-toggle="popover"]').popover()
})

// disable mousewheel on an input number field when in focus
// (Prevents an accidental change in input values when scrolling on the page)
$('form').on('focus', 'input[type=number]', function(e) {
  $(this).on('wheel.disableScroll', function(e) {
    e.preventDefault()
  })
})
$('form').on('blur', 'input[type=number]', function(e) {
  $(this).off('wheel.disableScroll')
})
