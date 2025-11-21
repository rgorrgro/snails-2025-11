// R. Gorr-Grohmann
// September 2025
// Snail Drawing 
//   T1: Step by Step
//   T2: All at Once
//
"use strict";
class SnailTX {
  constructor(
    mom_,
    nr_,
    snail_,
    cyclesPerRect_,
    randStartSnail_,
    lineSize_,
    lineColor_,
    name_
    ) {
    this.mom = mom_;
    this.nr = nr_;
    this.bSnail = snail_;
    this.className = name_;
    //print("class="+this.className+",no="+this.nr);
    this.tst = new Test(this.className, false, 1);
    this.cyclesPerRectangle = cyclesPerRect_;
    this.randStartSnail = randStartSnail_;
    this.lineSize = lineSize_;
    this.lineColor = lineColor_;
    this.tst.print(
      1,
      "const Nr|Step|cPR|rSC|linSiz|linCol",
      this.nr,
      this.bSnail.steps.length,
      this.cyclesPerRectangle,
      this.randStartSnail,
      this.lineSize,
      this.lineColor
    );
    //this.auto = new Automat1(this.tst, name_, this.nr);
    //this.createAutomat1();
    this.auto = new Automat2(this.tst, name_, this.nr);
    this.createAutomat2();
    this.auto.evePush(1, 0);
    this.cyclePoint = -1;
    this.cycleStep = 0;
  }
  createAutomat2() {
    let state = ["STA", "INI", "RUN", "DRA", "HLT"];
    this.auto.setState(["STA", "INI", "RUN", "DRA", 
                        "HLT"]);
    let sST = 0;
    let sIN = 1;
    let sRU = 2;
    let sDR = 3;
    let sHA = 4;
    let event = ["TRI", "INI", "RUN", "DRA", "HLT"];
    this.auto.setEvent(["TRI", "INI", "RUN", "DRA", 
                        "HLT"]);
    let eTR = 0;
    let eIN = 1;
    let eRU = 2;
    let eDR = 3;
    let eHA = 4;
    let next = [
      // TRI INI RUN DRA HLT
      [[sST,0], [sIN,1], [-1,-1], [-1,-1], [-1,-1]], // START
      [[sIN,0], [-1,-1], [sRU,2], [-1,-1], [-1,-1]], // INIT
      [[sRU,3], [-1,-1], [-1,-1], [sDR,4], [-1,-1]], // RUN
      [[sDR,5], [-1,-1], [-1,-1], [-1,-1], [sHA,6]], // DRAW
      [[sHA,0], [sIN,7], [-1,-1], [-1,-1], [-1,-1]], // HALT
    ];
    this.auto.setNext(next);
    // 0: START+TRIGGER(trigger),INIT+TRIGGER,
    //    HALT+TRIGGER => Do Nothing
    // 1: START+INIT(constructor) =>
    //    Init lineColor
    //    stateIncr(START-,INIT+)
    //    Next=INIT
    // 2: INIT+RUN(event by mom) =>
    //    stateIncr(INIT-,RUN+)
    //    Next=RUN
    // 3: RUN+TRIGGER =>
    //    If Random Event DRAW
    //    Else Do Nothing
    // 4: RUN+DRAW(event by 4) =>
    //    Init drawing
    //    stateIncr(RUN-,DRAW+)
    //    Next=DRAW
    // 5: DRAW+TRIGGER =>
    //    Drawing
    //    If Drawingfinish Event HALT
    // 6: DRAW+HALT(event by 6) =>
    //    stateIncr(DRAW-,HALT+)
    //    Next=HALT
    // 7: HALT+INIT(event by mom) =>
    //    Init lineColor
    //    stateIncr(START-,INIT+)
    //    Next=INIT
    let afunction = [
      // 0
      () => {},
      // 1
      () => {
        this.mom.stateIncr(0, false);
        this.mom.stateIncr(1, true);
      },
      // 2
      () => {
        this.mom.stateIncr(1, false);
        this.mom.stateIncr(2, true);
      },
      // 3
      () => {
        if (this.mom.stateLessThanMaxNumberOfRunningSnail()) {
          if (random(this.randStartSnail) < 1) {
            this.mom.stateIncr(2, false);
            this.mom.stateIncr(3, true);
            this.auto.evePush(eDR, 0);
          }
        }
      },
      // 4
      () => {
        this.cyclePoint = -1;
        this.cycleStep = 0;
        this.step = this.bSnail.steps[0];
      },
      // 5
      () => {
        if (!this.drawSnail()) {
          this.auto.evePush(eHA, 0);
        }
      },
      // 6
      () => {
        this.mom.stateIncr(3, false);
        this.mom.stateIncr(4, true);
      },
      // 7
      () => {
        this.mom.stateIncr(0, false);
        this.mom.stateIncr(1, true);
      },
    ];
    this.auto.setFunction(afunction);
  }
  trigger() {
    this.auto.evePush(0, 0); // TRIGGER event
    this.auto.eveShift();
  }
  drawPoint() {
  }
  getClassName() { return(this.className); }
}
class SnailT0 extends SnailTX {
  constructor(
    mom_,
    nr_,
    snail_,
    cyclesPerRect_,
    randStartSnail_,
    lineSize_,
    lineColor_
  ) {
    super(mom_,
    nr_,
    snail_,
    cyclesPerRect_,
    randStartSnail_,
    lineSize_,
    lineColor_,
    "snail0"
    );
    this.tst = new Test("snail0", true, 1);
  }
  drawSnail() {
    return false;
  }
}
class SnailT1 extends SnailTX {
  constructor(
    mom_,
    nr_,
    snail_,
    cyclesPerRect_,
    randStartSnail_,
    lineSize_,
    lineColor_
  ) {
    super(mom_,
    nr_,
    snail_,
    cyclesPerRect_,
    randStartSnail_,
    lineSize_,
    lineColor_,
    "snail1"
    );
    this.tst = new Test("snail1", true, 1);
  }
  drawSnail() {
    let t = 0;
    this.cyclePoint += 1;
    if (this.cyclePoint < this.cyclesPerRectangle) {
      t = this.cyclePoint / this.cyclesPerRectangle;
    } else {
      this.cyclePoint = 0;
      this.cycleStep += 1;
      if (this.cycleStep < this.bSnail.steps.length) {
        t = 0;
        this.step = this.bSnail.steps[this.cycleStep];
      } else {
        return false;
      }
    }
    this.step.drawBezierPoint(t, this.lineColor, this.lineSize);
    return true;
  }
}
class SnailT2 extends SnailTX {
  constructor(
    mom_,
    nr_,
    snail_,
    cyclesPerRect_,
    randStartSnail_,
    lineSize_,
    lineColor_
  ) {
    super(mom_,
    nr_,
    snail_,
    cyclesPerRect_,
    randStartSnail_,
    lineSize_,
    lineColor_,
    "snail2"
    );
    this.tst = new Test("snail2", true, 1);
  }
  drawSnail() {
    for (let i = 0; i < this.bSnail.steps.length; i++) {
      this.step = this.bSnail.steps[i];
      let t = 0;
      let tadd = 1 / this.cyclesPerRectangle;
      for (let j = 0; j < this.cyclesPerRectangle; j++) {
        this.step.drawBezierPoint(t, this.lineColor, this.lineSize);
        t += tadd;
      }
    }
    return false;
  }
}