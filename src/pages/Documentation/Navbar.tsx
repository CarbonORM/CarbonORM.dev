import classNames from "classnames";
import {NavLink} from "react-router-dom";
import styles from "./Documentation.module.scss";


function isCurrentlyActive(url: string) {
    console.log('isCurrentlyActive',url, window.location.pathname, window.location.hash);
    return window.location.pathname === url || window.location.hash === url + '/';

}

function Navbar(props) {
    const {routes = []} = props;

    let tabs: any[] = [];

    routes.forEach((o, key) => {
            // 'pathTo' aka not a redirect
            if (('pathTo' in o)) {
                return;
            }
            // doesn't need a sub menu
            if (!('views' in o)) {
                tabs.push(
                    <NavLink
                        to={o.path.replace(/\*$/, '')}
                        className={({isActive}) => classNames(styles.docsNavLink, {
                            [styles.docsNavLinkActive]: isActive
                        })}
                        key={key}
                    >
                        {o.name}
                    </NavLink>)
                return;
            }

            tabs.push(
                <div className={styles.docsNavLinks} key={key}>
                    {o.views.map((m, key2) => <NavLink
                        to={m.path}
                        className={classNames(styles.docsNavLink, {
                            [styles.docsNavLinkActive]: isCurrentlyActive(m.path)
                        })}
                        key={key2}
                    >
                        {m.name}
                    </NavLink>)}
                </div>
            );

        }
    );


    return (
        <nav className={styles.docsNav} aria-label="Documentation sections">
            <div className={styles.docsNavInner}>
                <span className={styles.docsNavBrand}>Documentation</span>
                <div className={styles.docsNavLinks}>
                    {tabs}
                </div>
            </div>
        </nav>
    );

}

export default Navbar;


// thur feb 21 1140
