// import { NgModule }       from '@angular/core';
// import { BrowserModule }  from '@angular/platform-browser';
// import { FormsModule }    from '@angular/forms';
// import { HttpClientModule }    from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

// import { AppRoutingModule }     from './app-routing.module';

// import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
import { HeroesComponent }      from './heroes/heroes.component';
import { HeroSearchComponent }  from './hero-search/hero-search.component';
import { HeroService }          from './hero.service';
import { MessageService }       from './message.service';
import { MessagesComponent }    from './messages/messages.component';






// project components //////////////////////////////////
// added by saqib
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { SidebarModule } from 'ng-sidebar';
import { CalendarModule } from 'angular-calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DataTablesModule } from 'angular-datatables';


import {HttpClientModule} from "@angular/common/http";
import {ImageZoomModule} from "angular2-image-zoom";
import {InfiniteScrollModule } from "angular2-infinite-scroll";
import { StarRatingModule } from 'angular-star-rating';


import {AgmCoreModule} from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import {ToastModule, ToastOptions} from "ng2-toastr";
import {SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import {GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('819417140196-cj5q05np66smg56b7i4okvbcc10ko3k7.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('119794828712118')
  }
]);
export function provideConfig() {
  return config;
}
// added by saqib
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule
} from '@angular/material';


