import React from 'react';
import { Tooltip, Upload, Button, Icon, Input } from 'antd';


const CreateBanter = () => {

    const { TextArea } = Input;

    return (
        <div >
        <Upload>
        <Tooltip title="Upload banter Image(s)">
            <Button>
            <Icon type="upload" />
          </Button>
        </Tooltip> 
        </Upload>
          <div style={{ margin: '24px 0' }} />
        <TextArea
            value=''
            placeholder="Create a banter"
            autoSize={{ minRows: 3, maxRows: 5 }}
        />
        <Button className="banter">Banter</Button>
        </div>   
    );
}

export default CreateBanter;