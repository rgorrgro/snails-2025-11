// R. Gorr-Grohmann
// Oktober 2025
// Sub dialog of the main dialog for the
// configuration of program modus
//
"use strict";
class DialogModus {
  constructor() {
    this.tst = new Test("diamodus", true, 1);
    this.auto = new Automat2(this.tst,"diamodus",0);
    this.createAutomat();
    this.auto.eveCall(0,0,0);
  }
  createAutomat() {
    this.auto.setState(["STA","CFG","HALT"]);
    this.auto.setEvent(["EV0","EV1","EV2"]);
    // ENr 0: class constructor
    // ENr 1: SET button clicked
    // ENr 2: BACK button clicked
	let next = [
    // SNr 0 STA START
    //    ENr 0: display modus dialog => NSNr 1
      [[1,1],[-1,-1],[-1,-1]],
    // SNr 1 CFG CONFIG
    //    ENr 1 set modus value => NSNr 1
    //    ENr 2 del modus dialog; 
    //          cre main eve 12 => NSNr 2
      [[-1,-1],[1,2],[2,3]],
    // SNr 2 HALT
      [[-1,-1],[-1,-1],[-1,-1]]
    ];
    this.auto.setNext(next);
    let aFunction = [
    // 0
      () => {},
    // 1
      () => {
        this.divShowModify = createDiv();
        this.makeDivModify(this.divShowModify);
        this.divShowModify.style("display","block");
      },
    // 2
      () => {this.setValue();}, 
    // 3
      () => {
        this.divShowModify.style("display","none");
        dialogMain.auto.eveCall(5,0,0);
      },
    ];
    this.auto.setFunction(aFunction);
  }
  //
  makeDivModify(div_) {
    let x = data.buttonsize.getButtonX0();
    let y = data.buttonsize.getButtonY0();
    let addx = data.buttonsize.getButtonAddX();
    let addy = data.buttonsize.getButtonAddY();
    let dist = data.buttonsize.getButtonDist();
    //
    let bName = graphics.makeButton(
      "Modus",x,y,"white",undefined);
    div_.child(bName);
    y += addy;
    //
    let bValue = graphics.makeButton(
      " "+data.modus.getName(),x,y,"white",undefined);
    div_.child(bValue);
    y += addy;
    //
    let bSet = graphics.makeButton(
      "SET",x,y,"yellow",
      () => {this.auto.eveCall(1,0,0);});
    div_.child(bSet);
    let bBack = graphics.makeButton(
      "BACK",x+addx,y,"yellow",
      () => {this.auto.eveCall(2,0,0);});
    div_.child(bBack);
    y += addy;
    //
    this.xType = createRadio(data.modus.getValue());
    this.xType.position(x,y);
    this.xType.size(2*addx-dist);
    for(let i=0;i<data.modus.array.length;i++) {
      this.xType.option(i,data.modus.array[i][1]);
    }
    this.xType.style("background","yellow");
    div_.child(this.xType);
  }
  setValue() {
    let x = this.xType.value();
    data.modus.setValue(x);
  }
}