// added by saqib
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { HomecontentComponent } from './homecontent/homecontent.component';
import { AppRoutingModule } from './app-routing.module';
import { FinddoctorsComponent } from './doctors/finddoctors/finddoctors.component';
import { DoctorcardComponent } from './doctors/doctorcard/doctorcard.component';
import { FinddonerComponent } from './doners/finddoner/finddoner.component';
import { DonercardComponent } from './doners/donercard/donercard.component';
import { EmergencycardComponent } from './emergency/emergencycard/emergencycard.component';
import { EmergencycontentComponent } from './emergency/emergencycontent/emergencycontent.component';
import { AskquestionComponent } from './askquestions/askquestion/askquestion.component';
import { QuestioncardComponent } from './askquestions/questioncard/questioncard.component';
import { HealthblogComponent } from './health/healthblog/healthblog.component';
import { HealthpageComponent } from './health/healthpage/healthpage.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactinfoComponent } from './contact-us/contactinfo/contactinfo.component';
import { ContactformComponent } from './contact-us/contactform/contactform.component';
import { UserloginComponent } from './users/userlogin/userlogin.component';
import { UsersignupComponent } from './users/usersignup/usersignup.component';
import { DoctorsignupComponent } from './doctors/doctorsignup/doctorsignup.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { BlogcategoriesComponent } from './blogs/blogcategories/blogcategories.component';
import { RecentpostsComponent } from './blogs/recentposts/recentposts.component';
import { BlogcontentComponent } from './blogs/blogcontent/blogcontent.component';
import { BlogdetailpageComponent } from './blogs/blogdetailpage/blogdetailpage.component';
import { BlogsocialsComponent } from './blogs/blogsocials/blogsocials.component';
import { DoctordetailComponent } from './doctors/doctordetail/doctordetail.component';
import { DoctorinfoComponent } from './doctors/doctorinfo/doctorinfo.component';
import { BookappointmentComponent } from './doctors/bookappointment/bookappointment.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserprofileComponent } from './users/userprofile/userprofile.component';
import { UserprofileinfoComponent } from './users/userprofileinfo/userprofileinfo.component';
import { StickysocialComponent } from './stickysocial/stickysocial.component';
import { DoctorprofileComponent } from './doctors/doctorprofile/doctorprofile.component';
import { DoctorprofileinfoComponent } from './doctors/doctorprofileinfo/doctorprofileinfo.component';
import { AppointmentcalenderComponent } from './appointmentcalender/appointmentcalender.component';
import { PharmacyComponent } from './pharmacy-components/pharmacy/pharmacy.component';
import { PharmacylistcontentComponent } from './pharmacy-components/pharmacylistcontent/pharmacylistcontent.component';
import { PharmacyorderComponent } from './pharmacy-components/pharmacyorder/pharmacyorder.component';
import { PharmacybranchesComponent } from './pharmacy-components/pharmacybranches/pharmacybranches.component';
import { PharmacybrancheslistComponent } from './pharmacy-components/pharmacybrancheslist/pharmacybrancheslist.component';
import { FrontdeskComponent } from './frontdesk/frontdesk.component';
import { DatatablesComponent } from './datatables/datatables.component';
import { DonerdetailComponent } from './doners/donerdetail/donerdetail.component';
import { AreasComponent } from './areas/areas.component';
import { SpecialitiesComponent } from './specialities/specialities.component';
import { AskquestionmodalComponent } from './askquestions/askquestionmodal/askquestionmodal.component';
import {UserService} from "./services/user.service";
import { JoinhayaatComponent } from './joinhayaat/joinhayaat.component';
import { LoginComponent } from './login/login.component';
import { DoctorloginComponent } from './doctors/doctorlogin/doctorlogin.component';
import { SpecialityfilterComponent } from './filters/specialityfilter/specialityfilter.component';
import { CityfilterComponent } from './filters/cityfilter/cityfilter.component';
import { AreafilterComponent } from './filters/areafilter/areafilter.component';
import { DoctorfeefilterComponent } from './filters/doctorfeefilter/doctorfeefilter.component';
import { BloodgroupfilterComponent } from './filters/bloodgroupfilter/bloodgroupfilter.component';
import { EmergencymapComponent } from './emergency/emergencymap/emergencymap.component';
import {DoctorlistingService} from "./services/doctorlisting.service";
import {DonerlistingService} from "./services/donerlisting.service";
import { EmergencylistingService } from "./services/emergencylisting.service";
import {LoginService} from "./services/login.service";
import {CookieService} from "ngx-cookie-service";
import {PharmacyService} from "./services/pharmacy.service";
import { WriteDoctorReviewComponent } from './doctors/write-doctor-review/write-doctor-review.component';
import {BlogService} from "./services/blog.service";
import { ViewReplyComponent } from './askquestions/view-reply/view-reply.component';
import { MedicalRecordCardComponent } from './medical-records/medical-record-card/medical-record-card.component';
import { MedicalRecordImagesComponent } from './medical-records/medical-record-images/medical-record-images.component';
import { PharmacyOrderListingComponent } from './pharmacy-components/pharmacy-order-listing/pharmacy-order-listing.component';
import { EmergencyMapService } from "./services/emergencymap.service";
import { ViewEmergencyMapComponent } from './emergency/view-emergency-map/view-emergency-map.component';
import {AuthGuard} from "./auth.guard";
import { DoctorratingsComponent } from './doctors/doctorratings/doctorratings.component';
import {TruncateModule} from "ng2-truncate";
import { SidebarSignupComponent } from './sidebar-components/sidebar-signup/sidebar-signup.component';
import { SidebarQuestionsComponent } from './sidebar-components/sidebar-questions/sidebar-questions.component';
import { SidebarJoinHayaatComponent } from './sidebar-components/sidebar-join-hayaat/sidebar-join-hayaat.component';
import { SidebarBlogComponent } from './sidebar-components/sidebar-blog/sidebar-blog.component';
import { SidebarRegisterDonorComponent } from './sidebar-components/sidebar-register-donor/sidebar-register-donor.component';
import { SidebarEmergencyComponent } from './sidebar-components/sidebar-emergency/sidebar-emergency.component';
import { HayaatOrderServicesComponent } from './hayaat-order-services/hayaat-order-services.component';
import { PressReleaseComponent } from './press/press-release/press-release.component';
import { PressReleaseCardComponent } from './press/press-release-card/press-release-card.component';
import { PressReleaseCategoriesComponent } from './press/press-release-categories/press-release-categories.component';
import { PressReleaseContentComponent } from './press/press-release-content/press-release-content.component';
import { PressReleaseDetailPageComponent } from './press/press-release-detail-page/press-release-detail-page.component';
import { PressReleaseRecentPostComponent } from './press/press-release-recent-post/press-release-recent-post.component';
import { InvoiceViewComponent } from './users/invoice-view/invoice-view.component';
import { PharmacyOrderDetailComponent } from './pharmacy-components/pharmacy-order-detail/pharmacy-order-detail.component';
import { WritePharmacyReviewsComponent } from './pharmacy-components/write-pharmacy-reviews/write-pharmacy-reviews.component';
import { ReadPharmacyReviewsComponent } from './pharmacy-components/read-pharmacy-reviews/read-pharmacy-reviews.component';
import {DoctorDetailResolverService} from './services/doctor-detail-resolver.service';
import {BlogDetailResolverService} from './services/blog-detail-resolver.service';
import {PharmacyDetailResolverService} from './services/pharmacy-detail-resolver.service';
import { LabServiceSectionComponent } from './lab/lab-service-section/lab-service-section.component';
import { LabTestDetailComponent } from './lab/lab-test-detail/lab-test-detail.component';
import { LabService } from './services/lab.service';
import { LabOrderComponent } from './lab/lab-order/lab-order.component';
import { FilterPipe } from './pipes/filter.pipe';
import { PrescriptionViewComponent } from './users/prescription-view/prescription-view.component';
import { ReportComponent } from './users/report/report.component';
import { OrderTypeViewComponent } from './users/order-type-view/order-type-view.component';
import { FileViewerComponent } from './users/file-viewer/file-viewer.component';





