
// line: {interval:number, lineDash:number, writeText:bool}
var Phogen = (function(){
  var _lines;

  function Phogen(lines){
    _lines = lines;
  }

  function fillCanvas(canvas, ctx){
    ctx.save();
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }

  function renderAll(canvas, ctx){
    _lines.forEach(function(line){
      writeElementH(canvas, ctx, line);
      writeElementV(canvas, ctx, line);
    });
  }

  function writeElementH(canvas, ctx, line){
    for(var y=0; y<canvas.height; y += line.interval){
      writeLine(ctx, 0, y, canvas.width, y, line.lineDash);
      if(line.writeText){
        writeText(ctx, y, 10, y+14);
      }
    }
  }

  function writeElementV(canvas, ctx, line){
    for(var x=0; x<canvas.width; x += line.interval){
      writeLine(ctx, x, 0, x, canvas.height, line.lineDash);
      if(line.writeText){
        writeText(ctx, x, x+10, 14);
      }
    }
  }

  function writeLine(ctx, startX, startY, endX, endY, lineDash){
    ctx.save();
    ctx.beginPath();
    ctx.setLineDash([lineDash]);
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.restore();
  }

  function writeText(ctx, text, x, y){
    ctx.save();
    ctx.font = "16pt 'Helvetica'";
    ctx.fillStyle = "rgb(10,80,180)";
    ctx.textBaseline = 'top';
    var width = ctx.measureText(text).width;
    var height = 16;

    ctx.save();
    ctx.fillStyle = "rgba(230,190,170,0.4)";
    ctx.fillRect(x, y, width, height+6);
    ctx.restore();

    ctx.fillText(text, x, y);
    ctx.restore();
  }


  Phogen.prototype.render = function(width, height){
    var canvas, ctx;
    canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    ctx = canvas.getContext('2d');
    ctx.translate(0.5, 0.5);

    fillCanvas(canvas, ctx);
    renderAll(canvas, ctx);

    return canvas;
  };

  return Phogen;
})();
