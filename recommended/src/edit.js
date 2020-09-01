import { __ } from '@wordpress/i18n';
import './editor.scss';
import { SelectControl } from '@wordpress/components';
import { withSelect, select } from '@wordpress/data';
import Image from './image.js';

const Edit = ({options, className, setAttributes, attributes}) => {

  const addRecommendedPost = async (id) => {
    const post = select('core').getEntityRecord('postType', 'post', id)

    const previewPost = {
      id: post.id,
      title: post.title.rendered,
      excerpt: post.excerpt.rendered,
      link: post.link,
      featured_media: post.featured_media
    }

    setAttributes({
      recommendedPosts: [...attributes.recommendedPosts, previewPost]
    })
  }

  const removeRecommendedPost = (id) => {
    setAttributes({
      recommendedPosts: attributes.recommendedPosts.filter(post => post.id != id)
    })
  }

	return (
    <div className={ className }>

      <h5 className="block-heading">Recommended posts</h5>

      <div className={`grid items-${attributes.recommendedPosts.length}`}>
        {attributes.recommendedPosts.map((post) => { return (
          <div className="post-preview">
            <div className="content">
              <h4>{post.title}</h4>
              {post.featured_media != 0 && (
                <Image id={post.featured_media} />
              )}
              <p dangerouslySetInnerHTML={{ __html: post.excerpt}} />
            </div>
            <button className="components-button has-icon" onClick={() => removeRecommendedPost(post.id)}>
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" role="img" aria-hidden="true" focusable="false"><path d="M14.95 6.46L11.41 10l3.54 3.54-1.41 1.41L10 11.42l-3.53 3.53-1.42-1.42L8.58 10 5.05 6.47l1.42-1.42L10 8.58l3.54-3.53z"></path></svg>
            </button>
          </div>
        )})}
      </div>

      <div className="admin-area">
        <SelectControl
  	       label={__('Add post', 'vfh-blocks')}
           options={options.filter(post => !attributes.recommendedPosts.map(post => post.id).includes(post.value))}
  	       value={null}
  	       onChange={addRecommendedPost}
        />
      </div>

    </div>
	);
}

const options = select => {

  var query = {
    per_page: -1,
    status: 'publish',
  }
  const posts = select('core').getEntityRecords('postType','post', query)

  let optionsArray = [];
  optionsArray.push({ value: 0, label: __('Select post to add', 'vfh-blocks') });
  if(posts) {
    posts.forEach(post => {
    	optionsArray.push({ value: post.id, label: post.title.rendered });
    });
  }

  return {
    options: optionsArray
  }
}

export default withSelect(options)(Edit)
