import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/layout.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-enterprise-id',
  templateUrl: './search-enterprise-id.component.html',
  styleUrls: ['./search-enterprise-id.component.scss']
})
export class SearchEnterpriseIdComponent implements OnInit, OnDestroy {
  users: [];
  uidForm: FormGroup;
  clearFormSub: Subscription;
  statusChangeSub: Subscription;
  @Input() isRequired: boolean = false;
  @Input() uidType: string = 'ALL';
  @Input() uidLabel: string = 'Enterprise ID';
  @Input() clearForm: EventEmitter<boolean>;;
  @Output() isUidSelected: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() isSearchClosed: EventEmitter<any> = new EventEmitter<any>();
  @Output() isSearchCleard: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(
    private layoutService: LayoutService,
    private toastr: ToastrService
  ) {
    if (this.isRequired) {
      this.uidForm = new FormGroup({
        opuid: new FormControl(null, Validators.required)
      });
    } else {
      this.uidForm = new FormGroup({
        opuid: new FormControl(null)
      });
    }
  }

  ngOnInit(): void {
    this.statusChangeSub = this.uidForm.statusChanges.subscribe(value => {
      if (value === 'VALID') {
        this.isUidSelected.emit(true);
      } else {
        this.isUidSelected.emit(false);
      }
    });
    if (this.clearForm) {
      this.clearFormSub = this.clearForm.subscribe(data => {
        this.uidForm.reset();
      })
    }
  }

  searchClose() {
    const { opuid } = this.uidForm.value;
    this.isSearchClosed.emit(opuid);
  }

  searchClear() {
    this.isSearchCleard.emit(true);
  }

  async getUserIds(event: any) {
    if (event.term.length < 3) return;
    const post = { opuid: event.term, 'type': this.uidType };
    try {
      this.toastr.clear();
      this.toastr.info('Searching...', 'User List', {
        disableTimeOut: true,
      });
      let usersRes = await this.layoutService.searchEnterpriseId(post);
      if (usersRes.header.status == '1') {
        this.layoutService.handleResponseError();
      }
      this.toastr.clear();
      const { status, message, info } = usersRes.header.enterpriseid;
      if (status === '0') {
        this.users = usersRes.data.enterpriseid;
      } else {
        Swal.fire({
          icon: 'error',
          title: `${message}</br>${info || ''}`,
        });
      }
    } catch (error) {
      this.toastr.clear();
      console.log(error);
    }
  }

  get c() {
    return this.uidForm.controls;
  }

  ngOnDestroy(): void {
    if (this.statusChangeSub) {
      this.statusChangeSub.unsubscribe();
    }
    if (this.clearFormSub) {
      this.clearFormSub.unsubscribe();
    }
  }

}
