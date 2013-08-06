$(function() {
  $("ul.nav li").on("click", function(event){
    $("ul.nav li").removeClass("active");
    $(this).addClass("active");
  });

  // Remove the menu and min-height on smaller disp
  var windowWidth = $(window).width();
  if (windowWidth <= 995) {
    $(".navbar").remove();
    $("section").css("min-height", 0).css("padding-top", 0).css("padding-bottom", "60px");
  } else {
    var windowHeight = $(window).height();
    $("section").css("min-height", windowHeight + 100 + "px");
    $("body").attr("data-offset", windowHeight);
  }
});
