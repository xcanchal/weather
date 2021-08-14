import { ReactNode } from 'react';
import type { NextComponentType } from 'next';

type Props = {
  children: ReactNode
};

const defaultProps = {};

const Layout: NextComponentType<Props> = ({ children }) => (
  <div>
    {/* <Header></Header> */}
    <main>
      {children}
    </main>
    {/* <Footer></Footer> */}
  </div>
);

Layout.defaultProps = defaultProps;

export default Layout;
