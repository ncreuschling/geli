import {Injectable} from '@angular/core';
import {BackendService} from './backend.service';
import {Dependency} from '../../about/licenses/dependency.model';
import {ILecture} from '../../../../../../shared/models/ILecture';
import {IUnit} from '../../../../../../shared/models/units/IUnit';
import {IUser} from '../../../../../../shared/models/IUser';
import {ICourse} from '../../../../../../shared/models/ICourse';
import {IDownload} from '../../../../../../shared/models/IDownload';
import {IDirectory} from '../../../../../../shared/models/mediaManager/IDirectory';
import {IFile} from '../../../../../../shared/models/mediaManager/IFile';
import {IDuplicationResponse} from '../../../../../../shared/models/IDuplicationResponse';
import {IUserSearchMeta} from '../../../../../../shared/models/IUserSearchMeta';
import {IConfig} from '../../../../../../shared/models/IConfig';
import {IAssignment} from '../../../../../../shared/models/assignment/IAssignment';
import {INotificationView} from '../../../../../../shared/models/INotificationView';
import {INotificationSettingsView} from '../../../../../../shared/models/INotificationSettingsView';
import {HttpResponse} from '@angular/common/http';

export abstract class DataService {

  static changeStringProp2DateProp(item: any, prop: string) {
    if (item[prop] !== null) {
      item[prop] = (typeof item[prop] === 'string' ? new Date(item[prop]) : null);
    }
  }

  constructor(public apiPath: string,
              public backendService: BackendService,
              public changeProps2Date?: string[],
              public dependentID?: string) {
  }

  createItem<T, RT = T>(createItem: T): Promise<RT> {
    return this.backendService
      .post(this.apiPath, createItem)
      .toPromise();
  }

  readItems<T>(): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.backendService.get(this.apiPath)
        .subscribe(
          (responseItems: any) => {
            if (this.changeProps2Date) {
              responseItems.forEach(item => {
                this.changeProps2Date.forEach(prop => {
                  DataService.changeStringProp2DateProp(item, prop);
                });
              });
            }

            resolve(responseItems);
          },
          (error) => reject(error)
        );
    });
  }

  updateItem<T extends any>(updateItem: T): Promise<T> {
    return this.backendService
      .put(this.apiPath + updateItem._id, JSON.stringify(updateItem))
      .toPromise();
  }

  deleteItem<T extends any>(deleteItem: T): Promise<any> {
    return this.backendService
      .delete(this.apiPath + deleteItem._id)
      .toPromise();
  }

  readSingleItem<T>(id: string, apiPath = this.apiPath): Promise<T> {
    return new Promise((resolve, reject) => {
      this.backendService.get(apiPath + id)
        .subscribe(
          (responseItems: any) => {
            if (this.changeProps2Date) {
              responseItems.forEach(item => {
                this.changeProps2Date.forEach(prop => {
                  DataService.changeStringProp2DateProp(item, prop);
                });
              });
            }

            resolve(responseItems);
          },
          error => reject(error)
        );
    });
  }
}

@Injectable()
export class ExportService extends DataService {
  constructor(public backendService: BackendService) {
    super('export/', backendService);
  }

  exportCourse(course: ICourse): Promise<ICourse> {
    return this.backendService
      .get(this.apiPath + 'course/' + course._id)
      .toPromise();
  }

  exportLecture(lecture: ILecture): Promise<ILecture> {
    return this.backendService
      .get(this.apiPath + 'lecture/' + lecture._id)
      .toPromise();
  }

  exportUnit(unit: IUnit): Promise<IUnit> {
    return this.backendService
      .get(this.apiPath + 'unit/' + unit._id)
      .toPromise();
  }
}

@Injectable()
export class ImportService extends DataService {
  constructor(public backendService: BackendService) {
    super('import/', backendService);
  }

  importCourse(course: ICourse): Promise<ICourse> {
    return this.backendService
      .post(this.apiPath + 'course/', JSON.stringify(course))
      .toPromise();
  }

  importLecture(lecture: ILecture, course: ICourse): Promise<ILecture> {
    return this.backendService
      .post(this.apiPath + 'course/' + course._id, JSON.stringify(lecture))
      .toPromise();
  }

