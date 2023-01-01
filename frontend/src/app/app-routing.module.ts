import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AfterSearchComponent } from './pages/after-search/after-search.component';
import { MainPageComponent } from './pages/main/main-page/main-page.component';
import { PostPageComponent } from './pages/post/post-page/post-page.component';
import { RegisterComponent } from './pages/register/register/register.component';

const routes: Routes = [
  { path: 'home', component: MainPageComponent },
  { path: '', component: MainPageComponent,
    children: [
      { path: 'search', component: AfterSearchComponent },
    ]
  },
  { path: 'search', component: AfterSearchComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'card/:cardId', component: PostPageComponent },
    // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ MainPageComponent ];

