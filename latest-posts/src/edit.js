import { withSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import './editor.scss';
import Image from './image.js';

const Edit = ({posts, className}) => {

  if(!posts) {
    return 'Loading...';
  }

  if(posts && posts.length === 0) {
    return 'No posts';
  }

  return (
    <div className={className}>
      <h5 className="block-heading">Latest posts</h5>
      <div className="grid">
        {posts.map(post => (
          <div className="post">
            <h4>{post.title.rendered}</h4>
            {post.featured_media !== 0 && (
              <Image id={post.featured_media} />
            )}
            <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered}} />
          </div>
        ))}
      </div>
    </div>
  )

}

const posts = select => {
  var query = {
    per_page: 3,
    status: 'publish',
  }
  return {
    posts: select('core').getEntityRecords('postType','post', query)
  }
}

export default withSelect(posts)(Edit)