  importUnit(unit: IUnit, lecture: ILecture, course: ICourse): Promise<IUnit> {
    return this.backendService
      .post(this.apiPath + 'unit/' + course._id + '/' + lecture._id, JSON.stringify(unit))
      .toPromise();
  }
}

@Injectable()
export class DuplicationService extends DataService {
  constructor(public backendService: BackendService) {
    super('duplicate/', backendService);
  }

  duplicateCourse(course: ICourse, courseAdmin: IUser): Promise<IDuplicationResponse> {
    return this.backendService
      .post(this.apiPath + 'course/' + course._id, JSON.stringify({courseAdmin}))
      .toPromise();
  }

  duplicateLecture(lecture: ILecture, courseId: string): Promise<IDuplicationResponse> {
    return this.backendService
      .post(this.apiPath + 'lecture/' + lecture._id, JSON.stringify({courseId}))
      .toPromise();
  }

  duplicateUnit(unit: IUnit, lectureId: string): Promise<IDuplicationResponse> {
    return this.backendService
      .post(this.apiPath + 'unit/' + unit._id, JSON.stringify({lectureId}))
      .toPromise();
  }
}

@Injectable()
export class MediaService extends DataService {
  constructor(public backendService: BackendService) {
    super('media/', backendService);
  }

  createRootDir(course: ICourse, rootDirName: string): Promise<IDirectory> {
    return this.backendService.post(this.apiPath + 'directory', JSON.stringify({_course: course._id, name: rootDirName}))
      .toPromise();
  }

  createDirectory(newDirName: string, parentDir: IDirectory): Promise<IDirectory> {
    return this.backendService.post(this.apiPath + 'directory/' + parentDir._id, JSON.stringify({name: newDirName}))
      .toPromise();
  }

  addFile(directory: IDirectory): Promise<IFile> {
    return this.backendService.post(this.apiPath + 'file/' + directory._id, JSON.stringify({}))
      .toPromise();
  }

  getDirectory(dirId: string, lazy: boolean = false): Promise<IDirectory> {
    const path = this.apiPath + 'directory/' + dirId + (lazy ? '/lazy' : '');
    return this.backendService.get(path)
      .toPromise();
  }

  getFile(fileId: string): Promise<IFile> {
    return this.backendService.get(this.apiPath + 'file/' + fileId)
      .toPromise();
  }

  updateDirectory(dir: IDirectory): Promise<IDirectory> {
    return this.backendService.put(this.apiPath + 'directory/' + dir._id, JSON.stringify(dir))
      .toPromise();
  }

  updateFile(file: IFile): Promise<IFile> {
    return this.backendService.put(this.apiPath + 'file/' + file._id, JSON.stringify(file))
      .toPromise();
  }

  deleteDirectory(dir: IDirectory): Promise<any> {
    return this.backendService.delete(this.apiPath + 'directory/' + dir._id)
      .toPromise();
  }

  deleteFile(file: IFile): Promise<any> {
    return this.backendService.delete(this.apiPath + 'file/' + file._id)
      .toPromise();
  }
}

@Injectable()
export class CourseService extends DataService {
  constructor(public backendService: BackendService) {
    super('courses/', backendService);
  }

  enrollStudent(courseId: string, data: any): Promise<{}> {
    const accessKey: string = data.accessKey;
    return this.backendService
      .post(this.apiPath + courseId + '/enroll', JSON.stringify({accessKey}))
      .toPromise();
  }

  sendMailToSelectedUsers(data: any): Promise<any> {
    return this.backendService
      .post(this.apiPath + 'mail', JSON.stringify(data))
      .toPromise();
  }

  async removePicture(courseId: string): Promise<any> {
    return this.backendService
      .delete(this.apiPath + 'picture/' + courseId)
      .toPromise();
  }

  async leaveStudent(courseId: string): Promise<{}> {
    return await this.backendService
      .post(this.apiPath + courseId + '/leave', {})
      .toPromise();
  }

