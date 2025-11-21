// R. Gorr-Grohmann
// Oktober 2025
// Sub dialog of the main dialog for the
// configuration of program modus
//
"use strict";
class DialogPause {
  constructor(canvas_) {
    this.tst = new Test("diapause", false, 1);
    this.auto = new Automat2(this.tst,"diapause",0);
    this.createAutomat();
    this.canvas = canvas_;
    this.count = 0;
  }
  createAutomat() {
    this.auto.setState(["STA","SH+","SH-","HALT"]);
    this.auto.setEvent(["TRG","5SEC","RUN","PA+"]);
    // ENr 0: TRG trigger event
    // ENr 1: 5SEC 5 sec trigger event
    // ENr 2: RUN button clicked
    // ENr 3: PA+ Canvas clicked
	let next = [
    // SNr 0 STA START
    //    ENr 0: display RUN dialog => NSNr 1
      [[1,1],[-1,-1],[-1,-1],[-1,-1]],
    // SNr 1 SH+ show RUN dialog
    //    ENr 0: incr count; 
    //           If count = 5 sec Then create ENr 2
    //    ENr 1: delete RUN dialog => NSNr 2
    //    ENr 2: delete RUN dialog;
    //           create RUN event => NSNr 3
      [[1,0],[2,2],[3,3],[1,0]],
    // SNr 2 SH- dont show RUN dialog
    //    ENr 0: do nothing 
    //    ENr 1: do nothing
      [[2,0],[2,0],[-1,-1],[1,4]],
    // SNr 3 HLT HALT
      [[3,0],[3,0],[-1,-1],[3,0]]
    ];
    this.auto.setNext(next);
    let aFunction = [
    // 0
      () => {},
    // 1
      () => {
        this.divPause = createDiv();
        this.makeDivPause();
        this.divPause.style("display", "block");
        this.count = 0;
        this.canvas.mouseClicked(() => {
          this.auto.eveCall(3,0,0);
        });
      },
    // 2
      () => {this.divPause.style("display", "none");}, 
    // 3
      () => {
        this.divPause.style("display", "none");
        dialogRun.auto.eveCall(2,0,0);
      }, 
    // 4
      () => {
        this.divPause.style("display", "block");
        this.count = 0;
      }, 
    ];
    this.auto.setFunction(aFunction);
  }
  trigger() {
    this.count += 1;
    if (this.count<4*data.frames.getValue()) {
        this.auto.eveCall(0,0,0);
    } else {
      this.auto.eveCall(1,0,0);
      this.count = 0;
    }
  }
  makeDivPause() {
    let x = data.buttonsize.getButtonX0();
    let y = data.buttonsize.getButtonY0();
    let addx = data.buttonsize.getButtonAddX();
    let bMain = graphics.makeButton(
      "MAIN", x, y, "white");
    let bRun = graphics.makeButton(
      "RUN", x+addx, y, "yellow", 
      () => {this.auto.eveCall(2,0,0);});
    this.divPause.child(bMain);
    this.divPause.child(bRun);
  }
}