import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { User } from '../../../core/models/user/user.model';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Optional } from '../../../core/utils/optional';
import { Media } from '../../../core/models/media/media.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {

  private readonly DEFAULT_FILE_URL: string = './../../../../assets/images/example-hotel.svg';

  private readonly BASE_64_PREFIX: string = 'data:image/png;base64,';

  public authenticated: boolean = false;
  public isHotel: boolean = false;
  public profilePicture$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  private destroy$ = new Subject<void>();

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  public ngOnInit(): void {
    this.authenticationService.currentUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe(this.onUserChange);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public logout(): void {
    this.authenticationService.logout();
  }

  private onUserChange = (user: User) => {
    Optional.ofNullable(user)
            .ifPresentOrElse(
              (user) => {
                this.isHotel = this.authenticationService.isCurrentUserHotel();
                this.handleProfilePicture(user.profilePicture);
                this.authenticated = true;
              },
              () => this.authenticated = false
            );
  }

  private handleProfilePicture = (media: Media) => {
    this.profilePicture$.next(
      Optional.ofNullable(media)
            .map((media) => media.data)
            .map((data: string) => this.BASE_64_PREFIX + data)
            .orElse(this.DEFAULT_FILE_URL)
    );
  }

}
