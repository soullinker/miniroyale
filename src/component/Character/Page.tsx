import Filter from './Filter';
import PageNav from './PageNav';
import List from './List';

import './Page.scss';

function Page() {
    return <div className="character-list-page">
        <h1>character list</h1>
        <Filter />
        <List />
        <PageNav />
    </div>;
}

export default Page;
