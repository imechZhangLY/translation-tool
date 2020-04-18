/**
 * @file 读写localStorage操作
 * @author zhangluyao
 */
const key = 'translateText';

export const setLocalStorage = (value: string) => {
    localStorage.setItem(key, value)
}

export const getLocalStorage = () => {
    return localStorage.getItem(key);
}