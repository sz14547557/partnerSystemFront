// 统一定义一个获取当前登录用户信息的方法
import myAxios from "../plugins/myAxios";
import { setCurrentUserState } from "../states/user";

export const getCurrentUser = async () => {
    // const currentUser = getCurrentUserState();
    // if (currentUser) {
    //     return currentUser;
    // }
    // 不存在则从远程获取
    const res = await myAxios.get('/user/current');
    if (res.code === 0) {
        setCurrentUserState(res.data);
        return res.data;
    }
    return null;
}

