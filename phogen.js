// settings
var sheetWidth = 2000;
var sheetHeight = 2000;
var mainInterval = 100;
var subInterval = 10;
 
function writeMainLine(ctx,startX,startY,endX,endY){
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(startX,startY);
  ctx.lineTo(endX,endY);
  ctx.stroke();
  ctx.restore();
}
 
function writeSubLine(ctx,startX,startY,endX,endY){
  ctx.save();
  ctx.beginPath();
  ctx.setLineDash([2]);
  ctx.moveTo(startX,startY);
  ctx.lineTo(endX,endY);
  ctx.stroke();
  ctx.restore();
}
 
function writeText(ctx,text,x,y){
  ctx.save();
  ctx.font = "16pt 'Helvetica'";
  ctx.fillStyle = "rgb(10,80,180)";
  ctx.textBaseline = 'top';
  var width = ctx.measureText(text).width;
  var height = 16;
 
  ctx.save();
  ctx.fillStyle = "rgba(230,190,170,0.4)";
  ctx.fillRect(x,y,width,height+6)
  ctx.restore();
 
  ctx.fillText(text,x,y)
  ctx.restore();
}
 
var canvas = document.createElement('canvas');
canvas.id = "hogansheet";
canvas.width = sheetWidth;
canvas.height = sheetHeight;
 
var existed = document.querySelector("#hogansheet")
if(existed){
  existed.parentNode.removeChild(existed);
}
document.body.appendChild(canvas);
 
var ctx = canvas.getContext('2d');
ctx.translate(0.5,0.5);
 
ctx.save();
ctx.fillStyle = "rgb(255,255,255)";
ctx.fillRect(0,0,sheetWidth,sheetHeight);
ctx.restore();
 
for(var x=subInterval;x<sheetWidth;x += subInterval){
  writeSubLine(ctx,x,0,x,sheetHeight);
}
 
for(var y=subInterval;y<sheetHeight;y += subInterval){
  writeSubLine(ctx,0,y,sheetWidth,y);
}
 
for(var x=mainInterval;x<sheetWidth;x += mainInterval){
  writeMainLine(ctx,x,0,x,sheetHeight);
  writeText(ctx,x,x+10,14);
}
 
for(var y=mainInterval;y<sheetHeight;y += mainInterval){
  writeMainLine(ctx,0,y,sheetWidth,y);
  writeText(ctx,y,10,y+14);
}
