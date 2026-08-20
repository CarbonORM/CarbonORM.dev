import CarbonORM from "CarbonORM";
import React from "react";

// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import {iStyle} from "variables/styleModules";

// FileStructure OptionsIndex Bootstrap Wrapper ParallelProcessing
import componentsStyle from "assets/jss/material-kit-react/views/components";

import Navbar from "pages/Documentation/Navbar";
import Footer from "pages/UI/MaterialUI/components/Footer/Footer";


import HeaderTop from "./HeaderTop/HeaderTop";
import HeaderLinks from "./HeaderTop/HeaderLinks";
import styles from "./Documentation.module.scss";

import CarbonWhite from "assets/img/carbonimg/Carbon-white-hollow";
import CarbonBlack from "assets/img/carbonimg/Carbon-black-hollow";

export const DOCUMENTATION = 'documentation/';


export interface iDocumentation {
    headerLinks?: {
        path: string,
        name: string
    }[]
}


class Documentation extends React.Component<{
    classes: iStyle,
    children: any,
} & iDocumentation, {}> {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
        }
    }

    componentDidMount() {
        this.setState({
            isLoaded: true,
        });
    }


    render() {
        console.log("Documentation RENDER");

        console.log(this.props);

        const {darkMode} = CarbonORM.instance.state;
        const heroImage = darkMode ? CarbonBlack : CarbonWhite;

        // todo - if we were to merge version ia PHP ^7.4 application tool kit & framework with code it would be here {this.props.subRoutingSwitch(publicDocumentationRoutes, rest)}
        return <div className={classNames(styles.documentationShell, darkMode ? styles.darkShell : styles.lightShell)}>

            <HeaderTop
                fixed
                brand="CarbonORM.dev"
                darkMode={CarbonORM.instance.state.darkMode}
                rightLinks={<HeaderLinks
                    darkMode={darkMode}
                />}
                color={darkMode ? "dark" : "white"}
            />
            <section className={styles.hero}>
                <div className={styles.heroInner}>
                    <div className={styles.heroText}>
                        <h1 className={styles.heroTitle}>CarbonORM [C6]</h1>
                        <p className={styles.heroSubtitle}>
                            Carbon is the universal building block for life as we know it. CarbonORM aims generate a
                            powerful MySQL Restful ORM to streamline and empower your applications. Write secure json
                            based sql queries in frontend user interfaces and middleware services. Auto-magically manage
                            your database across multiple servers and teams. Start building with CarbonORM today!
                        </p>
                    </div>
                    <img className={styles.heroMark} src={heroImage} alt="" aria-hidden="true"/>
                </div>
            </section>
            <main className={styles.documentArea}>
                <Navbar routes={this.props.headerLinks}/>

                <section className={styles.documentContent}>
                    {this.props.children}
                </section>
            </main>
            <Footer fluid/>
        </div>;
    }
}

export default withStyles(componentsStyle)(Documentation);
