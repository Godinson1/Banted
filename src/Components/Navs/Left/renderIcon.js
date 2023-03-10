import React from "react";
import { Badge } from "antd";
import {
  HomeFilled,
  NumberOutlined,
  BellOutlined,
  MailOutlined,
  UserOutlined,
  BorderOuterOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

export const renderIcon = (icon) => {
  switch (icon) {
    case "HomeFilled":
      return <HomeFilled />;
    case "NumberOutlined":
      return <NumberOutlined />;
    case "BellOutlined":
      return (
        <Badge dot={false} count={undefined}>
          <BellOutlined style={{ fontSize: 22 }} />
        </Badge>
      );
    case "BorderOuterOutlined":
      return <BorderOuterOutlined />;
    case "MailOutlined":
      return <MailOutlined />;
    case "UnorderedListOutlined":
      return <UnorderedListOutlined />;
    case "UserOutlined":
      return <UserOutlined />;
    default:
      return "";
  }
};
