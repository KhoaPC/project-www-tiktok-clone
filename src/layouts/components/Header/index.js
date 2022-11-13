import clsx from 'clsx';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import images from '~/assets/images';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { InboxIcon, MessageIcon, UploadIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Search from '../Search';
import {
    faCircleQuestion,
    faCoins,
    faEarthAsia,
    faEllipsisVertical,
    faGear,
    faKeyboard,
    faSignOut,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import config from '~/config';
import Login from '../form/Login';
import { useState } from 'react';

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

function Header() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginShow, setLoginShow] = useState(false); // Form
    const hanleClick = () => {
        setLoggedIn(true);
    };

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: '/@khoa',
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get coins',
            to: '/coin',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: '/settings',
        },
        ...MENU_ITEMS,
        {
            onClick: () => setLoggedIn(false),
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
        },
    ];
    let data;
    const foo = userMenu.forEach((item, index) => {
        if (item.children) return (data = item);
        else return;
    });
    return (
        <header className={clsx(styles.wrapper)}>
            {loginShow && <Login></Login>}
            <div className={clsx(styles.inner)}>
                <Link to={config.routes.home}>
                    <img src={images.logo} alt="Tiktok" />
                </Link>
                <Search />
                <div className={clsx(styles.actions)}>
                    {/* Check login | logout */}
                    {loggedIn ? (
                        <>
                            <Tippy delay={[0, 50]} content="Upload video" placement="bottom">
                                <button className={clsx(styles.actionBtn)}>
                                    <UploadIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 50]} content="Message" placement="bottom">
                                <button className={clsx(styles.actionBtn)}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 50]} content="Inbox" placement="bottom">
                                <button className={clsx(styles.actionBtn)}>
                                    <InboxIcon />
                                    <span className={clsx(styles.badge)}>12</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button text>Upload</Button>
                            {!loggedIn && (
                                <Button onClick={hanleClick} primary>
                                    Log in
                                </Button>
                            )}
                        </>
                    )}
                    {/* Check login | logout */}
                    <Menu items={loggedIn ? userMenu : MENU_ITEMS}>
                        {loggedIn ? (
                            <Image
                                className={clsx(styles.userAvatar)}
                                src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Laptops_758x608_2X_en_US._SY608_CB418608386_.jpg"
                                alt="Luong Van Khoa"
                            />
                        ) : (
                            <button className={clsx(styles.moreBtn)}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
