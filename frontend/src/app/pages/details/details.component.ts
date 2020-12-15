import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Todo} from "../../shared/interfaces/Todo";
import {PagesService} from "../pages.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {MessagesService} from "../../shared/components/messages/messages.service";
import {Toast} from "../../shared/StringResources";
import {LoaderService} from "../../shared/components/loader/loader.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  subscription = new Subscription();
  todo: Todo;
  private todoId: number;

  constructor(private pagesService: PagesService,
              private route: ActivatedRoute,
              private loaderService: LoaderService,
              private messagesService: MessagesService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.todoId = JSON.parse(params['id']);
      this.getTodoDetails();
    });
  }

  getTodoDetails() {
    this.loaderService.show();
    this.subscription.add(this.pagesService.getTodoDetails(this.todoId).subscribe(response => {
      this.loaderService.hide();
      this.todo = response.data;
      this.messagesService.showToast(Toast.SUCCESS, response.message);
    }, error => {
      this.loaderService.hide();
      this.messagesService.showToast(Toast.DANGER, error.message);
    }))
  }

  submit() {
    if (this.todo.name.trim() !== '' && this.todo.title.trim() !== '') {
      this.subscription.add(this.pagesService.updateTodo(this.todo).subscribe(response => {
        this.messagesService.showToast(Toast.SUCCESS, response.message);
      }, error => {
        this.messagesService.showToast(Toast.DANGER, error.message);
      }));
    } else {
      this.messagesService.showToast(
        Toast.WARNING,
        'Please fill all inputs'
      )
    }
  }
}
