/**
 * @file 保存文件名
 * @author zhangluyao
 */
import * as React from 'react';
import {
    Modal,
    Input
} from 'antd';

const {useState} = React;

interface SaveDialogProps {
    visible: boolean;
    handleSave: (filename: string) => void;
    handleCancel: () => void;
}

export const SaveDialog = ({handleSave, handleCancel, visible}: SaveDialogProps) => {
    const [filename, setFilename] = useState('');

    return (
        <Modal
            title="保存文件"
            visible={visible}
            onOk={() => handleSave(filename)}
            onCancel={handleCancel}
        >
            <Input
                placeholder="请输入文件名"
                value={filename}
                onChange={event => setFilename(event.target.value)}
            ></Input>
        </Modal>
    )
}