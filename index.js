(function(){
  insertSeedLineConfiguration();
  $("#generate-btn").click(function(){
    generate();
  });

  function generate(){
    var canvasConf = parseCanvasConfiguration();
    var lineConf = parseLineConfiguration();
    var pg = new Phogen(lineConf);

    var renderedCanvas = pg.render(canvasConf.width, canvasConf.height);

    var pngDataUrl = renderedCanvas.toDataURL();
    window.open(pngDataUrl);
  }

  function insertSeedLineConfiguration(){
    var seedLines = [{interval:10, lineDash:2, writeText:false},
                     {interval:100, lineDash:1, writeText:true}];
    var rows = seedLines.map(function(line){
      var row = $("<tr>", {class:"row-line-configure"});
      row.append(
          $("<td>").append($("<input>",
              {type:"text", class:"val-interval", value:line.interval}))
          );
      row.append(
          $("<td>").append($("<input>",
              {type:"text", class:"val-lineDash", value:line.lineDash}))
          );
      row.append(
          $("<td>").append($("<input>",
              {type:"checkbox", class:"val-writeText", checked:line.writeText}))
          );
      return row;
    });

    $("#table-line-configures").append(rows);
  }

  function parseCanvasConfiguration(){
    var width = $("#val-canvas-width").prop("value");
    var height = $("#val-canvas-height").prop("value");
    return {width:parseInt(width, 10), height:parseInt(height, 10)};
  }

  function parseLineConfiguration(){
    return $(".row-line-configure").map(function(_, elem){
      var interval = $(elem).find(".val-interval").prop("value");
      var lineDash = $(elem).find(".val-lineDash").prop("value");
      var writeText = $(elem).find(".val-writeText").prop("checked");
      return {interval:parseInt(interval, 10),
        lineDash:parseInt(lineDash, 10),
        writeText:writeText};
    }).toArray();
  }
})();
