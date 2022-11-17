import React from "react";

export interface IRoute {
  path: string;
  Component: React.FC<{}>;
}
