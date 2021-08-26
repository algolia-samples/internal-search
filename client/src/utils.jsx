import { stl } from "@algolia/satellite";

function Section({sectionTitle, sectionBody}) {
  return (
    <div className={stl`border-b border-grey-200 py-6`}>
      <h3 className={stl`display-heading mb-1 px-6`}>{sectionTitle}</h3>
      <p className={stl`display-body px-6 max-h-60 overflow-ellipsis overflow-hidden`}>{sectionBody}</p>
    </div>
  )
};

export {
  Section
};