  readCourseToView(id: string): Promise<ICourse> {
    return this.readSingleItem<ICourse>(id);
  }

  readCourseToEdit(id: string): Promise<ICourse> {
    return this.readSingleItem<ICourse>(id + '/edit');
  }

  setWhitelistUsers(courseId: string, whitelistUsers: any): Promise<any> {
    const originalApiPath = this.apiPath;
    this.apiPath += courseId + '/whitelist';
    const promise = this.createItem(JSON.stringify(whitelistUsers));
    this.apiPath = originalApiPath;
    return promise;
  }
}

@Injectable()
export class TaskService extends DataService {
  constructor(public backendService: BackendService) {
    super('tasks/', backendService);
  }

  getTasksForCourse(id: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.backendService.get(this.apiPath + 'course/' + id)
        .subscribe(
          (responseItems: any) => {
            if (this.changeProps2Date) {
              responseItems.forEach(item => {
                this.changeProps2Date.forEach(prop => {
                  DataService.changeStringProp2DateProp(item, prop);
                });
              });
            }

            resolve(responseItems);
          },
          error => reject(error)
        );
    });
  }
}

@Injectable()
export class AssignmentService extends DataService {
  constructor(public backendService: BackendService) {
    super('units/', backendService);
  }

  createAssignment(unitId: string): Promise<any> {
    return this.backendService.post(this.apiPath + unitId + '/assignment', null)
      .toPromise();
  }

  updateAssignment(assignment: IAssignment, unitId: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.backendService.put(this.apiPath + unitId + '/assignment', assignment)
        .subscribe(
          (responseItem: any) => {
            resolve(responseItem);
          },
          error => reject(error)
        );
    });
  }

  deleteAssignment(unitId: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.backendService.delete(this.apiPath + unitId + '/assignment')
        .subscribe(
          (responseItem: any) => {
            resolve(responseItem);
          },
          error => reject(error)
        );
    });
  }

  downloadAllAssignments(unitId: string): Promise<HttpResponse<Blob>> {
    return this.backendService.getDownload(this.apiPath + unitId + '/assignments/files')
        .toPromise();
  }

  downloadSingleAssignment(unitId: string, userId: string): Promise<HttpResponse<Blob>> {
    return this.backendService.getDownload(this.apiPath + unitId + '/assignments/' + userId + '/files')
      .toPromise();
  }

}

@Injectable()
export class LectureService extends DataService {
  constructor(public backendService: BackendService) {
    super('lecture/', backendService);
  }
}

@Injectable()
export class UnitService extends DataService {
  constructor(public backendService: BackendService) {
    super('units/', backendService);
  }

  getUnitForCourse(courseId: string): Promise<any> {
    const originalApiPath = this.apiPath;
    this.apiPath += 'progressable/course/';
    const promise = this.readSingleItem(courseId);
    this.apiPath = originalApiPath;
    return promise;
  }

  getProgressableUnits(courseId: string): Promise<any> {
    const originalApiPath = this.apiPath;
    this.apiPath += 'course/progressable/';
    const promise = this.readSingleItem(courseId);
    this.apiPath = originalApiPath;
    return promise;
  }
}

@Injectable()
export class CodeKataUnitService extends DataService {
  constructor(public backendService: BackendService) {
    super('units/code-katas/', backendService);
  }
}

@Injectable()
export class FreeTextUnitService extends DataService {
  constructor(public backendService: BackendService) {
    super('units/free-texts/', backendService);
  }
}

@Injectable()
export class NotificationSettingsService extends DataService {
  constructor(public backendService: BackendService) {
    super('notificationSettings/', backendService);
  }

  getNotificationSettings(): Promise<INotificationSettingsView[]> {
    return this.backendService.get(this.apiPath).toPromise();
  }

  async setNotificationSettings(settings: INotificationSettingsView) {
    await this.backendService.put(this.apiPath, settings).toPromise();
  }
}

@Injectable()
export class NotificationService extends DataService {
  constructor(public backendService: BackendService) {
    super('notification/', backendService);
  }

  createNotification(user: IUser, data: any): Promise<any> {
    return this.backendService
      .post(this.apiPath + 'user/' + user._id, JSON.stringify(data))
      .toPromise();
  }

