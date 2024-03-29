
import {DateTime} from 'luxon';

// @ts-ignore
import packageJSON from 'package.json';

const Footer = () => {
  

  return (
    <footer className="main-footer">
      <strong>
        <span>Copyright © {DateTime.now().toFormat('y')} </span>
        <a href="https://erdkse.com" target="_blank" rel="noopener noreferrer">
          erdkse.com
        </a>
        <span>.</span>
      </strong>
      <div className="float-right d-none d-sm-inline-block">
        <b>footer.version</b>
        <span>&nbsp;{packageJSON.version}</span>
      </div>
    </footer>
  );
};

export default Footer;
