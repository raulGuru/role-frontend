import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { LayoutService } from 'src/app/layout/layout.service';
import { UnixService } from '../unix.service';
import { ViewGrpDetailComponent } from './view-grp-detail/view-grp-detail.component';

@Component({
  selector: 'app-search-group',
  templateUrl: './search-group.component.html',
  styleUrls: ['./search-group.component.scss'],
})
export class SearchGroupComponent implements OnInit {
  searchForm: FormGroup;
  groups: [];
  groupdetails: [];
  srchDisabled: boolean = false;
  loadContent: boolean = false;
  viewModalRef: NgbModalRef;

  constructor(
    private unixService: UnixService,
    private layoutService: LayoutService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {
    this.searchForm = new FormGroup({
      groupsearchstr: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {}

  async deleteGrp(groupstr: string) {
    if (!groupstr) return;
    Swal.fire({
      title: 'Are you sure?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.toastr.clear();
        this.toastr.info('Deleting...', 'On Group', {
          disableTimeOut: true,
        });
        this.unixService
          .deleteunixgroup({
            groupstr,
          })
          .then(
            (response) => {
              if (response.header.status == '1') {
                this.layoutService.handleResponseError();
              }
              this.toastr.clear();
              const { status, message, info } = response.header.deleteunixgroup;
              if (status === '0') {
                Swal.fire({
                  icon: 'success',
                  title: 'Action performed successfully',
                }).then((result) => {
                  this.clearForm();
                });
              } else {
                Swal.fire({
                  width: 1000,
                  icon: 'error',
                  title: `${message}</br>${info || ''}`,
                });
              }
            },
            (error) => {
              this.toastr.clear();
              console.log(error);
            }
          );
      }
    });
  }

  clearForm() {
    this.searchForm.reset();
    this.groups = [];
    this.groupdetails = [];
    this.srchDisabled = false;
    this.loadContent = false;
  }

  async viewDetails(groupstr: string) {
    if (!groupstr) return;
    try {
      this.toastr.clear();
      this.toastr.info('Searching...', 'Group Detail', {
        disableTimeOut: true,
      });
      let searchRes = await this.unixService.unixgroupusers({
        groupstr,
      });
      if (searchRes.header.status == '1') {
        this.layoutService.handleResponseError();
      }
      this.toastr.clear();
      const { status, message, info } = searchRes.header.unixgroupusers;
      if (status === '0') {
        const users = searchRes.data.unixgroupusers;
        if (users.length > 0) {
          this.viewModalRef = this.modalService.open(ViewGrpDetailComponent, {
            backdrop: 'static',
            size: 'xl',
            scrollable: true,
          });
          this.viewModalRef.componentInstance.users = users;
        } else {
          Swal.fire({
            icon: 'info',
            title: `No Data!!`,
          });
        }
      } else {
        Swal.fire({
          width: 1000,
          icon: 'error',
          title: `${message}</br>${info || ''}`,
        });
      }
    } catch (error) {
      this.toastr.clear();
      console.log(error);
    }
  }

  async onSearch() {
    if (this.searchForm.valid) {
      const { groupsearchstr } = this.searchForm.value;
      if (groupsearchstr.length < 4) return;
      try {
        this.toastr.clear();
        this.toastr.info('Searching...', 'Groups List', {
          disableTimeOut: true,
        });
        this.loadContent = false;
        let searchRes = await this.unixService.groupdetails({
          groupstr: groupsearchstr,
        });
        if (searchRes.header.status == '1') {
          this.layoutService.handleResponseError();
        }
        this.toastr.clear();
        const { status, message, info } = searchRes.header.groupdetails;
        if (status === '0') {
          this.groupdetails = searchRes.data.groupdetails;
          this.loadContent = true;
          setTimeout(() => {
            document.getElementById('loadContent').scrollIntoView();
          }, 300);
        } else {
          Swal.fire({
            width: 1000,
            icon: 'error',
            title: `${message}</br>${info || ''}`,
          });
        }
      } catch (error) {
        this.toastr.clear();
        console.log(error);
      }
    }
  }

  searchClose() {
    const { groupsearchstr } = this.searchForm.value;
    if (groupsearchstr && groupsearchstr.length < 4) {
      Swal.fire({
        icon: 'info',
        title: `Type atleast 4 chars to search`,
      });
      this.searchForm.patchValue({ groupsearchstr: '' });
      this.srchDisabled = true;
    } else if (groupsearchstr && groupsearchstr.length >= 4) {
      this.srchDisabled = false;
    }
  }

  async getGroups(event: any) {
    this.srchDisabled = false;
    if (event.term.length < 4) return;
    const post = { groupsearchstr: event.term };
    try {
      this.toastr.clear();
      this.toastr.info('Searching...', 'Groups List', {
        disableTimeOut: true,
      });
      let groupsRes = await this.unixService.unixgroupsearch(post);
      if (groupsRes.header.status == '1') {
        this.layoutService.handleResponseError();
      }
      this.toastr.clear();
      const { status, message, info } = groupsRes.header.unixgroupsearch;
      if (status === '0') {
        this.groups = groupsRes.data.unixgroupsearch;
      } else {
        Swal.fire({
          width: 1000,
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
    return this.searchForm.controls;
  }
}
