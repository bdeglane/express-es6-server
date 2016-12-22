import {RoleModel} from '../model/RoleModel';
import {PermissionModel} from '../model/PermissionModel';
import {UserModel} from '../model/UserModel';

Promise
  .all([
    new RoleModel({name: 'ADMIN'}).save().then((model) => {
      console.log(model);
    }),
    new PermissionModel({name: 'ALL'}).save().then((model) => {
      console.log(model);
    })
  ])
  .then(() => {
    return new UserModel({
      name: 'test',
      login: 'test@test.test',
      password: 'test',
      role_id: 1
    }).save().then((model) => {
      console.log(model);
    })
  })
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });