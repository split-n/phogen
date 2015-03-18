/*global window,$,Phogen */
(function(){
  insertSeedLineConfiguration();

  $("#generate-btn").click(function(){
    generate();
  });

  $("#addrow-btn").click(function(){
    addNewLineConfRow();
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
      return generateLineConfRow(line);
    });

    $("#table-line-configures").append(rows);
  }

  function addNewLineConfRow(){
    var row = generateLineConfRow({interval:100, lineDash:1, writeText:true});
    $("#table-line-configures").append(row);
  }

  function generateLineConfRow(line){
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

    var delBtn = $("<a>", {href:"#", class:"btn btn-danger", text:"Delete"});
    delBtn.click(function(){
      row.remove();
    });
    row.append(
      $("<td>").append(delBtn));
    return row;
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
