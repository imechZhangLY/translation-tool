/**
 * @file 将翻译的文本转换成word文件
 * @author zhangluyao
 */

import {Document, Packer, Paragraph, TextRun} from 'docx';

const doc = new Document();

export const combineArraysOneByOne = <T>(arr1: T[], arr2: T[]): T[] => {
    const result: T[] = [];

    arr1.forEach((item, index) => result.push(item, arr2[index]));

    return result;
} 

export const saveTextToDocument = (originText: string[], translateText: string[]): Promise<Blob> => {
    const text = combineArraysOneByOne(originText, translateText);
    doc.addSection({
        properties: {},
        children: text.map((item, index) => (new Paragraph({
            children: [
                new TextRun({
                    text: item,
                    font: {
                        name: index % 2 === 0 ? 'Times New Roman' : '宋体'
                    }
                })
            ]
        })))
    });

    return Packer.toBlob(doc);
}
