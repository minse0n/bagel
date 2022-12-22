import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoundedBtnComponent } from './rounded-btn/rounded-btn.component';
import { PostPageComponent } from './post-page/post-page.component';
import { CardListComponent } from './card-list/card-list.component';
import { CommentFormComponent } from './comments/comment-form/comment-form.component';
import { CommentComponent } from './comments/comment/comment.component';
import { CommentsComponent } from './comments/comments.component';

@NgModule({
  declarations: [
    AppComponent,
    RoundedBtnComponent,
    PostPageComponent,
    CardListComponent,
    CommentFormComponent,
    CommentComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
