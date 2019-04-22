import {Component, Inject, OnInit, QueryList, ViewChildren, ViewEncapsulation} from '@angular/core';
import {SnackBarService} from '../../../shared/services/snack-bar.service';
import {ICourse} from '../../../../../../../shared/models/ICourse';
import {LectureCheckboxComponent} from './downloadCheckBoxes/lecture-checkbox.component';
import {DownloadFileService} from 'app/shared/services/data.service';
import {IDownload} from '../../../../../../../shared/models/IDownload';
import {SaveFileService} from '../../../shared/services/save-file.service';
import {saveAs} from 'file-saver';
import {DataSharingService} from '../../../shared/services/data-sharing.service';

@Component({
  selector: 'app-download-course-dialog',
  templateUrl: './download-course-dialog.component.html',
  styleUrls: ['./download-course-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class DownloadCourseDialogComponent implements OnInit {
  course: ICourse;
  chkbox: boolean;
  showSpinner: boolean;
  disableDownloadButton: boolean;
  @ViewChildren(LectureCheckboxComponent)
  childLectures: QueryList<LectureCheckboxComponent>;
  radioSelect: string;

  constructor(private downloadReq: DownloadFileService,
              public snackBar: SnackBarService,
              private saveFileService: SaveFileService,
              private dataSharingService: DataSharingService) {
  }

  ngOnInit() {
    this.course = this.dataSharingService.getDataForKey('course');
    this.showSpinner = false;
    this.disableDownloadButton = false;
    this.chkbox = false;
    this.radioSelect = 'Individual';
    if (!this.checkForEmptyLectures()) {
      this.disableDownloadButton = true;
    }
  }

  onChange() {
    if (this.chkbox) {
      this.childLectures.forEach(lecture => {

        lecture.chkbox = true;
        lecture.onChange();

      });
    } else {
      this.childLectures.forEach(lecture => lecture.chkbox = false);
      this.childLectures.forEach(unit => unit.onChange());
    }
  }

  onChildEvent() {
    const childChecked: boolean[] = [];

    this.childLectures.forEach(lec => {
      if (lec.chkbox === true && !lec.childUnits.find(unit => unit.chkbox === false)) {
        childChecked.push(true);
      } else {
        childChecked.push(false);
      }
    });

    if (childChecked.find(bol => bol === false) !== undefined) {
      this.chkbox = false;
    } else {
      this.chkbox = true;
    }
  }

  calcSumFileSize(): number {
    let sum = 0;
    this.childLectures.forEach(lecture => {
      lecture.childUnits.forEach(unit => {
        if (unit.files) {
          unit.childUnits.forEach(fileUnit => {
            if (fileUnit.chkbox) {
              sum = sum + fileUnit.file.size;
            }
          });
        }
      });
    });
    return sum;
  }

  checkForEmptyLectures(): boolean {
    if (!this.course.lectures.length) {
      return false;
    }

    let foundUnits = false;

    for (const lec of this.course.lectures) {
      if (lec.units.length) {
        foundUnits = true;
      }
    }
    return foundUnits;
  }


  async downloadAndClosePDF() {
    this.disableDownloadButton = true;
    const obj = await this.buildObject();
    if (obj.lectures.length === 0) {
      this.snackBar.open('No units selected!');
      this.disableDownloadButton = false;
      return;
    }
    const downloadObj = <IDownload> obj;
    this.showSpinner = true;
    if (this.calcSumFileSize() / 1024 < 204800) {
      try {
        let result;
        if (this.radioSelect === 'Individual') {
          result = await this.downloadReq.postDownloadReqForCoursePDFIndividual(downloadObj);
        } else if (this.radioSelect === 'Single') {
          result = await this.downloadReq.postDownloadReqForCoursePDFSingle(downloadObj);
        }
        const response = await this.downloadReq.getFile(result.toString());
        saveAs(response.body, this.saveFileService.replaceCharInFilename(this.course.name) + '.zip');
        this.showSpinner = false;
        this.disableDownloadButton = false;
      } catch (err) {
        this.showSpinner = false;
        this.disableDownloadButton = false;
        this.snackBar.openLong('Woops! Something went wrong. Please try again in a few Minutes.');
      }
    } else {
      this.snackBar.openLong('Requested Download Package is too large! Please Download fewer Units in one Package.');
      this.showSpinner = false;
      this.disableDownloadButton = false;
    }
  }

  buildObject() {
    const lectures = [];
    this.childLectures.forEach(lec => {
      if (lec.chkbox) {
        const units = [];
        lec.childUnits.forEach(unit => {
          if (unit.chkbox) {
            if (unit.unit.__t === 'file') {
              const files = [];
              unit.childUnits.forEach((file, index) => {
                if (file.chkbox && !file.showDL) {
                  files.push(file.file._id);
                }
              });
              units.push({unitId: unit.unit._id, files: files});
            } else {
              units.push({unitId: unit.unit._id});
            }
          }
        });
        lectures.push({lectureId: lec.lecture._id, units: units});
      }
    });

    return  {courseName: this.course._id, lectures: lectures};
  }

  uncheckAll() {
    this.chkbox = false;
    this.onChange();
  }
}
