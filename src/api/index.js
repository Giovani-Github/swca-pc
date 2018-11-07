/**
 * api接口的统一出口
 * @Author Giovani
 * @Create: 2018/10/13 21:47:16
 */

// 用户模块接口
import user from './user';
import demo from './demo';
import repair from './repair';
import repairAdmin from './admin/repair-admin';
import personnelAdmin from './admin/personnel-admin';
// 其他模块的接口……

// 导出接口
export default {
  user,
  demo,
  repair,
  repairAdmin,
  personnelAdmin
}

