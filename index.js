(function(){
  function parseConfiguration(){
    return $(".row-line-configure").map(function(_,elem){
      var interval = $(elem).find(".val-interval").first().prop("value");
      var lineDash = $(elem).find(".val-lineDash").first().prop("value");
      var writeText = $(elem).find(".val-writeText").first().prop("checked");
      return {interval:parseInt(interval),
        lineDash:parseInt(lineDash),
        writeText:writeText};
    }).toArray();
  }

  function generate(){
    var conf = parseConfiguration();
    var canvasContainer = $("#canvas-container");
    var pg = new Phogen(conf);

    var renderedCanvas = pg.render(400,300);

    canvasContainer.empty();
    canvasContainer.append(renderedCanvas);
  }

  $("#generate-btn").click(function(){
    generate();
  });


})();
