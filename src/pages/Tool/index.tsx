/**
 * @file 主页面
 * @author zhangluyao
 */
import * as React from 'react';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {Input, Button, Row, Col} from 'antd';
import {saveAs} from 'file-saver';

import {getLocalStorage, saveTextToDocument} from '../../utils';
import {TextContext} from '../../App';
import TextAreaType from 'antd/lib/input/TextArea';

const {useState, useContext, useRef, useEffect} = React;
const {TextArea} = Input;

const TranslateTool = ({text}: {text: string}) => {
    const [activeIndex, setActiveIndex] = useState(null);
    text = text || getLocalStorage();
    if (!text) {
        return null;
    }

    const arr = text.split(/(?<=[\.\!\?])/g)
        .map(item => item.trim())
        .filter(item => !!item);

    const inputElements = arr.map(() => useRef<TextAreaType>(null));

    useEffect(() => {
        if (!activeIndex && inputElements[0] && inputElements[0].current) {
            inputElements[0].current.focus();
        }
    });

    const handleSave = () => {
        const translateText = inputElements.map(
            ele => ele.current
            ? ele.current.resizableTextArea.textArea.value
            : '暂无翻译'
        );

        saveTextToDocument(arr, translateText).then(blob => {
            saveAs(blob, '英语生活号翻译.docx');
        });
    }

    return (
        <div className="translate-area">
            <ol>
                {
                    ...arr.map((item, index) => (
                        <li key={index}>
                            <div className={activeIndex === index ? 'highlight' : ''}>
                                {item}
                            </div>
                            <TextArea
                                ref={inputElements[index]}
                                onBlur={() => setActiveIndex(Infinity)}
                                onFocus={() => setActiveIndex(index)}
                                onPressEnter={(event: React.KeyboardEvent) => {
                                    if (index + 1 < arr.length && inputElements[index + 1].current) {
                                        inputElements[index + 1].current.focus();
                                    }
                                    else {
                                        inputElements[index].current.blur();
                                    }

                                    event.preventDefault();
                                }}
                                allowClear={true}
                            />
                        </li>
                    ))
                }
            </ol>
            <div style={{marginTop: 15, marginLeft: 40}}>
                <Button
                    type="primary"
                    onClick={handleSave}
                >保存</Button>
            </div>
        </div>
    )
}

const Tool = (props: RouteComponentProps) => {
    const [value, setValue] = useState('');
    const {text} = useContext(TextContext);

    return (
        <div className="home">
            <Row gutter={20} className="full">
                <Col span={16} className="full">
                    <TranslateTool text={text} />
                </Col>
                <Col span={8} className="full">
                </Col>
            </Row>
        </div>
    )
};

export default withRouter(Tool);
