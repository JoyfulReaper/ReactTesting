import React from 'react';
import {QuillDeltaToHtmlConverter} from "quill-delta-to-html"
import NotFound from './NotFound';
import {useParams} from 'react-router-dom'

const Post = ({ posts }) => {
    const params = useParams();
    const post = posts.find((post) => post.slug === params.postSlug);

    const converter = new QuillDeltaToHtmlConverter(
        post.content.ops, {}
    );
    const contentHTML = converter.convert();

    return (
    post === undefined ? <NotFound /> :    
    <article className="post container">
        <h1>{post.title}</h1>
        <div className="content"
            dangerouslySetInnerHTML={{
                __html: contentHTML
            }}
            />
    </article>);
};

export default Post;