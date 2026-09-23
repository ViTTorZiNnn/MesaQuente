// One layout calculation aligns a 2D pedestal table with the 3D deck camera.
export function tableLayout(width,height){
 const w=Math.min(width*.96,height*1.15,1000),h=w/(1672/941);
 return {width:w,height:h,left:(width-w)/2,top:height*.56-h*.35};
}
