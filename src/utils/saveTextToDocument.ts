/**
 * @file 将翻译的文本转换成word文件
 * @author zhangluyao
 */

import {Document, Packer, Paragraph, TextRun} from 'docx';

export const combineArraysOneByOne = <T>(...args: T[][]): T[] => {
    const result: T[] = [];

    args[0].forEach((item, index) => {
        args.forEach(arr => {
            result.push(arr[index]);
        })
    });

    return result;
} 

export const saveTextToDocument = (originText: string[], translateText: string[]): Promise<Blob> => {
    const doc = new Document();

    const text = combineArraysOneByOne(originText, translateText, originText.map(item => ''));
    doc.addSection({
        properties: {},
        children: text.map((item, index) => (new Paragraph({
            children: [
                new TextRun({
                    text: item,
                    font: {
                        name: index % 3 === 0 ? 'Times New Roman' : '宋体'
                    }
                })
            ]
        })))
    });

    return Packer.toBlob(doc);
}
