// Robert Gorr-Grohmann
// 2025-01-01
// Global variables
class Data {
  constructor() {
    this.linecolor = new DataLinecolor(2); // white
    this.bgcolor = new DataBgcolor(5);    // black
    this.frames = new DataFrames(24,1,24);
    this.smr = new DataSnailMaxRun(2,1,5);
    this.sml = new DataSnailMinLength(1,1,5);
    this.format = new DataFormat(4); // handy portrait
    this.buttonsize = new DataButtonSize();
    this.rectsize = new DataRectsize(140,15,200);
    this.linesize = new DataLinesize(8,1,40);
    this.modus = new DataModus(2);
    this.test("genData 1");
  }
  test(name_) {
    tst.print(0,name_);
    this.bgcolor.test();
    this.frames.test();
    this.smr.test();
    this.sml.test();
    this.format.test();
    this.buttonsize.test();
    this.linecolor.test();
    this.rectsize.test();
    this.linesize.test();
    this.modus.test();
  }
}
//
//
//
class DataButtonSize {
  constructor() {
    let w0 = int(innerWidth);    
    let h0 = int(innerHeight);
    this.buttonX0 = 20;
    this.buttonY0 = 20;
    this.buttonAddY = (h0/15<40?40:int(h0/15));
    this.buttonAddX = int(2.5*this.buttonAddY);
    this.buttonDist = int(this.buttonAddY*0.15);
    this.buttonW = this.buttonAddX-this.buttonDist;
    //(w0/7<90?90:int(w0/7));
    this.buttonH = this.buttonAddY-this.buttonDist;
    //int((this.buttonW*3)/4);
//    this.buttonAddW = this.buttonW+10;
//    this.buttonAddH = this.buttonH+10;
    this.buttonTS = 
      (this.buttonH*0.3<15?15:int(this.buttonH*0.3))
  }
  //getButtonX() {return(this.buttonX);}
  //getButtonY() {return(this.buttonY);}
  getButtonX0() {return(this.buttonX0);}
  getButtonY0() {return(this.buttonY0);}
  getButtonAddX() {return(this.buttonAddX);}
  getButtonAddY() {return(this.buttonAddY);}
  getButtonDist() {return(this.buttonDist);}
  getButtonW() {return(this.buttonW);}
  getButtonH() {return(this.buttonH);}
  getButtonTS() {return(this.buttonTS);}
  test() {
    tst.print(0,
      "Button:X0|Y0|AddX|AddY|Dist|W|H|Text",
      this.buttonX0,this.buttonY0,
      this.buttonAddX,this.buttonAddY,
      this.buttonDist,
      this.buttonW,this.buttonH,
      this.buttonTS);
  }
}
//
//
//
class DataSlider {
  constructor(val_,min_,max_) {
    this.min = min_;
    this.max = max_;
    this.setInitValue(val_);
  }
  setInitValue(x_) {
    this.value = (x_<this.min?this.min
                  :(x_>this.max_?this.max:x_));
  }
  setValue(x_) {
    if (x_<this.min) { this.value = this.min; 
    } else {
      if (x_>this.max) { this.value = this.max; 
      } else { this.value = x_;
      }     
    }
  }
  getValue() {return(this.value);}
  getMin() {return(this.min);}
  getMax() {return(this.max);}
  test() {
    tst.print(0,"Slider:Val|Min|Max",
      this.value,this.min,this.max);
  }
}
class DataSnailMinLength extends DataSlider {
  constructor(val_,min_,max_) {
    super(val_,min_,max_);
  }
  test() {
    tst.print(0,"SnailMinLen|Min|Max",
      this.value,this.min,this.max);
  }
}
class DataSnailMaxRun extends DataSlider {
  constructor(val_,min_,max_) {
    super(val_,min_,max_);
  }
  test() {
    tst.print(0,"SnailMaxRun|Min|Max",
      this.value,this.min,this.max);
  }
}
class DataFrames extends DataSlider {
  constructor(val_,min_,max_) {
    super(val_,min_,max_);
  }
  test() {
    tst.print(0,"Frames|Min|Max",
      this.value,this.min,this.max);
  }
}
class DataLinesize extends DataSlider {
  constructor(val_,min_,max_) {
    super(val_,min_,max_);
  }
  test() {
    tst.print(0,"Linesize|Min|Max",
      this.value,this.min,this.max);
  }
}
class DataRectsize extends DataSlider {
  constructor(val_,min_,max_) {
    super(val_,min_,max_);
    this.x = 0;
    this.y = 0;
  }
  setMax(max_) {this.max=max_;}
  setValue(x_) {
    super.setValue(x_);
    this.x = int(
      (data.format.width-this.value/2)/this.value);
    this.y = int(
      (data.format.height-this.value/2)/this.value);
    this.centralizer = createVector(0,0,0);
    this.centralizer.x = 
      (data.format.width-(this.x*this.value))/2;
    this.centralizer.y = 
      (data.format.height-(this.y*this.value))/2;
    data.linesize.setValue(int(this.value/5));
  }
  getX() {return(this.x);}
  getY() {return(this.y);}
  getCentralizer() {return(this.centralizer);}
  test() {
    tst.print(0,"Rectsize|Min|Max|x|y",
      this.value,this.min,this.max,
      this.x,this.y);
  }
}
//
//
//
class DataRadio {
  constructor(ind_) {
    this.array = [
      [0,"white",[255,255,255,255]],
      [1,"black",[0,0,0,255]],
      [2,"red",[255,0,0,255]],
      [3,"green",[0,255,0,255]],
      [4,"yellow",[0,255,255,255]],
      [5,"petrol",[0,95,106,255]],
      [6,"blue",[0,0,255,255]],
      [7,"cyan",[0,255,255,255]],
      [8,"magenta",[255,0,255,255]],
      [9,"gold",[255,215,0,255]],
      [10,"türkis",[64,224,208,255]],
      [11,"silber",[192,192,192,255]]
    ];
    this.setInitValue(ind_);
  }
  setInitValue(ind_) {
    let x = (ind_<0
             ?0:(ind_>this.array.length-1
              ?this.array.length:ind_));
    this.value = this.array[x].slice(0);
  }
  setValue(ind_) {
    let x = (ind_<0
             ?0:(ind_>this.array.length-1
              ?this.array.length:ind_));
    this.value = this.array[x].slice(0);
  }
  getIndex() {return(this.value[0]);}
  getName() {return(this.value[1]);}
  getValue() {return(this.value[2]);}
  test() {tst.print(0,"Radio:Val",this.value);}
}
class DataBgcolor extends DataRadio {
  constructor(ind_) {
    super(ind_);
  }
  setValue(ind_) {
    super.setValue(ind_);
    data.linecolor.setValueRandomly();
  }
  setValueRandomly() {
    let rand = int(random(this.array.length));
    this.setValue(rand);
  }
  test() {tst.print(0,"Background",this.value);}
}
class DataLinecolor extends DataRadio {
  constructor(ind_) {
    super(ind_);
  }
  setValue(ind_) {
    if (ind_==data.bgcolor.getIndex()) {
      ind_ = 
        (ind_+1==this.array.length?0:ind_+1);
    }
    super.setValue(ind_);
  }
  setValueRandomly() {
    let rand = int(random(this.array.length));
    this.setValue(rand);
  }
  test() {tst.print(0,"Linecolor",this.value);}
}
class DataFormat extends DataRadio {
  constructor(ind_) {
    super(ind_);
    super.array = [
      [0,"A4-Portrait",[15,22]],
      [1,"A4-Landscape",[22,15]],
      [2,"Widescreen-P",[12,19]],
      [3,"Widescreen-L",[19,12]],
      [4,"Smartphone-P",[9,16]],
      [5,"Smartphone-L",[16,9]]
    ];
    super.setValue(ind_);
  }
  setValue(ind_) {
    super.setValue(ind_);
    this.calculateWidthAndHeight();
    let max = 0;
    if (this.width<this.height) {
      max = int(this.width/3);
    } else {
      max = int(this.height/3);
    }
    data.rectsize.setMax(max);
    data.rectsize.setValue(
      data.rectsize.getValue());
  }
  calculateWidthAndHeight() {
    let w0 = int(innerWidth);    
    let h0 = int(innerHeight);
    let w1 = this.value[2][0];
    let h1 = this.value[2][1];
    let dw = w0/w1;
    let dh = h0/h1;
    if (dw>dh) {
      this.height = h0-2;
      this.width = int((this.height*w1)/h1);
    } else {
      this.width = w0-2;
      this.height = int((this.width*h1)/w1);
    }
  }
  getWidth() {return(this.width);}
  getHeight() {return(this.height);}
  test() {
    tst.print(0,"Format|width|height",
      this.value,this.width,this.height);}
}
class DataModus extends DataRadio {
  constructor(ind_) {
    super(ind_);
    super.array = [
      [0,"None,Grow",[33,67,0]],
      [1,"None,Once",[33,0,67]],
      [2,"None,Grow,Once",[33,33,34]],
      [3,"Grow",[0,100,0]],
      [4,"Once",[0,0,100]],
      [5,"Once,Grow",[0,50,50]]
    ];
    super.setValue(ind_);
  }
  getNoneGrowAtOn() {
    return(this.value[2]);
  }
  XgetPrcntNoneFromAll() {
    return(this.value[2][0]);
  }
  XgetTypGrowingOrAtOnce() {
    return(this.value[2][1]);
  }
  test() {
    tst.print(0,"Modus|name|values",
      this.value[1],this.value[2]);}
}
