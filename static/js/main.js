$(document).ready(function() {
  var squares = $('.square');
  var player = {
    turn: true,
    token: 'X'
  };

  squares.click(function(){
    var $this = $(this);
    if ($this.text() !== '&nbsp;')
    {
      $this.text('X');
    }
  })
});