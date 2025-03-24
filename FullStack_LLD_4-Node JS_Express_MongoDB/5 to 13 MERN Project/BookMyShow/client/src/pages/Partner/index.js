import React from 'react';
import { Tabs } from "antd";
import TheatresList from './TheatresList';

const Partner = () => {
  const items = [
    {
      key: "1",
      label: "Theatres",
      children: <TheatresList />
    },
  ];

  return (
    <>
      <h1>Partner Page</h1>
      <Tabs items={items} />
    </>
  );
}

export default Partner;