import { NgModule }             from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroesComponent }      from './heroes/heroes.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';



// added by saqib
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomecontentComponent } from './homecontent/homecontent.component';
import { FinddoctorsComponent } from './doctors/finddoctors/finddoctors.component';
import { FinddonerComponent } from './doners/finddoner/finddoner.component';
import { EmergencycontentComponent } from './emergency/emergencycontent/emergencycontent.component';
import { AskquestionComponent } from './askquestions/askquestion/askquestion.component';
import { HealthpageComponent } from './health/healthpage/healthpage.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import {ContactinfoComponent} from './contact-us/contactinfo/contactinfo.component';
import {UsersignupComponent} from './users/usersignup/usersignup.component';
import {DoctorsignupComponent} from './doctors/doctorsignup/doctorsignup.component';
import {ResetpasswordComponent} from './resetpassword/resetpassword.component';
import {BlogdetailpageComponent} from './blogs/blogdetailpage/blogdetailpage.component';
import {DoctordetailComponent} from './doctors/doctordetail/doctordetail.component';
import {UserprofileComponent} from './users/userprofile/userprofile.component';
import {AppointmentcalenderComponent} from './appointmentcalender/appointmentcalender.component';
import {DoctorprofileComponent} from './doctors/doctorprofile/doctorprofile.component';
import {PharmacyComponent} from './pharmacy-components/pharmacy/pharmacy.component';
import {PharmacybranchesComponent} from './pharmacy-components/pharmacybranches/pharmacybranches.component';
import {PharmacyorderComponent} from './pharmacy-components/pharmacyorder/pharmacyorder.component';
import {FrontdeskComponent} from "./frontdesk/frontdesk.component";
import {DatatablesComponent} from "./datatables/datatables.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {UserloginComponent} from "./users/userlogin/userlogin.component";
import {JoinhayaatComponent} from "./joinhayaat/joinhayaat.component";
import {DoctorloginComponent} from "./doctors/doctorlogin/doctorlogin.component";
import {ViewReplyComponent} from "./askquestions/view-reply/view-reply.component";
import {ROUTER_PROVIDERS} from "@angular/router/src/router_module";
import {AuthGuard} from "./auth.guard";
import {SidebarSignupComponent} from "./sidebar-components/sidebar-signup/sidebar-signup.component";
import {SidebarJoinHayaatComponent} from "./sidebar-components/sidebar-join-hayaat/sidebar-join-hayaat.component";
import {SidebarBlogComponent} from "./sidebar-components/sidebar-blog/sidebar-blog.component";
import {SidebarRegisterDonorComponent} from "./sidebar-components/sidebar-register-donor/sidebar-register-donor.component";
import {SidebarEmergencyComponent} from "./sidebar-components/sidebar-emergency/sidebar-emergency.component";
import {HayaatOrderServicesComponent} from "./hayaat-order-services/hayaat-order-services.component";
import {PressReleaseComponent} from "./press/press-release/press-release.component";
import {PressReleaseDetailPageComponent} from "./press/press-release-detail-page/press-release-detail-page.component";
import {PharmacylistcontentComponent} from "./pharmacy-components/pharmacylistcontent/pharmacylistcontent.component";
import {PharmacybrancheslistComponent} from "./pharmacy-components/pharmacybrancheslist/pharmacybrancheslist.component";
import {DoctorDetailResolverService} from './services/doctor-detail-resolver.service';
import {BlogDetailResolverService} from './services/blog-detail-resolver.service';
import {PharmacyDetailResolverService} from './services/pharmacy-detail-resolver.service';

import {LabServiceSectionComponent} from './lab/lab-service-section/lab-service-section.component';
import {LabTestDetailComponent} from './lab/lab-test-detail/lab-test-detail.component';
import {LabOrderComponent} from './lab/lab-order/lab-order.component';






