
import BackdropsGridContainer from 'components/BackdropsGridContainer';
import MyTMDBList from './MyTMDBList';
import Pagination from 'components/Pagination';
import withTheme from 'utils/hocs/withTheme';
import PageWrapper from 'parts/PageWrapper';
import LinkButton from 'components/LinkButton';
import theme from 'styles/theme';
import LINKS from 'utils/constants/links';

const Empty = () => (
  <>
    <PageWrapper className="not-found">
      <div className="title-section">
        <h3 className="title">{`There's no lists yet. Let's change that!`}</h3>
      </div>
      <LinkButton
        href={LINKS.ADD_OR_EDIT_LIST.HREF}
        buttonProps={{
          contained: true,
          title: "Create your first list",
          style: { color: "white", fontSize: "2em" }
        }}
      />
    </PageWrapper>
    <style jsx>{`
      .title-section {
        margin-bottom: 3rem;
      }
      .title-section .title {
        color: var(--palette-text-primary);
        font-weight: ${theme.typography.fontWeightLight};
        font-size: 3.75rem;
      }
      :global(.not-found) {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    `}</style>
  </>
);

const MyTMDBLists = ({ theme, myLists, baseUrl }) => (
  <>
    <BackdropsGridContainer theme={theme}>
      {myLists.results.map(myList => (
        <MyTMDBList
          theme={theme}
          key={myList.id}
          myList={myList}
          baseUrl={baseUrl} />
      ))}
    </BackdropsGridContainer>
    <Pagination
      page={myLists.page}
      totalPages={myLists.total_pages} />

    {!myLists.results?.length && <Empty />}
  </>
);

export default withTheme(MyTMDBLists);
