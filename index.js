(function(){
  function generate(){
    var canvasContainer = $("#canvas-container");
    var pg = new Phogen([
        {interval:10,lineDash:2,writeText:false},
        {interval:100,lineDash:1,writeText:true} ]);

    var renderedCanvas = pg.render(400,300);
    canvasContainer.append(renderedCanvas);
  }

  $("#generate-btn").click(function(){
    generate();
  });


})();
