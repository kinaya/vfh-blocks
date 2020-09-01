import { __ } from '@wordpress/i18n';
import { getBlockDefaultClassName } from '@wordpress/blocks';

const className = getBlockDefaultClassName( 'vfh-blocks/vfh-recommended' )

export default function save({attributes}) {

	return (
    <div className={`${className}`}>
      <h5 className="block-heading">Recommended posts</h5>

      <div className={`grid items-${attributes.recommendedPosts.length}`}>
        {attributes.recommendedPosts.map((post, i, arr) => { return (
          <div className="post-preview">
            <h4><a href={post.link}>{post.title}</a></h4>
            <p dangerouslySetInnerHTML={{ __html: post.excerpt}} />
          </div>
        )})}
      </div>
    </div>
	);
}
