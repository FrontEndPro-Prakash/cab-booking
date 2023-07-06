 function enterNumber(){

  var e = document.getElementById('text');

  if (!/^[0-9]+$/.test(e.value)) 
{ 
e.value = e.value.substring(0,e.value.length-1);
}
}

//calender script

  $( function() {
    $( "#datepicker" ).datepicker();
  } );
  
  $( function() {
    $( "#datepicker-to" ).datepicker();
  } );
  
//calender script end

//sidebar script

$(".sbarmenushow").click(function(){
	$(".sidebar-main").toggleClass("show-sidebar");
});
$(".sbar-close").click(function(){
	$(".sidebar-main").removeClass("show-sidebar");
});

//sidebar script end




//show more script start
$('.adhoc-approval .list_view').hide().filter('.adhoc-approval .list_view:lt(2)').show();
$('.adhoc-approval').find('.cab-info-second').click(function(){
    $(this).siblings('.adhoc-approval .list_view:gt(1)').toggle();
});
//show more script end