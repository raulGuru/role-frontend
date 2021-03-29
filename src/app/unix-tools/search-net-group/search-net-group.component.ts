import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { LayoutService } from 'src/app/layout/layout.service';
import { UnixService } from '../unix.service';
import { ViewNetgrpDetailComponent } from './view-netgrp-detail/view-netgrp-detail.component';

@Component({
  selector: 'app-search-net-group',
  templateUrl: './search-net-group.component.html',
  styleUrls: ['./search-net-group.component.scss'],
})
export class SearchNetGroupComponent implements OnInit {
  searchForm: FormGroup;
  groups: [];
  netgroupdetails: [];
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
        this.toastr.info('Deleting...', 'On Net Group', {
          disableTimeOut: true,
        });
        this.unixService
          .deleteunixnetgroup({
            groupstr,
          })
          .then(
            (response) => {
              if (response.header.status == '1') {
                this.layoutService.handleResponseError();
              }
              this.toastr.clear();
              const {
                status,
                message,
                info,
              } = response.header.deleteunixnetgroup;
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
              window.alert(error);
            }
          );
      }
    });
  }

  async viewDetails(groupstr: string, type: string) {
    if (!groupstr) return;
    try {
      this.toastr.clear();
      this.toastr.info('Searching...', 'Net Group Detail', {
        disableTimeOut: true,
      });
      let searchRes = await this.unixService.unixnetgroupusers({
        groupstr,
      });
      if (searchRes.header.status == '1') {
        this.layoutService.handleResponseError();
      }
      this.toastr.clear();
      const { status, message, info } = searchRes.header.unixnetgroupusers;
      if (status === '0') {
        const resData = searchRes.data.unixnetgroupusers;
        if (resData.length > 0) {
          this.viewModalRef = this.modalService.open(
            ViewNetgrpDetailComponent,
            {
              backdrop: 'static',
              size: 'xl',
              scrollable: true,
            }
          );
          this.viewModalRef.componentInstance.data = resData;
          this.viewModalRef.componentInstance.type = type;
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
      window.alert(error);
    }
  }

  async onSearch() {
    if (this.searchForm.valid) {
      const { groupsearchstr } = this.searchForm.value;
      if (groupsearchstr.length < 4) return;
      try {
        this.toastr.clear();
        this.toastr.info('Searching...', 'Net Groups List', {
          disableTimeOut: true,
        });
        this.loadContent = false;
        let searchRes = await this.unixService.netgroupdetails({
          groupstr: groupsearchstr,
        });
        if (searchRes.header.status == '1') {
          this.layoutService.handleResponseError();
        }
        this.toastr.clear();
        const { status, message, info } = searchRes.header.netgroupdetails;
        if (status === '0') {
          this.netgroupdetails = searchRes.data.netgroupdetails;
          this.loadContent = true;
        } else {
          Swal.fire({
            width: 1000,
            icon: 'error',
            title: `${message}</br>${info || ''}`,
          });
        }
      } catch (error) {
        this.toastr.clear();
        window.alert(error);
      }
    }
  }

  clearForm() {
    this.searchForm.reset();
    this.groups = [];
    this.netgroupdetails = [];
    this.srchDisabled = false;
    this.loadContent = false;
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
      this.toastr.info('Searching...', 'Net Groups List', {
        disableTimeOut: true,
      });
      let groupsRes = await this.unixService.unixnetgroupsearch(post);
      if (groupsRes.header.status == '1') {
        this.layoutService.handleResponseError();
      }
      this.toastr.clear();
      const { status, message, info } = groupsRes.header.unixnetgroupsearch;
      if (status === '0') {
        this.groups = groupsRes.data.unixnetgroupsearch;
      } else {
        Swal.fire({
          width: 1000,
          icon: 'error',
          title: `${message}</br>${info || ''}`,
        });
      }
    } catch (error) {
      this.toastr.clear();
      window.alert(error);
    }
  }

  get c() {
    return this.searchForm.controls;
  }
}