  getNotifications(): Promise<INotificationView[]> {
    return this.backendService.get(this.apiPath).toPromise();
  }
}

@Injectable()
export class UserDataService extends DataService {
  constructor(public backendService: BackendService) {
    super('users/', backendService);
  }

  searchUsers(role: string, query: string, limit?: number): Promise<IUserSearchMeta> {
    const originalApiPath = this.apiPath;
    this.apiPath += 'members/search/';
    this.apiPath += '?role=' + role;
    this.apiPath += '&query=' + query;
    if (limit) {
      this.apiPath += '&limit=' + limit;
    }
    const promise = this.readSingleItem('') as Promise<IUserSearchMeta>;
    this.apiPath = originalApiPath;
    return promise;
  }

  getRoles(): Promise<string[]> {
    const originalApiPath = this.apiPath;
    this.apiPath += 'roles/';
    const promise = this.readItems<string>();
    this.apiPath = originalApiPath;
    return promise;
  }

  addPicture(data: any): Promise<IUser> {
    const originalApiPath = this.apiPath;
    this.apiPath += 'picture/';
    const promise = this.updateItem(data);
    this.apiPath = originalApiPath;
    return promise;
  }

  exportData(): Promise<Response> {
    const url = 'export/user';
    return this.backendService
      .getDownload(url)
      .toPromise();
  }
}

@Injectable()
export class WhitelistUserService extends DataService {
  constructor(public backendService: BackendService) {
    super('whitelist/', backendService);
  }

  checkWhitelistUsers(whitelistUsers: any[]): Promise<any> {
    const originalApiPath = this.apiPath;
    this.apiPath += 'check/' + encodeURIComponent(JSON.stringify(whitelistUsers));
    const promise = this.readItems();
    this.apiPath = originalApiPath;
    return promise;
  }
}

@Injectable()
export class APIInfoService extends DataService {

  private apiInfo: any;

  constructor(public backendService: BackendService) {
    // use root route
    super('', backendService);
  }

  async readAPIInfo() {
    if (!this.apiInfo) {
      this.apiInfo = await this.readItems();
    }
    return this.apiInfo;
  }
}

@Injectable()
export class AboutDataService extends DataService {
  constructor(public backendService: BackendService) {
    super('about/', backendService);
  }

  getApiDependencies(): Promise<Dependency[]> {
    return new Promise((resolve, reject) => {
      this.backendService.get(this.apiPath + 'dependencies')
        .subscribe((responseItems: any) => {
            if (responseItems.httpCode >= 500) {
              // FIXME: Just return, right?
              return resolve([]);
            }

            const out = [];
            responseItems.data.forEach(item => {
              out.push(new Dependency(
                item.name,
                item.version,
                item.repository,
                item.license,
                item.devDependency)
              );
            });
            resolve(out);
          },
          error => reject(error)
        );
    });
  }
}

@Injectable()
export class DownloadFileService extends DataService {
  constructor(public backendService: BackendService) {
    super('download/', backendService);
  }

  postDownloadReqForCoursePDFIndividual(idl: IDownload): Promise<Response> {
    return this.backendService
      .post(this.apiPath + 'pdf/individual', idl)
      .toPromise();
  }

  postDownloadReqForCoursePDFSingle(idl: IDownload): Promise<Response> {
    return this.backendService
      .post(this.apiPath + 'pdf/single', idl)
      .toPromise();
  }

  getFile(id: string): Promise<HttpResponse<Blob>> {
    return this.backendService
      .getDownload(this.apiPath + id)
      .toPromise();
  }
}

@Injectable()
export class ConfigService extends DataService {
  downloadMaxFileSize: number;
  constructor(public backendService: BackendService) {
    super('config/', backendService);
  }

  async getDownloadMaxFileSize () {
    const res = <IConfig><any> await this.readSingleItem('public/downloadMaxFileSize');
    const _value = Number.parseInt(res.value, 10);
    const  value = isNaN(_value) ? 51200 : _value;
    this.downloadMaxFileSize = value;

    return value;
  }

}
