import React from 'react';
import styles from './header.scss';

const NavBar = props => {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>Order Book App</div>
      <div className={styles.rightMenu} />
    </div>
  );
};

const SubHeader = props => {
  return (
    <div className={styles['header__sub']}>
      <div className={styles['header__sub-text']}>
        Data fetched from a local webservice that acts as an intermediator for
        third-party libraries (eg.:{' '}
        <a href="https://www.bitmex.com/app/wsAPI">BitMEX WS</a>
        ).
      </div>
    </div>
  );
};

const Header = props => {
  return (
    <div className={styles.header}>
      <NavBar />
      <SubHeader />
    </div>
  );
};

export default Header;
