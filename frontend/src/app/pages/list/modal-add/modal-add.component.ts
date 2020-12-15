import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {ModalAddService} from "./modal-add.service";
import {PagesService} from "../../pages.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Toast} from "../../../shared/StringResources";
import {MessagesService} from "../../../shared/components/messages/messages.service";
import {LoaderService} from "../../../shared/components/loader/loader.service";

@Component({
  selector: 'app-modal-add',
  templateUrl: './modal-add.component.html',
  styleUrls: ['./modal-add.component.css']
})
export class ModalAddComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  /** status of modal */
  display$: Observable<'open' | 'close'>;
  /** response to parent after submit*/
  @Output()
  modalResponse = new EventEmitter();
  /** literal */
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
  });

  constructor(private modalAddService: ModalAddService,
              private messagesService: MessagesService,
              private loaderService: LoaderService,
              private pagesService: PagesService) {
  }

  ngOnInit() {
    this.display$ = this.modalAddService.watch();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  close() {
    this.modalAddService.close();
  }

  get name() {
    return this.form.get('name')
  }

  get title() {
    return this.form.get('title')
  }

  submit() {
    if (this.form.status === 'VALID') {
      this.loaderService.show();
      const body = {
        name: this.name.value,
        title: this.title.value,
      };

      this.subscription.add(this.pagesService.createTodo(body).subscribe(response => {
        this.loaderService.hide();
        this.messagesService.showToast(Toast.SUCCESS, response.message);
        this.modalResponse.emit(response.status);
        this.close();
      }, error => {
        this.loaderService.hide();
        this.messagesService.showToast(Toast.DANGER, error.message);
      }))
    } else {
      this.messagesService.showToast(
        Toast.WARNING,
        'Please fill all inputs'
      );
    }
    this.form.reset();
  }
}
