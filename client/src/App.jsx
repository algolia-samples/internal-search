import { useState } from 'react';

import { X } from 'react-feather'; 
import algoliasearch from 'algoliasearch/lite';
import {
  ClearRefinements,
  connectRefinementList,
  connectRange,
  RefinementList,
  InstantSearch,
  SearchBox,
  Pagination,
  ExperimentalDynamicWidgets,
  Panel
} from 'react-instantsearch-dom';
import { Button, ButtonLink, Card, DateRangePicker, DateRangePickerActionTypes, IconButton, stl } from "@algolia/satellite";
import moment from 'moment';

import sources from './sources';
import Hits from './Hits';

import '@algolia/satellite/satellite.css';

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_API_KEY
);

function SourceRefinementList({items, currentRefinement, refine}) {
  const isActiveSource = (sourceName) => currentRefinement.indexOf(sourceName) > -1;
  return (
    <div className={stl`flex flex-col w-full`}>
      {items.map(item => {
        const icon = sources[item.label].icon;
        return (
          <Button
            size="large"
            key={item.label}
            onClick={event => {
              event.preventDefault();
              refine(item.value);
            }}
            variant={isActiveSource(item.label) ? 'neutral' : 'subtle'}
            className={stl`mb-3`}
          >
            <img src={icon} alt={item.label} className={stl`h-5 mr-3 inline-block`}/>{item.label} ({item.count})
          </Button>
        )
      })}
    </div>
  );
};

const ConnectedSourceRefinementList = connectRefinementList(SourceRefinementList);

function DateRangeRefinement({currentRefinement, min, max, precision, refine}) {
  const minDate = min ? moment.unix(min).add(1, "days").toDate() : moment().toDate();
  const maxDate = max ? moment.unix(max).subtract(1, "days").toDate() : moment().toDate();
  const [range, setRange] = useState({start: minDate, end: maxDate});
  const applyRange = (action, state) => {
    const { candidateRange: { start, end }} = state;
    if (action.type === DateRangePickerActionTypes.apply) {
      refine({
        min: start < min ? min : moment(start).unix(),
        max: end > max ? max : moment(end).unix()
      });
      DateRangePickerActionTypes.apply && setRange(state.candidateRange);
    }
  };
  return (
    <DateRangePicker
      buttonSize="large"
      range={range}
      onAction={applyRange}
      displayOnlyRanges={[{start: minDate, end: maxDate}]}
      showOutsideDays={false}
    />
  )
};

const ConnectedDateRangeRefinement = connectRange(DateRangeRefinement);

function App() {
  const isActiveHit = (hit) => hit === activeHit;
  const [activeHit, setActiveHit] = useState(null);
  const ActiveHitComponent = sources[activeHit?.source]?.previewComponent;
  const activeHitIcon = sources[activeHit?.source]?.icon;
  return (
    <InstantSearch indexName={process.env.REACT_APP_ALGOLIA_INDEX_NAME} searchClient={searchClient}>
      <div className={stl`flex flex-row`}>
        <div className={stl`flex-grow p-8`}>
          <main className={stl`instantsearch w-full`}>
            <header className={stl`flex mb-8`}>
              <div className={stl`flex-grow mr-4`}>
                <SearchBox autoFocus />
              </div>
              <ConnectedDateRangeRefinement attribute='lastUpdatedAt' />
            </header>
            <aside className={stl`flex justify-between items-center mb-8 -mx-4`}>
              <div className={stl`w-1/4 px-4`}>
                <ClearRefinements />
              </div>
              <div className={stl`flex-grow px-4 text-right`}>
                <Pagination showFirst showPrevious showNext showLast />
              </div>
            </aside>
            <section className={stl`flex flex-nowrap -mx-4`}>
              <aside className={stl`flex-none w-3/12 px-4`}>
                <ExperimentalDynamicWidgets>
                  <Panel attribute="type" className={stl`mb-8 pb-4 border-b border-grey-100`}>
                    <h2 className={stl`mb-4 display-subheading text-grey-600`}>Type</h2>
                    <RefinementList attribute="type" />
                  </Panel>
                  <Panel attribute="space" className={stl`mb-8 pb-4 border-b border-grey-100`}>
                    <h2 className={stl`mb-4 display-subheading text-grey-600`}>Space</h2>
                    <RefinementList attribute="space" />
                  </Panel>
                  <Panel attribute="mimetype" className={stl`mb-8 pb-4 border-b border-grey-100`}>
                    <h2 className={stl`mb-4 display-subheading text-grey-600`}>Type</h2>
                    <RefinementList attribute="mimetype" />
                  </Panel>
                </ExperimentalDynamicWidgets>
                <div className={stl`mb-8 pb-4 border-b border-grey-100`}>
                  <h2 className={stl`mb-4 display-subheading text-grey-600`}>Source</h2>
                  <ConnectedSourceRefinementList attribute='source'/>
                </div>
              </aside>
              <div className={stl`flex-grow px-4`}>
                <Hits setActiveHit={setActiveHit} isActiveHit={isActiveHit} />
              </div>
            </section>
          </main>
        </div>
        {activeHit && (
          <Card className={stl`top-0 right-0 w-3/12 fixed h-screen bg-white drop-shadow rounded-none px-0 z-10`}>
            <div className={stl`flex justify-between flex-row justify-items-center items-center px-6 mb-6`}>
              <div className={stl`flex flex-row justify-items-center`}>
                <img src={activeHitIcon} alt={activeHit.source} className={stl`inline-block h-4 mr-2`}/>
                <span className={stl`display-subheading`}>{activeHit.source}</span>
              </div>
              <IconButton icon={X} variant="subtle" onClick={() => setActiveHit(null)}/>
            </div>
            <ActiveHitComponent hit={activeHit} />
            <div className={stl`absolute bottom-0 w-full p-4 flex flex-col`}>
              <ButtonLink href={activeHit.link} size="large">View on {activeHit.source}</ButtonLink>
            </div>
          </Card>
        )}
      </div>
    </InstantSearch>
  );
};

export default App;
