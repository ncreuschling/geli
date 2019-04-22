import {Component, OnInit} from '@angular/core';
import {IUser} from '../../../../../../shared/models/IUser';
import {UserDataService} from '../../shared/services/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../shared/services/user.service';
import {User} from '../../models/User';
import {TitleService} from '../../shared/services/title.service';
import {BackendService} from '../../shared/services/backend.service';
import {saveAs} from 'file-saver';
import {SnackBarService} from '../../shared/services/snack-bar.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  userId: string;
  user: IUser;

  constructor(private route: ActivatedRoute,
              public userService: UserService,
              public userDataService: UserDataService,
              private titleService: TitleService,
              private backendService: BackendService,
              private snackBar: SnackBarService,
              private snackbar: SnackBarService,
              private router: Router) {
  }

  ngOnInit() {
    this.titleService.setTitle('User');
    this.route.params.subscribe(params => {
      this.userId = decodeURIComponent(params['id']);

      if (this.userId === 'undefined') {
        this.userId = this.userService.user._id;
      }
    });
    this.getUserData();
  }

  getEditLink() {
    let link = '/profile';

    if (!this.userService.isLoggedInUser(this.user)) {
      link += `/${this.user._id}`;
    }

    link += '/edit';

    return link;
  }

  async exportProfile() {
    const user = new User(this.user);

    const promises = [];
    promises.push(<Response> await this.userDataService.exportData());

    if (user.hasUploadedProfilePicture) {
      const promise = <Response> await this.backendService
        .getDownload(user.getUserImageURL(null, 'uploads/users/'))
        .toPromise();

      promises.push(promise);
    }

    const responses = await Promise.all(promises);

    try {
        if (responses[0]) {
          saveAs(responses[0].body, 'MyUserData.json');
        }
        if (responses[1]) {
          saveAs(responses[1].body, user.profile.picture.alias);
        }
      } catch (err) {
        this.snackbar.openLong('Woops! Something went wrong. Please try again in a few Minutes.');
      }
    }

  getUserData() {
    this.userDataService.readSingleItem(this.userId)
      .then((user: any) => {
        this.user = new User(user);
        this.titleService.setTitleCut(['User: ', this.user.profile.firstName]);
      })
      .catch((error: any) => {
      });
  }

  async deleteProfile() {
    if (this.user.role === 'admin') {
      // navigate to delete site.
      const link = `/admin/users/delete/${this.user._id}`;
      this.router.navigate([link]);
    } else {
      // send delete request
      try {
        await this.userDataService.deleteItem(this.user);
        this.snackBar.open('A delete request was sent to an admin.');
      } catch (err) {
        this.snackBar.open(err.error.message);
      }
    }

  }
}
