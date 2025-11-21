// Robert Gorr-Grohmann
// 2025-01-01
//
// Collection of helpful functions
//   Calculating global configuration variables
//   Test handling
//   Error handling
//
"use strict;"
class Help {
  constructor() {
  }
//
//  Error handling
//
  err() {
    let s = "Error "+arguments[0]+": ";
    for (let i=1;i<arguments.length;i++) {
      s += arguments[i]+"|";
    }
    print (s);
  }
  errAut() {
    let s = "AutError "+arguments[0]+": ";
    for (let i=1;i<arguments.length;i++) {
      s += arguments[i]+"|";
    }
    print (s);
  }
}
class Test {
  constructor(name_,bool_,valu_) {
    this.name = name_;
    this.bool = bool_;
    this.valu = valu_;
  }
//
//  Test handling
//
  on() { this.bool = true; }
  off() { this.bool = false; }
  value(valu_) { this.valu = valu_; }
  print(valu_) {
//    if ((this.bool) &&
//        (valu_<this.valu)) {
    if (this.bool) {
      let s = "Tst "+this.name+
          " "+arguments[1]+
          "=>";
      for (let i=2;i<arguments.length;i++) {
        s += arguments[i]+"|";
      }
      print (s);
    }
  }
}
//
// Slider-Values
//
class SliderValue {
  constructor(name_,default_,min_,max_) {
    this.nam = name_;
    this.val = int(default_);
    this.min = min_;
    this.max = max_;
  }
  set(value_){
    this.val = (value_<this.min
        ?this.min
        :(value_>this.max?this.max:int(value_)));
  }
//  tst(){return(this.nam+"="+this.val);}
}
//
// Radio-Values
//
class RadioValue {
  constructor(name_,default_,array_) {
    this.nam = name_;
    this.arr = array_.slice(0);
    this.val = this.arr[int(default_)].slice(0);
  }
  set(value_){
    this.val = value_;
  }
}
//
//
//
class Graphics {
  makeCanvas() {
    frameRate(data.frames.getValue());
    canvas = createCanvas(
      data.format.getWidth(), 
      data.format.getHeight());
  }
  makeButton(text_, x_, y_, color_, func_) {
    let button = createButton(text_);
    button.position(x_, y_);
    button.size(data.buttonsize.getButtonW(),
                data.buttonsize.getButtonH());
    let siz = data.buttonsize.getButtonTS() + 'px';
    button.style('font-size', siz);
    button.style("background", color_);
    if (!(func_ == undefined)) {
      button.mousePressed(func_);
    }
    return button;
  }  
}
