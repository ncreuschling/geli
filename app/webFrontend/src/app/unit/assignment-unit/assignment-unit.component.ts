import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {UnitFormService} from '../../shared/services/unit-form.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {IAssignmentUnit} from '../../../../../../shared/models/units/IAssignmentUnit';
import {UploadFormComponent} from '../../shared/components/upload-form/upload-form.component';
import {IFileUnit} from '../../../../../../shared/models/units/IFileUnit';
import {AssignmentService} from '../../shared/services/data.service';
import {UserService} from '../../shared/services/user.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {SnackBarService} from '../../shared/services/snack-bar.service';
import {saveAs} from 'file-saver';
import {IFile} from '../../../../../../shared/models/mediaManager/IFile';
import {IAssignment} from '../../../../../../shared/models/assignment/IAssignment';
import {TranslatableSnackBarService} from '../../shared/services/translatable-snack-bar.service';

enum AssignmentIcon {
  TURNED_IN = 'assignment_turned_in',
  ACCEPTED = 'done',
  FAILED = 'clear',
}

@Component({
  selector: 'app-assignment-unit',
  templateUrl: './assignment-unit.component.html',
  styleUrls: ['./assignment-unit.component.scss']
})
export class AssignmentUnitComponent implements OnInit {
  @Input() assignmentUnit: IAssignmentUnit;
  @ViewChild(UploadFormComponent) public uploadForm: UploadFormComponent;

  allowedMimeTypes: string[];
  unitForm: FormGroup;
  uploadPath: string;
  assignmentIcon: AssignmentIcon;


  disableDownloadButton: boolean;

  public showUploadForm: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  data = this.showUploadForm.asObservable();

  /**
   * Used only for the student view.
   */
  files: IFile[] = [];
  /**
   * Used only for the student view.
   */
  assignment: IAssignment;

  selected: Number;


  constructor(public unitFormService: UnitFormService,
              public snackBar: TranslatableSnackBarService,
              public formBuilder: FormBuilder,
              public userService: UserService,
              private assignmentService: AssignmentService) {
  }

  ngOnInit() {

    if (this.assignmentUnit.assignments.length) {
      // The backend controller only sends a single assignment back to the client
      // if the client has a assignment.
      this.assignment = this.assignmentUnit.assignments[0];

      this.files = this.assignmentUnit.assignments[0].files;

      if (this.assignment.checked === 1) {
        this.assignmentIcon = AssignmentIcon.ACCEPTED;
      } else if (this.assignment.checked === 0) {
        this.assignmentIcon = AssignmentIcon.FAILED;
      } else {
        this.assignmentIcon = AssignmentIcon.TURNED_IN;
      }
    }

    this.uploadPath = '/api/units/' + this.assignmentUnit._id + '/assignment/files';
    // this.allowedMimeTypes = ['text/plain'];

    this.unitFormService.unitInfoText = 'Assignments Info';
    this.unitFormService.headline = 'Assignments';

    this.unitForm = this.unitFormService.unitForm;

    this.unitForm.addControl('deadline', new FormControl(this.assignmentUnit.deadline));
    this.unitForm.addControl('assignments', new FormControl(this.assignmentUnit.assignments));

    if (this.assignmentUnit) {
      this.unitForm.patchValue({
        deadline: this.assignmentUnit.deadline,
        assignments: this.assignmentUnit.assignments
      });
    }

    this.disableDownloadButton = false;
  }


  public updateShowUploadForm = (shown: boolean) => {
    this.showUploadForm.next(shown);
  }

  getHumanReadableDate(date) {
    return new Date(date).toLocaleString();
  }

  public async startUpload() {
    try {
      if (!this.assignment) {
        // The user did not send any assignment. Create a new assignment
        this.assignment = await this.assignmentService.createAssignment(this.assignmentUnit._id);
      }

      this.uploadForm.fileUploader.uploadAll();
    } catch (error) {
    }
  }

  public onFileUploaded(file: IFile) {
    this.files.push(file);
  }

  public onAllUploaded() {
    this.updateShowUploadForm(false);
  }

  public isObjectInQueue() {
    if (this.uploadForm) {
      return this.uploadForm.fileUploader.queue.length > 0;
    }
  }

  public isSubmitted() {
    if (!this.assignment) {
      return false;
    }
    return this.assignment.submitted;
  }

  showSubmitButton() {
    return this.assignment && !this.assignment.submitted;
  }

  public async deleteAssignment() {
    this.updateShowUploadForm(true);
    await this.assignmentService.deleteAssignment(this.assignmentUnit._id.toString());

    this.assignment = null;
    this.files = [];
  }

  public canBeDeleted() {
    if (this.assignmentUnit.assignments.length) {
      return true;
    } else {
      return false;
    }
  }

  public readyToBeGraded() {
    if (this.assignmentUnit.assignments.length) {
      if (this.assignmentUnit.assignments[0].submitted) {
        return true;
      }
    }
    return false;
  }

  public submitAssignment() {
    this.assignment.submitted = true;
    this.assignmentService.updateAssignment(this.assignment, this.assignmentUnit._id.toString());
  }

  public async downloadAllAssignments() {
    this.disableDownloadButton = true;
    try {
      const response = await this.assignmentService.downloadAllAssignments(this.assignmentUnit._id.toString());
      saveAs(response.body, this.assignmentUnit.name + '.zip');
    } catch (err) {
      this.snackBar.openLong('unit.assignment.errorDownload');
    }
    this.disableDownloadButton = false;
  }

  async downloadSingleAssignment(assignment) {
    this.disableDownloadButton = true;
    try {
      const {firstName, lastName} = assignment.user.profile;
      const response = await this.assignmentService
        .downloadSingleAssignment(this.assignmentUnit._id.toString(), assignment.user._id.toString());
      saveAs(response.body, `${lastName}, ${firstName} - ${this.assignmentUnit.name}.zip`);
    } catch (err) {
      this.snackBar.openLong('unit.assignment.errorDownload');
    }
    this.disableDownloadButton = false;
  }

  public submitStatusChange(assignment, approved) {
    assignment.checked = approved;
    this.assignmentService.updateAssignment(assignment, this.assignmentUnit._id.toString());
  }

  private getElementIndexById(arr, id) {
    return arr.findIndex((item) => {
      return item._id === id;
    });
  }
}
