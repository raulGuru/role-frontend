import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-netgrp-detail',
  templateUrl: './view-netgrp-detail.component.html',
  styleUrls: ['./view-netgrp-detail.component.scss']
})
export class ViewNetgrpDetailComponent implements OnInit {
  @Input() public data: any;
  @Input() public type: string;
  
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
