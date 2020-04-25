/**
 * @file 主页面
 * @author zhangluyao
 */
import * as React from 'react';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {Input, Button, Row, Col} from 'antd';
import {saveAs} from 'file-saver';

import {
    getLocalStorage,
    saveTextToDocument,
    saveTranslateTextToLocalStorage,
    getTranslateTextFromLocalStorage,
    splitText
} from '../../utils';
import {TextContext} from '../../App';
import {Assistant} from '../../components/Assistant';
import {SaveDialog} from '../../components/SaveDialog';
import TextAreaType from 'antd/lib/input/TextArea';

const {useState, useContext, useRef, useEffect} = React;
const {TextArea} = Input;

const TranslateTool = ({text, onChange}: {text: string, onChange: (val: string) => void}) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [dialogVisible, setDialogVisible] = useState(false);
    const translateText: string[] = getTranslateTextFromLocalStorage();

    const arr = splitText(text);

    const inputElements = arr.map(() => useRef<TextAreaType>(null));

    const getTranslateText = (elements: React.MutableRefObject<TextAreaType>[]): string[] => {
        return elements.map(
            ele => ele.current
            ? ele.current.resizableTextArea.textArea.value
            : ''
        );
    }

    useEffect(() => {
        if (activeIndex == null && inputElements[0] && inputElements[0].current) {
            inputElements[0].current.focus();

            inputElements.forEach((item, index) => {
                if (item.current && translateText[index]) {
                    item.current.setValue(translateText[index]);
                }
            });
        }

        const text = getTranslateText(inputElements);

        saveTranslateTextToLocalStorage(text);
    });

    const handleSave = (filename: string) => {
        const translateText = getTranslateText(inputElements);

        saveTextToDocument(arr, translateText).then(blob => {
            saveAs(blob, filename + '.docx');
            setDialogVisible(false);
        });
    }

    return (
        <div style={{height: '100%'}}>
            <ol className="translate-area">
                {
                    ...arr.map((item, index) => (
                        <li key={index}>
                            <div className={activeIndex === index ? 'highlight' : ''}>
                                {item}
                            </div>
                            <TextArea
                                ref={inputElements[index]}
                                onBlur={() => setActiveIndex(Infinity)}
                                onFocus={() => {
                                    setActiveIndex(index);
                                    onChange(arr[index]);
                                }}
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
            <div style={{marginTop: 15}}>
                <Button
                    type="primary"
                    onClick={() => setDialogVisible(true)}
                >保存</Button>
            </div>
            <SaveDialog
                visible={dialogVisible}
                handleSave={handleSave}
                handleCancel={() => setDialogVisible(false)}
            />
        </div>
    )
}

const Tool = (props: RouteComponentProps) => {
    const [value, setValue] = useState('');
    let {text} = useContext(TextContext);
    text = text || getLocalStorage();

    if (!text) {
        props.history.replace('/');
    }

    return (
        <div className="home">
            <Row gutter={20} className="full">
                <Col span={16} className="full">
                    <TranslateTool text={text} onChange={(value: string) => setValue(value)}/>
                </Col>
                <Col span={8} className="full">
                    <Assistant text={value} />
                </Col>
            </Row>
        </div>
    )
};

export default withRouter(Tool);
