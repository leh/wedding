$(function() {
  $("ul.nav li").on("click", function(event){
    $("ul.nav li").removeClass("active");
    $(this).addClass("active");
  });

  var windowHeight = $(window).height();
  $("section").css("min-height", windowHeight + 100 + "px");
  $("body").attr("data-offset", windowHeight);
});
