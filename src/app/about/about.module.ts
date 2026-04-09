import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AboutPage } from './about-page/about-page.component';
import { HeroSection } from './hero-section/hero-section.component';
import { Stats } from './stats/stats.component';
import { Mission } from './mission/mission.component';
import { Team } from './team/team.component';
import { Journey } from './journey/journey.component';
import { Banner } from './banner/banner.component';

const routes: Routes = [
  {
    path: '',
    component: AboutPage,
  },
];

@NgModule({
  declarations: [AboutPage, HeroSection, Stats, Mission, Team, Journey, Banner],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AboutModule {}