const routes: Routes = [
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // { path: 'dashboard', component: DashboardComponent },
  // { path: 'detail/:id', component: HeroDetailComponent },
  // { path: 'heroes', component: HeroesComponent },

  // added by saqib
  { path: '', component: HomecontentComponent },
  // doctors routes
  { path: 'find-a-doctor', component: FinddoctorsComponent},
  { path: 'doctors', component: FinddoctorsComponent},
  { path: 'doctors', component: FinddoctorsComponent},
  { path: 'doctors/:city', component: FinddoctorsComponent},
  { path: 'doctors/:speciality', component: FinddoctorsComponent},
  { path: 'doctors/:city/:speciality',
    component: FinddoctorsComponent
  },
  { path: 'doctors/:city/:speciality/:slug',
    component: DoctordetailComponent,
    resolve: {
      detail: DoctorDetailResolverService
    }
  },
  // { path: 'doctors/:slug', component: DoctordetailComponent},
  // { path: 'find-a-doctor/bookappointment', component: DoctordetailComponent},

  // donors routes
  { path: 'donors', component: FinddonerComponent},
  { path: 'donors/:city', component: FinddonerComponent},
  { path: 'donors/:blood', component: FinddonerComponent},
  { path: 'donors/:city/:blood', component: FinddonerComponent},
  { path: 'blood-donors', component: FinddonerComponent},

  // emergency routes
  { path: 'emergency/:city', component: EmergencycontentComponent},
  { path: 'nearest-emergency-centers', component: EmergencycontentComponent},

  // Ask Question routes
  { path: 'ask-questions', component: AskquestionComponent},
  { path: 'questions/:slug', component: AskquestionComponent},

  // blog routes
  { path: 'blog', component: HealthpageComponent},
  { path: 'blog/:slug', component: BlogdetailpageComponent,
    resolve: {
      blogDetail: BlogDetailResolverService
    }
  },
  // { path: 'blog/:slug', component: HealthpageComponent},

  // { path: 'doctors/askquestion', component: AskquestionComponent},
  { path: 'privacy-policy', component: PrivacypolicyComponent},
  {
    path: 'about-us',
    component: AboutusComponent,
  },
  { path: 'contact-us', component: ContactinfoComponent},
  { path: 'login/join-hayaat', component: JoinhayaatComponent
  },
  { path: 'user-sign-up', component: UsersignupComponent},
  { path: 'doctor-sign-up', component: DoctorsignupComponent},
  { path: 'reset-password/:token', component: ResetpasswordComponent},

  { path: 'user-profile', canActivate: [AuthGuard] , component: UserprofileComponent},
  { path: 'calender', component: AppointmentcalenderComponent},
  // { path: 'doctorprofile', component: DoctorprofileComponent},
  { path: 'pharmacy', component: PharmacylistcontentComponent},
  { path: 'pharmacy/:slug', component: PharmacybrancheslistComponent,
    resolve: {
      pharmacyDetail: PharmacyDetailResolverService
    }
  },
  { path: 'pharmacy/pharmacy-select', component: PharmacybranchesComponent},
  // { path: 'pharmacy/pharmacy-select/pharmacy-order', component: PharmacyorderComponent},
  { path: 'frontdesk', component: FrontdeskComponent},
  // { path: 'datatable', component: DatatablesComponent},
  { path: 'sidebar', component: SidebarComponent},
  { path: 'user-login', component: UserloginComponent},
  // { path: 'doctor-login', component: DoctorloginComponent},
  { path: 'join-hayaat', component: JoinhayaatComponent},

  { path: 'order-lab-test', component: LabServiceSectionComponent},
  { path: 'select-lab-test', component: LabTestDetailComponent},
  { path: 'lab-test-request', component: LabOrderComponent},


  // { path: 'https://hayaat.pk/doctors/i85UL/Dr-Rizwan-Ahmed-GeneralPhysician-Lahore',
  //   redirectTo: 'https:hayaat.pk/doctors/Lahore/General-Physician/Dr-Rizwan-Ahmed',
  //   pathMatch: 'full'
  // },


  // { path: 'side-bar-sign-up', component: SidebarSignupComponent},
  // { path: 'side-bar-join-hayaat', component: SidebarJoinHayaatComponent},
  // { path: 'side-bar-recent-blog', component: SidebarBlogComponent},
  // { path: 'blood-donor-side-bar', component: SidebarRegisterDonorComponent},
  // { path: 'emergency-side-bar', component: SidebarEmergencyComponent},

  // { path: , component: ViewReplyComponent},
  { path: 'question-detail/:slug', component: ViewReplyComponent},
  { path: 'order-pharmacy', component: PharmacyorderComponent},
  { path: 'order', component: HayaatOrderServicesComponent},

  // { path: 'press-release', component: PressReleaseComponent},
  // { path: 'press-release/:slug', component: PressReleaseDetailPageComponent},
  // { path: 'replies', component: ViewReplyComponent},
  // { path: 'replies', component: ViewReplyComponent},





  // {
  //   path: 'login',
  //   component: UserloginComponent,
  //   children: [
  //     {
  //       path: 'join-hayaat',
  //       component: JoinhayaatComponent
  //     },
  //     {
  //       path: 'join-hayaat/user-sign-up',
  //       component: UsersignupComponent
  //     },
  //     {
  //       path: 'join-hayaat/doctor-sign-up',
  //       component: DoctorsignupComponent
  //     }
  //   ]
  // },
  // {
  //   path: 'join-hayaat',
  //   component: JoinhayaatComponent,
  //   children: [
  //     {
  //       path: 'user-sign-up',
  //       component: UsersignupComponent
  //     },
  //     {
  //       path: 'doctor-sign-up',
  //       component: DoctorsignupComponent
  //     }
  //   ]
  // }



];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
