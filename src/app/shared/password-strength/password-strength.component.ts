import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss']
})
export class PasswordStrengthComponent implements OnInit, OnChanges {
  @Input() public password: string;
  @Input() public uid: string;
  @Output() passwordStrength = new EventEmitter<boolean>();
  colors = ['#d92550', '#16aaff', '#3ac47d'];
  bar0: string;
  bar1: string;
  bar2: string;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    const password = changes.password.currentValue;
    this.setBarColors(3, '#DDD');
    if (password) {
      const strength = this.checkStrength(password)
      const c = this.getColor(strength);
      this.setBarColors(c.index, c.color);
      strength === 30 ? this.passwordStrength.emit(true) : this.passwordStrength.emit(false);
    }
  }

  checkStrength(p: string) {
    let force = 0;
    const minChar = p.length < 8 ? false : true;
    const isBothAlphaNum = /^(?=.*[a-zA-Z])(?=.*[0-9])/i.test(p);    // /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i.test(p); 
    const hasUid = p.search(this.uid) === -1 ? true : false;

    const flags = [minChar, isBothAlphaNum, hasUid];

    let passedMatches = 0;
    for (const flag of flags) {
      passedMatches += flag === true ? 1 : 0;
    }

    force += 2 * p.length + ((p.length >= 10) ? 1 : 0);
    force += passedMatches * 10;

    force = (p.length < 8) ? Math.min(force, 10) : force;

    force = (passedMatches === 1) ? Math.min(force, 10) : force;
    force = (passedMatches === 2) ? Math.min(force, 20) : force;
    force = (passedMatches === 3) ? Math.min(force, 30) : force;
    return force;
  }

  getColor(s) {
    let index = 0;
    if (s === 10) {
      index = 0;
    } else if (s === 20) {
      index = 1;
    } else if (s === 30) {
      index = 2;
    } else if (s === 40) {
      index = 3;
    } else {
      index = 4;
    }
    return {
      index: index + 1,
      color: this.colors[index]
    };
  }

  setBarColors(count, col) {
    for (let n = 0; n < count; n++) {
      this['bar' + n] = col;
    }
  }

}
