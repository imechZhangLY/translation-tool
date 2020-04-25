/**
 * @file 将文本切割成一句一句的
 * @author zhangluyao01
 *
 * 算法：以句号、感叹号和问好为分割
 * 句号要排除数字的情况
 * 双引号内的句子不分割
 */

export const replaceTextInQuotes = (text: string): [string, (str: string) => string] => {
    const quotesArr: string[] = [];
    const encodedText = text.replace(/(".*")/g, (match, p1) => {
        console.log(match, p1);
        const n = quotesArr.length;
        quotesArr.push(p1);

        return '${' + String(n) + '}';
    });

    const decodeText = (str: string): string => {
        return str.replace(/\$\{(\d+)\}/g, (match, p1) => quotesArr[p1]);
    }

    return [encodedText, decodeText];
}

export const splitText = (text: string) => {
    const [encodedText, decodeText] = replaceTextInQuotes(text);

    const arr = encodedText.split(/(?<=[\.\!\?](?!(\d+)))/g)
        .filter(item => !!item)
        .map(item => decodeText(item.trim()));
    return arr;
}