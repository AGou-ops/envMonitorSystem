(function(){
  $('#msbo').on('click', function(event){
    $('body').toggleClass('msb-x');
    $('#msbo > i').toggleClass('fa-times').toggleClass('fa-bars')
  });
}());