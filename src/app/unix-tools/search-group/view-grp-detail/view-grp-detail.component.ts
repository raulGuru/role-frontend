import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-grp-detail',
  templateUrl: './view-grp-detail.component.html',
  styleUrls: ['./view-grp-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViewGrpDetailComponent implements OnInit {
  @Input() public users;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}
}
