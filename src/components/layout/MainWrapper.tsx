import React from 'react';

type Props = {
  children: React.ReactNode;
};

function MainWrapper({ children }: Props) {
  return <main>{children}</main>;
}

export default MainWrapper;
