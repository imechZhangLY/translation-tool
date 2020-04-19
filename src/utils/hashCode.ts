/**
 * @file 将字符串转化成hash
 * @author zhangluyao
 */

export const hashCode = (s: string): number => {
    let hash: number = 0;

    [...s].forEach(item => {
        const chr = item.charCodeAt(0);

        hash = (hash << 5) - hash + chr;

        hash |= 0;
    })

    return hash;
}