import React from 'react';
import { Button, Tooltip } from 'antd';


export default ({ children, onClick, tip }) => (
    <Tooltip title={tip}  placement="top">
        <Button onClick={onClick} >
            {children}
        </Button>
    </Tooltip>
    );