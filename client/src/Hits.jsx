import { connectHits } from 'react-instantsearch-dom';
import { Card, stl } from "@algolia/satellite";

import sources from './sources';

function Hit({hit, isActiveHit, TitleComponent, BodyComponent}) {
  return (
    <Card>
      <Card.Title className={stl`display-heading`}>
        <TitleComponent hit={hit} />
      </Card.Title>
      <BodyComponent hit={hit} />
    </Card>
  )
};
  
function Hits({hits, isActiveHit, setActiveHit}) {
  if (hits.length === 0) {
    return (
      <div className={`ais-Hits stl-pl-4 stl-border-l-2 stl-mt-2 stl-mb-6`}>
        <p>No results</p>
      </div>
    );
  }
  return (
    <div className={`ais-Hits stl-mb-6`}>
      <ul className={`ais-Hits-list`}>
        {hits.map(hit => {
          const { TitleComponent, BodyComponent } = sources[hit.source];
          return (
            <li 
              className={`ais-Hits-item stl-mb-4 stl-cursor-pointer`}
              key={hit.objectID}
              onClick={() => setActiveHit(hit)}
            >
              <Hit hit={hit} isActiveHit={isActiveHit} TitleComponent={TitleComponent} BodyComponent={BodyComponent} />
            </li>
          )}
        )}
      </ul>
    </div>
  );
};

const ConnectedHits = connectHits(Hits);

export default ConnectedHits;