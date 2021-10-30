// Footer

import { getYear } from '../utilities/getDates';

const Footer = ({ copyright, author }) => (
	<footer>
        <p>&copy; {copyright} {author}</p>
    </footer>
);

Footer.defaultProps = {
    author: 'Ali Alsadiq.',
    copyright: getYear()
}

export default Footer;