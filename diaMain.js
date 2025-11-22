//
// Robert Gorr-Grohmann
// September 2025
// Main dialog to steer the program flow
//
"use strict";
class DialogMain {
  constructor() {
    this.tst = new Test("diamain", true, 1);
    this.tst.off();
    this.auto = new Automat2(this.tst, "diamain", 1);
    this.createAutomat();
    this.auto.eveShift();
  }
  createAutomat() {
    this.auto.setState(["STA","MAIN","CFG","MOD",
                        "RUN"]);
    this.auto.setEvent(["TRG","RUN","CFG+",
                        "CFG-","MOD+","MOD-"]);
    //  ENr  0: TRG Sketch trigger
    //  ENr  1: RUN RUN button clicked
    //  ENr  2: CFG+ CONFIG button clicked
    //  ENr  3: CFG- CONFIG dialog finished
    //  ENr  4: MOD+ MODUS button clicked
    //  ENr  5: MOD- MODUS dialog finished
    let next = [
    // SNr 0 STA START
    //   ENr 0: display main menu => NSNr 1
      [[1,1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1]],
    // SNr 1 MAIN
    //   ENr 0: set background color
    //   ENr 1: start RUN dialog => NSNr 3
    //   ENr 2: start CONFIG dialog => NSNr 2
    //   ENr 4: start MODUS dialog => NSNr 4 
      [[1,0],[4,2],[2,3],[-1,-1],[3,5],[-1,-1]],
    // SNr 2 CFG CONFIG 
    //   ENr 0: do nothing
    //   ENr 3: del CONFIG dialog;
    //          show MAIN dialog => NSNr 1
      [[2,0],[-1,-1],[-1,-1],[1,4],[-1,-1],[-1,-1]],
    // SNr 3 MOD MODUS
    //   ENr 0: do nothing
    //   ENr 5: del CONFIG dialog;
    //          show MAIN dialog => NSNr 1
      [[3,0],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[1,6]],
    // SNr 4 RUN
      [[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
       [-1,-1]],
      ];
    this.auto.setNext(next);
    let aFunction = [
      // 0
      () => {},
      // 1
      () => {
        this.divMain = createDiv();
        this.makeDivMain();
        this.divMain.style("display", "block");
      },
      // 2
      () => {
        this.divMain.style("display", "none");
        stateRunning = true;
        dialogRun = new DialogRun();
      },
      // 3
      () => {
        this.divMain.style("display", "none");
        dialogConf = new DialogConf();
        dialogConf.init();
      },
      // 4
      () => {
        //this.divMain.style("display", "block");
        dialogConf = undefined;
        this.divMain = createDiv();
        this.makeDivMain();
        this.divMain.style("display", "block");
      },
      // 5
      () => {
        this.divMain.style("display", "none");
        dialogModus = new DialogModus();
      },
      // 6
      () => {
        //this.divMain.style("display", "block");
        dialogModus = undefined;
        this.divMain = createDiv();
        this.makeDivMain();
        this.divMain.style("display", "block");
      },
      // 7
      () => {
        //background(data.bgcolor.getValue());
      },
    ];
    this.auto.setFunction(aFunction);
  }
  makeDivMain() {
    let x = data.buttonsize.getButtonX0();
    let y = data.buttonsize.getButtonY0();
    let addx = data.buttonsize.getButtonAddX(); //25;
    let addy = data.buttonsize.getButtonAddY(); //25;
    let bMain = graphics.makeButton(
      "MAIN", x, y, "white");
    let bRun = graphics.makeButton(
      "RUN", x+addx,y,"yellow", 
      () => {this.auto.eveCall(1,0,0);});
    y = y+addy;
    let bModus = graphics.makeButton(
      "MODUS", x+addx, y,"yellow", 
      () => {this.auto.eveCall(4,0,0);});
    let bModusValue = graphics.makeButton(
      data.modus.getName(), x+2*addx, y,"white");
    y = y+addy;
    let bConfig = graphics.makeButton(
      "CONFIG", x+addx, y,"yellow",
      () => {this.auto.eveCall(2,0,0);}
    );
    this.divMain.child(bMain);
    this.divMain.child(bRun);
    this.divMain.child(bModus);
    this.divMain.child(bModusValue);
    this.divMain.child(bConfig);
    this.divMain.style("display", "none");
  }
}
