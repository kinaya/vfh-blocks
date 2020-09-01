import { __ } from '@wordpress/i18n';
import { withSelect, select } from '@wordpress/data';

const Image = ({image}) => {
  return (
    <div className="featured-image">
      {image ? (
        <img src={image.guid.rendered} alt={image.alt_text}/>
      ):(
        "Loading"
      )}
    </div>
	);
}

const image = (select, ownProps) => {
  if(typeof ownProps.image === 'undefined') {
    return {
      ...ownProps,
      image: select('core').getMedia(ownProps.id)
    }
  }
  return ownProps
}

export default withSelect(image)(Image)
