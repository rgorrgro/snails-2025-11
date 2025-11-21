// Robert Gorr-Grohmann
// September 2025
// Basic Snail As Bezier Curves
//
"use strict;";
class BezierSnails {
  constructor(baseSnails_, size_, centralizer_) {
    //print("BezierSnails constructor start");
    // Change geometry coordinates to bezier coordinates
    this.arr = [];
    for (let i = 0; i < baseSnails_.arr.length; i++) {
      let baseSnail = baseSnails_.arr[i];
      let bezierSnail = new BezierSnail(size_, centralizer_, baseSnail);
      this.arr.push(bezierSnail);
    }
    //print("BezierSnails constructor - Done");
  }
  toString() {
    let s = "\nBezierSnails arr:[";
    for (let i = 0; i < this.arr.length; i++) {
      s += "\n" + this.arr[i].toString();
    }
    return s + "\n]";
  }
  toJSON() {
    let s1 = "[";
    for (let i = 0; i < this.arr.length; i++) {
      s1 += "\n" + this.arr[i].toJSON();
    }
    s1 += "]";
    return s1;
  }
}
class BezierSnail {
  constructor(size_, centralizer_, snail_) {
    this.nr = snail_.nr;
    this.steps = [];
    for (let i = 0; i < snail_.steps.length; i++) {
      let step = new BezierSnailStep(
        this.nr,
        size_,
        centralizer_,
        snail_.steps[i]
      );
      this.steps.push(step);
    }
  }
  toString() {
    let s = "{nr=" + this.nr + ",steps=[";
    for (let i = 0; i < this.steps.length; i++) {
      s += "\n" + this.steps[i].toString();
    }
    s += "]}";
    return s;
  }
  toJSON() {
    let s1 = "{nr:" + this.nr + ",steps:[";
    for (let i = 0; i < this.steps.length; i++) {
      s1 += "\n" + this.steps[i].toString();
    }
    s1 += "]}";
    return s1;
  }
}
class BezierSnailStep {
  constructor(nr_, size_, centralizer_, step_) {
    this.nr = nr_;
    this.p1 = step_.p1;
    this.p2 = step_.p2;
    this.centralizer = createVector(centralizer_.x, centralizer_.y);
    this.anchor1 = this.setAnchor(size_, this.p1);
    this.control1 = this.setControl(size_, this.p1, this.anchor1);
    this.anchor2 = this.setAnchor(size_, this.p2);
    this.control2 = this.setControl(size_, this.p2, this.anchor2);
  }
  setAnchor(size_, p_) {
    let ancX = [0, size_ / 2, size_, 0, size_, 0, size_ / 2, size_];
    let ancY = [0, 0, 0, size_ / 2, size_ / 2, size_, size_, size_];
    let v = createVector(p_.x * size_ + ancX[p_.z], p_.y * size_ + ancY[p_.z]);
    return v.add(this.centralizer);
  }
  setControl(size_, p_, anchor_) {
    let add1 = (size_ * 30) / 100;
    let add2 = (size_ * 5) / 100;
    let ctrx = [add1, 0, -add1, add1, -add1, add1, 0, -add1];
    let ctry = [add1, add1, add1, 0, 0, -add1, -add1, -add1];
    let v = anchor_.copy();
    let vadd = createVector(ctrx[p_.z], ctry[p_.z]);
    v.add(vadd);
    return v;
  }
  toString() {
    let s = "{";
    s += "P(" + this.p1.x + "," + this.p1.y + "," + this.p1.z + ")";
    s += ",P(" + this.p2.x + "," + this.p2.y + "," + this.p2.z + ")";
    s += ",anc1=" + this.vectorToString(this.anchor1);
    s += ",ctl1=" + this.vectorToString(this.control1);
    s += ",ctl2=" + this.vectorToString(this.control2);
    s += ",anc2=" + this.vectorToString(this.anchor2);
    s += "}";
    return s;
  }
  toJSON() {
    let s1 = "{";
    s1 += "p1:";
    s1 += "(" + this.p1.x + "," + this.p1.y + "," + this.p1.z + ")";
    s1 += ",p2:";
    s1 += "(" + this.p2.x + "," + this.p2.y + "," + this.p2.z + ")";
    s += ",anc1:" + this.vectorToString(this.anchor1);
    s += ",ctl1=" + this.vectorToString(this.control1);
    s += ",ctl2=" + this.vectorToString(this.control2);
    s += ",anc2=" + this.vectorToString(this.anchor2);
    s += "}";
    return s;
  }
  vectorToString(v_) {
    return "(" + v_.x + "," + v_.y + ")";
  }
  drawBezierPoint(t_, color_, size_) {
    let x = bezierPoint(
      this.anchor1.x,
      this.control1.x,
      this.control2.x,
      this.anchor2.x,
      t_
    );
    let y = bezierPoint(
      this.anchor1.y,
      this.control1.y,
      this.control2.y,
      this.anchor2.y,
      t_
    );
    noStroke();
    fill(color_);
    circle(x, y, size_);
  }
  drawBezierStep(color_, size_) {
    noStroke();
    fill(color_);
    bezier(
      this.anchor1.x,
      this.anchor1.y,
      this.control1.x,
      this.control1.y,
      this.control2.x,
      this.control2.y,
      this.anchor2.x,
      this.anchor2.y
    );
  }
}
