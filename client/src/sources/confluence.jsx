import Moment from 'react-moment';
import { Highlight, Snippet } from 'react-instantsearch-dom';
import { stl, Tag, Card } from "@algolia/satellite";

import ConfluenceIcon from '../static/confluence.svg';
import { Section } from '../utils';

function ConfluenceHitTitle({hit}) {
  return (
    <>
      <img src={ConfluenceIcon} alt={hit.source} className={stl`inline-block h-4 mr-2`}/>
      <Tag className={stl`mr-1`}>{hit.space}</Tag>
      <Highlight hit={hit} attribute="name" />
    </>
  )
};

function ConfluenceHitBody({hit}) {
  return (
    <>
      <p className={stl`mt-2 pl-3 border-l-2`}>
        <Snippet hit={hit} attribute='content'><Highlight hit={hit} attribute='content' /></Snippet>
      </p>
      <p className={stl`display-subheading mt-2`}>
        <span className={stl`typo-subdued`}>Last updated</span>{' '}
        <Moment format={'YYYY-MM-DD, h:mm:ss a'} unix>{hit.lastUpdatedAt}</Moment>{' '}
        <span className={stl`typo-subdued`}>by</span> {hit.lastUpdatedBy}
      </p>
    </>
  )
};

function ConfluenceHitPreview({hit}) {
  return (
    <div>
      <Card.Title className={stl`px-6 flex items-center`}>
        <Tag className={stl`mr-1`}>{hit.space}</Tag> <span className={stl`display-small`}>{hit.name}</span>
      </Card.Title>
      <Section sectionTitle='Excerpt' sectionBody={hit.content} />
      <Section sectionTitle='Last Updated At' sectionBody={<Moment unix format='LLL'>{hit.lastUpdatedAt}</Moment>} />
      <Section sectionTitle='Last Updated By' sectionBody={hit.lastUpdatedBy} />
    </div>
  )
};

const source = {
  TitleComponent: ConfluenceHitTitle,
  BodyComponent: ConfluenceHitBody,
  previewComponent: ConfluenceHitPreview,
  icon: ConfluenceIcon
};

export default source;