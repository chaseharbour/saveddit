import React from 'react'

const Post = () => {
    return (
        <div>
            <h3>Make a new post!</h3>
            <form>
                <div>
                    <label for='title'>Post title: </label>
                    <input type='text' name='title'></input>
                </div>

                <div>
                    <label for='post-body'>Post body: </label>
                    <textarea name='post-body'></textarea>
                </div>

                <div>
                    <input type='submit' value='Submit Post'></input>
                </div>
            </form>
        </div>
    )
}

export default Post
