import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './Pages/main-page/main-page.component';
import { RegisterPageComponent } from './Pages/register-page/register-page.component';
import { PostPageComponent } from './post-page/post-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'register', component: RegisterPageComponent },
  // { path: '**', component: PageNotFoundComponent },
  // { path: 'serach', component: AfterSearchComponent },
  { path: 'card/:cardId', component: PostPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ MainPageComponent ];

