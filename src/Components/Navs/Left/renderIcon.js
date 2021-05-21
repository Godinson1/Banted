import React from "react";
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
  return icon === "HomeFilled" ? (
    <HomeFilled />
  ) : icon === "NumberOutlined" ? (
    <NumberOutlined />
  ) : icon === "BellOutlined" ? (
    <BellOutlined />
  ) : icon === "MailOutlined" ? (
    <MailOutlined />
  ) : icon === "BorderOuterOutlined" ? (
    <BorderOuterOutlined />
  ) : icon === "UnorderedListOutlined" ? (
    <UnorderedListOutlined />
  ) : icon === "UserOutlined" ? (
    <UserOutlined />
  ) : (
    ""
  );
};
