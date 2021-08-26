import Moment from 'react-moment';

import { Highlight, Snippet } from 'react-instantsearch-dom';
import { stl, Card, Tag } from '@algolia/satellite';

import { Section } from '../utils';
import SalesforceIcon from '../static/salesforce.svg';


function SalesforceHitTitle({hit}) {
  return (
    <>
      <img src={SalesforceIcon} alt={hit.source} className={stl`inline-block h-4 mr-2`} />
      <Tag className={stl`mr-1`}>{hit.type}</Tag>
      <Highlight hit={hit} attribute="name" />
    </>
  )
};

function SalesforceHitBody({hit}) {
  return (
    <>
      <p className={stl`mt-2 pl-3 border-l-2`}>
        <Snippet hit={hit} attribute='content'><Highlight hit={hit} attribute='content' /></Snippet>
      </p>
      <p className={stl`display-subheading mt-2`}>
        <span className={stl`typo-subdued`}>Owned by</span> {hit.owner}{' '}
        <span className={stl`typo-subdued`}>Last activity</span>{' '}
        <Moment unix format={'YYYY-MM-DD, h:mm:ss a'}>{hit.lastUpdatedAt}</Moment>
      </p>
    </>
  )
};

function SalesforceHitPreview({hit}) {
  return (
    <div>
      <Card.Title className={stl`px-6 flex items-center`}>
        <Tag className={stl`mr-1`}>{hit.type}</Tag> <span className={stl`display-small`}>{hit.name}</span>
      </Card.Title>
      <Section sectionTitle='Description' sectionBody={hit.content} />
      <Section sectionTitle='Owner' sectionBody={hit.owner ? hit.owner : 'Unknown'} />
      <Section sectionTitle='Last Activity' sectionBody={<Moment unix format='LLL'>{hit.lastUpdatedAt}</Moment>} />
    </div>
  )
};

const source = {
  TitleComponent: SalesforceHitTitle,
  BodyComponent: SalesforceHitBody,
  previewComponent: SalesforceHitPreview,
  icon: SalesforceIcon
};

export default source;