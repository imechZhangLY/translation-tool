/**
 * @file 更换浏览器的userAgent
 * @author zhangluyao01
 */

export const setUserAgent = (userAgent: string) => {
    if (window && window.navigator && window.navigator.userAgent !== userAgent) {
        const userAgentProp = { get: function () { return userAgent; } };
        Object.defineProperty(window.navigator, 'userAgent', userAgentProp);
    }
}