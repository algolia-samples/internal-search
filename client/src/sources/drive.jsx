import Moment from 'react-moment';
import { Highlight, Snippet } from 'react-instantsearch-dom';
import { stl, Card, Tag } from "@algolia/satellite";

import { Section } from '../utils';
import DriveIcon from '../static/drive.svg';

function DriveHitTitle({hit}) {
  return (
    <>
      <img src={DriveIcon} alt={hit.source} className={stl`inline-block h-4 mr-2`}/>
      <Tag className={stl`mr-1`}>{hit.mimetype}</Tag> <Highlight hit={hit} attribute="name" />
    </>
  )
};

function DriveHitBody({hit}) {
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

function DriveHitPreview({hit}) {
  return (
    <div>
      <Card.Title className={stl`px-6 flex items-center`}>
        <Tag className={stl`mr-1`}>{hit.mimetype}</Tag> <span className={stl`display-small`}>{hit.name}</span>
      </Card.Title>
      <Section sectionTitle='Excerpt' sectionBody={hit.content} />
      <Section sectionTitle='Last Updated At' sectionBody={<Moment unix format='LLL'>{hit.lastUpdatedAt}</Moment>} />
      <Section sectionTitle='Last Updated By' sectionBody={hit.lastUpdatedBy} />
    </div>
  )
};

const source = {
  TitleComponent: DriveHitTitle,
  BodyComponent: DriveHitBody,
  previewComponent: DriveHitPreview,
  icon: DriveIcon
};

export default source;