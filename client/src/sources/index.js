import confluenceSource from './confluence';
import driveSource from './drive';
import salesforceSource from './salesforce';

const sources = {
  'Confluence': confluenceSource,
  'Google Drive': driveSource,
  'Salesforce': salesforceSource
};

export default sources;