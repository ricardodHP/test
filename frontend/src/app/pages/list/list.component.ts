import {Component, OnDestroy, OnInit} from '@angular/core';
import {PagesService} from "../pages.service";
import {Subscription} from "rxjs";
import {UtilsService} from "../../utils/utils.service";
import {Todo} from "../../shared/interfaces/Todo";
import {MessagesService} from "../../shared/components/messages/messages.service";
import {Toast} from "../../shared/StringResources";
import {ModalAddService} from "./modal-add/modal-add.service";
import {Router} from "@angular/router";
import {LoaderService} from "../../shared/components/loader/loader.service";

declare var $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  /** push all subscriptions */
  subscription = new Subscription();
  /** contains table in HTML format */
  htmlTable: string;
  /** contains data server */
  data: Array<Todo>;

  constructor(private pagesService: PagesService,
              private utilsService: UtilsService,
              private messagesService: MessagesService,
              private loaderService: LoaderService,
              private modalAddService: ModalAddService,
              private router: Router) {
  }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadData() {
    this.loaderService.show();
    this.htmlTable = '';
    this.subscription.add(this.pagesService.getAllTodos().subscribe(response => {
      this.loaderService.hide();
      this.data = response.data;
      const tableTitles = ['id', 'Name', 'Title', 'Completed', 'Actions'];
      const tableColumns = ['id', 'name', 'title', 'completed', 'custom-column'];
      this.htmlTable = this.utilsService.drawTable(false, '', tableTitles, tableColumns, this.data);
      this.callbackTable();
    }, error => {
      this.loaderService.hide();
      this.messagesService.showToast(Toast.DANGER, error.message);
    }));
  }

  callbackTable() {
    setTimeout(() => {
      $('td.custom-column').each((k, element) => {
        const actions =
          '<a><i class="mdi mdi-eye text-primary mdi-18px cursor-pointer" data-toggle="tooltip" ' +
          'data-placement="top" title="See details" data-details="1"></i></a>' +
          '<i class="mdi mdi-delete text-danger mdi-18px cursor-pointer" data-toggle="tooltip" ' +
          'data-placement="top" title="Delete item" data-delete="1"></i>';
        $(element).html(actions).addClass('d-flex justify-content-around');
      });

      $('td.completed').each((k, element) => {
        const checked = this.data[k].completed ? 'checked' : '';
        const actions =
          '<div class="custom-checkbox custom-control" data-toggle="tooltip" ' +
          'data-placement="top" title="Enable/Disable" data-enable="1">' +
          '<input type="checkbox" class="custom-control-input" id="check-' + k + '" style="top: 7px;right: 25px;" ' + checked + '>' +
          '<label class="custom-control-label" for="check-' + k + '"></label>' +
          '</div>';
        $(element).html(actions);
      });

      $('[data-details="1"]').each((k, element) => {
        $(element).off('click').on('click', () => {
          this.router.navigate(['/details'], {
            queryParams: {
              id: this.data[k].id
            }
          })
        });
      });

      $('[data-delete="1"]').each((k, element) => {
        $(element).off('click').on('click', () => {
          type onClick = () => void;
          const acceptEvent: onClick = () => {
            this.subscription.add(this.pagesService.deleteTodo(this.data[k].id).subscribe(response => {
              this.messagesService.showToast(Toast.SUCCESS, response.message);
              this.loadData();
            }, error => {
              this.messagesService.showToast(Toast.DANGER, error.message);
            }))

            $('#mensaje_default').modal('hide');
          };
          const cancelEvent: onClick = () => {
            $('#mensaje_default').modal('hide');
          };

          const options = {
            type: Toast.DEFAULT,
            title: Toast.TITLE_WARNING,
            message: 'Are you sure to delete?',
            showAccept: true,
            showCancel: true,
            acceptEvent: acceptEvent,
            cancelEvent: cancelEvent
          };

          this.messagesService.showModal(options);
        });
      });

      $('[data-enable="1"]').each((k, element) => {
        $(element).off('change').on('change', (ckeck) => {
          const status = $(ckeck.target).is(':checked') ? 1 : 0;
          const body = {
            completed: status
          }
          this.subscription.add(this.pagesService.updateStatus(this.data[k].id, body).subscribe(response => {
            this.messagesService.showToast(Toast.SUCCESS, response.message);
          }, error => {
            this.messagesService.showToast(Toast.DANGER, error.message);
          }));
        });
      });
      // $('[data-toggle="tooltip"]').tooltip();
      $('th, td').css('text-align', 'center');
      this.initSearch();
    });
  }

  initSearch() {
    $('#search-input').show().on('keyup', function () {
      const value = $(this).val().toLowerCase();
      $('table tbody tr').filter(function () {
        $(this).toggle($(this).text().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').indexOf(value) > -1);
      });
    });
  }

  openModalAdd() {
    this.modalAddService.open();
  }

  modalResponse(response) {
    if (response === 200) {
      this.loadData();
    }
  }
}
