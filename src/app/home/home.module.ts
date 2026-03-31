import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BestSeller } from './best-seller/best-seller.component';
import { CategorySection } from './category-section/category-section.component';
import { Experience } from './experience/experience.component';
import { FeaturedSection } from './featured-section/featured-section.component';
import { HeroSection } from './hero-section/hero-section.component';
import { Join } from './join/join.component';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home.component';
const routes: Routes = [
  {
    path: '',
    component: Home,
  },
];

@NgModule({
  declarations: [
    BestSeller,
    CategorySection,
    Experience,
    FeaturedSection,
    HeroSection,
    Join,
    Home,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class HomeModule {}
