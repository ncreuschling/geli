import { Authorized, Body, CurrentUser, Delete, ForbiddenError, Get,
  JsonController, NotFoundError, Param, Post, Put, UseBefore } from 'routing-controllers';
import passportJwtMiddleware from '../security/passportJwtMiddleware';

import {Lecture} from '../models/Lecture';
import {ILecture} from '../../../shared/models/ILecture';
import {Course} from '../models/Course';
import {IUser} from '../../../shared/models/IUser';

@JsonController('/lecture')
@UseBefore(passportJwtMiddleware)
export class LectureController {

  /**
   * @api {get} /api/lecture/:id Request lecture
   * @apiName GetLecture
   * @apiGroup Lecture
   *
   * @apiParam {String} id Lecture ID.
   *
   * @apiSuccess {Lecture} lecture Lecture.
   *
   * @apiSuccessExample {json} Success-Response:
   *     {
   *         "_id": "5a037e6b60f72236d8e7c857",
   *         "updatedAt": "2017-11-08T22:00:11.693Z",
   *         "createdAt": "2017-11-08T22:00:11.693Z",
   *         "name": "Introduction",
   *         "description": "something about me, us, whoever",
   *         "__v": 0,
   *         "units": []
   *     }
   */
  @Get('/:id')
  async getLecture(@Param('id') id: string, @CurrentUser() currentUser: IUser) {
    const course = await Course.findOne({lectures: id});
    if (!course.checkPrivileges(currentUser).userCanViewCourse) {
      throw new ForbiddenError();
    }
    const lecture = await Lecture.findById(id);
    return lecture.toObject();
  }

  /**
   * @api {post} /api/lecture/ Add lecture
   * @apiName PostLecture
   * @apiGroup Lecture
   * @apiPermission teacher
   * @apiPermission admin
   *
   * @apiParam {Object} data New lecture data.
   *
   * @apiSuccess {Lecture} lecture Added lecture.
   *
   * @apiSuccessExample {json} Success-Response:
   *     {
   *         "_id": "5a037e6b60f72236d8e7c857",
   *         "updatedAt": "2017-11-08T22:00:11.693Z",
   *         "createdAt": "2017-11-08T22:00:11.693Z",
   *         "name": "Introduction",
   *         "description": "something about me, us, whoever",
   *         "__v": 0,
   *         "units": []
   *     }
   */
  @Authorized(['teacher', 'admin'])
  @Post('/')
  async addLecture(@Body() data: any, @CurrentUser() currentUser: IUser) {
    const lectureI: ILecture = data.lecture;
    const courseId: string = data.courseId;

    const course = await Course.findById(courseId);
    if (!course.checkPrivileges(currentUser).userCanEditCourse) {
      throw new ForbiddenError();
    }

    // TODO: Don't allow arbitrary 'lectureI' input; maybe only name & description can be extracted?
    const lecture = await new Lecture(lectureI).save();
    course.lectures.push(lecture);
    await course.save();
    return lecture.toObject();
  }

  /**
   * @api {put} /api/lecture/:id Update lecture
   * @apiName PutLecture
   * @apiGroup Lecture
   * @apiPermission teacher
   * @apiPermission admin
   *
   * @apiParam {String} id Lecture ID.
   * @apiParam {ILecture} lecture New lecture data.
   *
   * @apiSuccess {Lecture} lecture Updated lecture.
   *
   * @apiSuccessExample {json} Success-Response:
   *     {
   *         "_id": "5a037e6b60f72236d8e7c857",
   *         "updatedAt": "2018-01-29T23:43:07.220Z",
   *         "createdAt": "2017-11-08T22:00:11.693Z",
   *         "name": "Introduction",
   *         "description": "something about me, us, whoever",
   *         "__v": 0,
   *         "units": []
   *     }
   */
  @Authorized(['teacher', 'admin'])
  @Put('/:id')
  async updateLecture(@Param('id') id: string, @Body() lectureUpdate: ILecture, @CurrentUser() currentUser: IUser) {
    const course = await Course.findOne({lectures: id});
    if (!course.checkPrivileges(currentUser).userCanEditCourse) {
      throw new ForbiddenError();
    }
    const lecture = await Lecture.findByIdAndUpdate(id, lectureUpdate, {'new': true});
    return lecture.toObject();
  }

  /**
   * @api {delete} /api/lecture/:id Delete lecture
   * @apiName DeleteLecture
   * @apiGroup Lecture
   * @apiPermission teacher
   * @apiPermission admin
   *
   * @apiParam {String} id Lecture ID.
   *
   * @apiSuccess {Boolean} result Confirmation of deletion.
   *
   * @apiSuccessExample {json} Success-Response:
   *     {}
   */
  @Authorized(['teacher', 'admin'])
  @Delete('/:id')
  async deleteLecture(@Param('id') id: string, @CurrentUser() currentUser: IUser) {
    const course = await Course.findOne({lectures: id});
    if (!course) {
      throw new NotFoundError();
    }
    if (!course.checkPrivileges(currentUser).userCanEditCourse) {
      throw new ForbiddenError();
    }

    await Course.updateMany({}, {$pull: {lectures: id}});
    await Lecture.findByIdAndRemove(id);

    return {};
  }
}
