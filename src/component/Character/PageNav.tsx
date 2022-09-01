import RxComponent from '../RxComponent/RxComponent';
import CharacterNavigationService from '../../service/CharacterNavigation';

import './PageNav.scss';

type PageNavProps = {};
type PageNavState = {
    page: number;
    pageCount: number;
};

class PageNav extends RxComponent<PageNavProps, PageNavState> {
    handler = {
        setPage: this.setPage.bind(this),
        setPageCount: this.setPageCount.bind(this),
    }

    state = {
        page: 0,
        pageCount: 0,
    }

    setPage(page: number) {
        this.setState({ page });
    }

    setPageCount(pageCount: number) {
        this.setState({ pageCount });
    }

    componentDidMount() {
        this.subscribe(CharacterNavigationService.page, { next: this.handler.setPage });
        this.subscribe(CharacterNavigationService.pageCount, { next: this.handler.setPageCount });
    }

    render() {
        const { page, pageCount } = this.state;

        const buttonList = new Array(pageCount).fill(null).map((value, index) => index);

        return <div className="page-nav">
            {buttonList.map(index => page === index ? <span className="page-nav__current">{index + 1}</span> : <button
                className="page-nav__button"
                onClick={() => CharacterNavigationService.setPage(index)}
            >{index + 1}</button>)}
        </div>
    }
}

export default PageNav;