// added by saqib
@NgModule({
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatFormFieldModule
  ],
  declarations: [],
  providers: [],
})
export class MaterialModule {}

@NgModule({
  imports: [
    BrowserModule.withServerTransition({appId: 'angular.io-example'}),
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    // added by saqib
    ReactiveFormsModule,
    HttpClientModule,
    JsonpModule,
    TabsModule.forRoot(),
    NgbModule.forRoot(),
    ModalModule.forRoot(),
    SidebarModule.forRoot(),
    BrowserAnimationsModule,
    CalendarModule.forRoot(),
    MaterialModule,
    DataTablesModule,
    ImageZoomModule,
    InfiniteScrollModule,
    TruncateModule,
    StarRatingModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD6wNt6ehK_-gRFmrpSQc1ADCZ12baGPDc'
    }),
    AgmDirectionModule,
    ToastModule.forRoot(),
    SocialLoginModule

  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    HeroSearchComponent,

// added by saqib
    AppComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    HomecontentComponent,
    FinddoctorsComponent,
    DoctorcardComponent,
    FinddonerComponent,
    DonercardComponent,
    EmergencycardComponent,
    EmergencycontentComponent,
    AskquestionComponent,
    QuestioncardComponent,
    HealthblogComponent,
    HealthpageComponent,
    PrivacypolicyComponent,
    AboutusComponent,
    ContactinfoComponent,
    ContactformComponent,
    UserloginComponent,
    UsersignupComponent,
    DoctorsignupComponent,
    ForgetpasswordComponent,
    ResetpasswordComponent,
    BlogcategoriesComponent,
    RecentpostsComponent,
    BlogcontentComponent,
    BlogdetailpageComponent,
    BlogsocialsComponent,
    DoctordetailComponent,
    DoctorinfoComponent,
    BookappointmentComponent,
    SidebarComponent,
    UserprofileComponent,
    UserprofileinfoComponent,
    StickysocialComponent,
    DoctorprofileComponent,
    DoctorprofileinfoComponent,
    AppointmentcalenderComponent,
    PharmacyComponent,
    PharmacylistcontentComponent,
    PharmacyorderComponent,
    PharmacybranchesComponent,
    PharmacybrancheslistComponent,
    FrontdeskComponent,
    DatatablesComponent,
    DonerdetailComponent,
    AreasComponent,
    SpecialitiesComponent,
    AskquestionmodalComponent,
    JoinhayaatComponent,
    LoginComponent,
    DoctorloginComponent,
    SpecialityfilterComponent,
    CityfilterComponent,
    AreafilterComponent,
    DoctorfeefilterComponent,
    BloodgroupfilterComponent,
    WriteDoctorReviewComponent,
    ViewReplyComponent,
    MedicalRecordCardComponent,
    MedicalRecordImagesComponent,
    PharmacyOrderListingComponent,
    EmergencymapComponent,
    ViewEmergencyMapComponent,
    SidebarSignupComponent,
    SidebarQuestionsComponent,
    SidebarJoinHayaatComponent,
    SidebarBlogComponent,
    SidebarRegisterDonorComponent,
    SidebarEmergencyComponent,
    DoctorratingsComponent,
    HayaatOrderServicesComponent,
    PressReleaseComponent,
    PressReleaseCardComponent,
    PressReleaseCategoriesComponent,
    PressReleaseContentComponent,
    PressReleaseDetailPageComponent,
    PressReleaseRecentPostComponent,
    InvoiceViewComponent,
    PharmacyOrderDetailComponent,
    WritePharmacyReviewsComponent,
    ReadPharmacyReviewsComponent,
    LabServiceSectionComponent,
    LabTestDetailComponent,
    LabOrderComponent,
    FilterPipe,
    PrescriptionViewComponent,
    ReportComponent,
    OrderTypeViewComponent,
    FileViewerComponent
  ],
  providers: [
    HeroService,
    MessageService,
    // added by saqib
    UserService,
    DoctorlistingService,
    DonerlistingService,
    EmergencylistingService,
    LoginService,
    CookieService,
    PharmacyService,
    BlogService,
    AuthGuard,
    EmergencyMapService,
    ToastOptions,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    DoctorDetailResolverService,
    BlogDetailResolverService,
    PharmacyDetailResolverService,
    LabService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
