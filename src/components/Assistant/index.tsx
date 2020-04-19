/**
 * @file 百度翻译工具
 * @author zhangluyao
 */
import * as React from 'react';

import './index.css';

export const Assistant = ({text}: {text: string}) => {
    const src = 'https://www.wordreference.com/enzh/am?s=' + encodeURIComponent(text);

    return (
        <div className="assistant">
            <iframe src={src}>
            </iframe>
        </div>
    )
}
